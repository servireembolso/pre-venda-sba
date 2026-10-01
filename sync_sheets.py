import urllib.request
import zipfile
import io
import xml.etree.ElementTree as ET
import json
import os
import re
import csv

DEFAULT_SHEET_ID = "18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4"

def extract_sheet_id(input_str):
    if not input_str:
        return DEFAULT_SHEET_ID, None
    input_str = input_str.strip()
    
    # Extract sheet ID
    match = re.search(r"/d/([a-zA-Z0-9-_]{15,})", input_str)
    sheet_id = match.group(1) if match else input_str

    # Extract gid if present
    gid_match = re.search(r"[#&?]gid=(\d+)", input_str)
    gid = gid_match.group(1) if gid_match else None

    return sheet_id, gid

def sync_spreadsheet(sheet_input=DEFAULT_SHEET_ID, sheet_name=None, specialist=None):
    sheet_id, gid = extract_sheet_id(sheet_input)
    print(f"Syncing spreadsheet ID: {sheet_id} (gid: {gid}, sheet: {sheet_name}, specialist: {specialist})...")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    # Load existing data to preserve HubSpot URLs, custom edits and other specialists
    existing_map = {}
    prev_list = []
    out_dir = r"c:\Users\Danilo\.gemini\antigravity\scratch\seidor-presales-hub\data"
    out_file = os.path.join(out_dir, "seidor_opps.json")
    if os.path.exists(out_file):
        try:
            with open(out_file, "r", encoding="utf-8") as f:
                prev_list = json.load(f)
                for item in prev_list:
                    if item.get("cliente"):
                        existing_map[item["cliente"].lower().strip()] = item
        except Exception as e:
            print("Warning reading previous data:", e)

    raw_rows = []
    hl_map = {}

    # Strategy 1: Try XLSX export (preserves XML hyperlinks and rich formulas)
    xlsx_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=xlsx"
    if gid:
        xlsx_url += f"&gid={gid}"

    content = None
    try:
        req = urllib.request.Request(xlsx_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
        print(f"Downloaded XLSX format ({len(content)} bytes).")
    except Exception as e:
        print(f"XLSX download failed ({e}), falling back to CSV export...")

    if content and len(content) > 500:
        try:
            with zipfile.ZipFile(io.BytesIO(content)) as z:
                # Find worksheet file
                sheet_files = [f for f in z.namelist() if f.startswith("xl/worksheets/sheet") and f.endswith(".xml")]
                target_sheet_file = sheet_files[0] if sheet_files else "xl/worksheets/sheet1.xml"
                
                # Check for relationships / hyperlinks
                sheet_basename = os.path.basename(target_sheet_file)
                rels_path = f"xl/worksheets/_rels/{sheet_basename}.rels"
                rel_map = {}
                if rels_path in z.namelist():
                    rels_xml = z.read(rels_path)
                    root_rels = ET.fromstring(rels_xml)
                    for rel in root_rels:
                        if "hyperlink" in rel.attrib.get("Type", ""):
                            rel_map[rel.attrib["Id"]] = rel.attrib.get("Target", "")

                strings = []
                if "xl/sharedStrings.xml" in z.namelist():
                    ss_root = ET.fromstring(z.read("xl/sharedStrings.xml"))
                    for si in ss_root.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si"):
                        t = si.find("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t")
                        if t is not None and t.text:
                            strings.append(t.text)
                        else:
                            # Rich text run fallback
                            r_texts = [r_elem.find("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t") for r_elem in si.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}r")]
                            joined = "".join([rt.text for rt in r_texts if rt is not None and rt.text])
                            strings.append(joined)

                sheet_xml = z.read(target_sheet_file)
                root_sheet = ET.fromstring(sheet_xml)

                for hl in root_sheet.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}hyperlink"):
                    ref = hl.attrib.get("ref", "")
                    r_id = hl.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id", "")
                    loc = hl.attrib.get("location", "")
                    target = rel_map.get(r_id, "")
                    if loc and target:
                        target += "#" + loc
                    hl_map[ref] = target

                for row in root_sheet.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row"):
                    row_cells = {}
                    for c in row.findall("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c"):
                        cell_ref = c.attrib.get("r", "")
                        col_match = re.match(r"([A-Z]+)", cell_ref)
                        if not col_match:
                            continue
                        col_letter = col_match.group(1)
                        val = c.find("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v")
                        cell_type = c.attrib.get("t")
                        txt = ""
                        if val is not None and val.text:
                            if cell_type == "s":
                                idx = int(val.text)
                                txt = strings[idx] if idx < len(strings) else val.text
                            else:
                                txt = val.text
                        url = hl_map.get(cell_ref, "")
                        row_cells[col_letter] = {"text": txt.strip(), "url": url.strip()}
                    if row_cells:
                        raw_rows.append(row_cells)
        except Exception as err:
            print("Error parsing XLSX zip structure:", err)
            raw_rows = []

    # Strategy 2: If raw_rows is empty, try CSV export or GVIZ
    if not raw_rows:
        csv_candidates = [
            f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv" + (f"&gid={gid}" if gid else ""),
            f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv" + (f"&sheet={urllib.parse.quote(sheet_name)}" if sheet_name else "")
        ]
        csv_text = None
        for c_url in csv_candidates:
            try:
                print(f"Attempting CSV download: {c_url}")
                req = urllib.request.Request(c_url, headers=headers)
                with urllib.request.urlopen(req, timeout=15) as resp:
                    raw_bytes = resp.read()
                    csv_text = raw_bytes.decode('utf-8', errors='replace')
                    if len(csv_text.strip()) > 20:
                        break
            except Exception as e:
                print("CSV download attempt error:", e)

        if csv_text:
            reader = csv.reader(io.StringIO(csv_text))
            col_letters = [chr(ord('A') + i) for i in range(26)]
            for row in reader:
                if not any(c.strip() for c in row):
                    continue
                row_cells = {}
                for idx, val in enumerate(row):
                    if idx < len(col_letters):
                        letter = col_letters[idx]
                        url = ""
                        # Check if value itself is a URL
                        if val.strip().startswith("http"):
                            url = val.strip()
                        row_cells[letter] = {"text": val.strip(), "url": url}
                if row_cells:
                    raw_rows.append(row_cells)

    if not raw_rows:
        raise ValueError(f"Não foi possível obter dados da planilha {sheet_id}. Verifique se o acesso está liberado como 'Qualquer pessoa com o link pode ler'.")

    # Detect Header Row and Column Mappings
    header_row = raw_rows[0]
    col_mapping = {
        "cliente": None,
        "demanda": None,
        "doc": None,
        "comercial": None,
        "prevenda": None,
        "hubspot": None,
        "sku": None,
        "valor_lic": None,
        "valor_serv": None,
        "status": None
    }

    # Normalize string for fuzzy matching
    def norm(s):
        return re.sub(r"[^a-z0-9]", "", s.lower())

    for col_letter, cell in header_row.items():
        txt = norm(cell.get("text", ""))
        if any(k in txt for k in ["cliente", "empresa", "conta", "oportunidade"]):
            if not col_mapping["cliente"]: col_mapping["cliente"] = col_letter
        elif any(k in txt for k in ["demanda", "escopo", "servico", "descricao", "tipo"]):
            if not col_mapping["demanda"]: col_mapping["demanda"] = col_letter
        elif any(k in txt for k in ["link", "proposta", "sow", "documento", "deck", "arquivo", "url"]):
            if not col_mapping["doc"]: col_mapping["doc"] = col_letter
        elif any(k in txt for k in ["comercial", "am", "vendedor", "responsavel"]):
            if not col_mapping["comercial"]: col_mapping["comercial"] = col_letter
        elif any(k in txt for k in ["prevenda", "autoria", "arquiteto", "especialista"]):
            if not col_mapping["prevenda"]: col_mapping["prevenda"] = col_letter
        elif any(k in txt for k in ["hubspot", "crm", "deal"]):
            if not col_mapping["hubspot"]: col_mapping["hubspot"] = col_letter
        elif any(k in txt for k in ["sku", "produto", "solucao"]):
            if not col_mapping["sku"]: col_mapping["sku"] = col_letter

    # Fallback to standard Servinformacion / Seidor demo layout if not detected
    if not col_mapping["cliente"]: col_mapping["cliente"] = "B"
    if not col_mapping["demanda"]: col_mapping["demanda"] = "C"
    if not col_mapping["doc"]: col_mapping["doc"] = "D"
    if not col_mapping["comercial"]: col_mapping["comercial"] = "E"
    if not col_mapping["prevenda"]: col_mapping["prevenda"] = "F"

    print("Column Mapping:", col_mapping)

    opps = []
    # Process data rows (skip header row)
    for idx, r in enumerate(raw_rows[1:], start=1):
        cliente_cell = r.get(col_mapping["cliente"], {})
        cliente_raw = cliente_cell.get("text", "")

        demanda_cell = r.get(col_mapping["demanda"], {})
        demanda_raw = demanda_cell.get("text", "")

        doc_cell = r.get(col_mapping["doc"], {})
        doc_title = doc_cell.get("text", "")
        doc_url = doc_cell.get("url", "")
        if not doc_url and doc_title.startswith("http"):
            doc_url = doc_title

        comercial_cell = r.get(col_mapping["comercial"], {})
        comercial = comercial_cell.get("text", "") or "AM Responsável"

        prevenda_cell = r.get(col_mapping["prevenda"], {})
        prevenda_text = prevenda_cell.get("text", "").strip()
        prevenda_url = prevenda_cell.get("url", "").strip()

        # Check for Danilo or Vinicius or explicit parameter
        pre_venda = ""
        if specialist:
            if "vinicius" in specialist.lower():
                pre_venda = "Vinicius"
            elif "danilo" in specialist.lower():
                pre_venda = "Danilo"
            else:
                pre_venda = specialist
        elif "danilo" in prevenda_text.lower():
            pre_venda = "Danilo"
        elif "vinicius" in prevenda_text.lower():
            pre_venda = "Vinicius"
        elif prevenda_text and not prevenda_text.startswith("http"):
            pre_venda = prevenda_text
        else:
            pre_venda = "Vinicius"

        # Check for HubSpot Deal URL
        hubspot_url = ""
        if col_mapping.get("hubspot") and r.get(col_mapping["hubspot"]):
            hs_cell = r.get(col_mapping["hubspot"])
            hubspot_url = hs_cell.get("url") or (hs_cell.get("text") if hs_cell.get("text", "").startswith("http") else "")

        if not hubspot_url:
            for c_val in [prevenda_url, prevenda_text]:
                if "hubspot" in c_val.lower() or "crm" in c_val.lower() or ("app." in c_val.lower() and "http" in c_val.lower()):
                    hubspot_url = c_val
                    break

        if not cliente_raw and not demanda_raw and not doc_title:
            continue

        # Extract seats / accounts
        seats = 0
        num_match = re.search(r"\b(\d{2,5})\b", cliente_raw)
        if num_match:
            seats = int(num_match.group(1))

        clean_client = re.sub(r"\s+\d+\s*(?:contas|licen[cç]as|seats|usu[aá]rios)?", "", cliente_raw, flags=re.IGNORECASE).strip()
        if not clean_client:
            clean_client = cliente_raw

        # Classify SKU
        text_all = f"{demanda_raw} {doc_title} {cliente_raw}".lower()
        if "gemini" in text_all:
            sku = "Gemini Enterprise"
        elif "earth" in text_all:
            sku = "Google Earth Platform"
        elif "supabase" in text_all or "migra" in text_all:
            sku = "GCP Cloud Migration"
        elif "transfer billing" in text_all:
            sku = "GCP Transfer Billing"
        elif "transfer token" in text_all:
            sku = "GWS Transfer Token"
        elif "foundation" in text_all or "consultoria" in text_all:
            sku = "GCP Foundation & Consultoria"
        elif "bolsa de horas" in text_all:
            sku = "Bolsa de Horas Consultoria"
        elif "provisionamento" in text_all:
            sku = "GCP Provisionamento Infra"
        else:
            sku = "Google Cloud / Workspace"

        doc_type = "Google Docs"
        if "presentation" in doc_url or "slide" in doc_url:
            doc_type = "Google Slides"
        elif "document" in doc_url:
            doc_type = "Google Docs"

        # Check existing state for preserved HubSpot links or values
        prev_item = existing_map.get(clean_client.lower().strip(), {})
        if not hubspot_url:
            if prev_item.get("hubspotUrl"):
                hubspot_url = prev_item["hubspotUrl"]
            elif prev_item.get("hubspot", "").startswith("http"):
                hubspot_url = prev_item["hubspot"]

        # Financial values
        valor_licencas = prev_item.get("valorLicencas")
        valor_servicos = prev_item.get("valorServicos")

        if valor_licencas is None:
            if seats > 0:
                valor_licencas = seats * 180 * 12 if "gemini" in text_all else seats * 60 * 12
            elif "billing" in text_all:
                valor_licencas = 120000
            elif "earth" in text_all:
                valor_licencas = 95000
            else:
                valor_licencas = 0

        if valor_servicos is None:
            if seats > 0:
                valor_servicos = 45000 if seats >= 1000 else 25000
            elif "bolsa de horas" in text_all:
                valor_servicos = 36000
            elif "migra" in text_all or "foundation" in text_all:
                valor_servicos = 48000
            elif "provisionamento" in text_all:
                valor_servicos = 22000
            elif "transfer" in text_all:
                valor_servicos = 12000
            elif "earth" in text_all:
                valor_servicos = 18000
            else:
                valor_servicos = 20000

        if pre_venda.lower() == "vinicius":
            autoria_txt = "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion"
            id_prefix = "VIN"
        elif pre_venda.lower() == "danilo":
            autoria_txt = "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion"
            id_prefix = "DAN"
        else:
            autoria_txt = f"{pre_venda} — Arquiteto de Soluções Google | Servinformacion"
            id_prefix = "SERV"

        opp = {
            "id": f"{id_prefix}-{100 + idx}",
            "cliente": clean_client,
            "clienteCompleto": cliente_raw,
            "demanda": demanda_raw,
            "comercial": comercial,
            "preVenda": pre_venda,
            "autoria": autoria_txt,
            "sku": sku,
            "licencas": seats,
            "valorLicencas": valor_licencas,
            "valorServicos": valor_servicos,
            "estagio": "Proposta Técnica Entregue",
            "previsao": "2026-10-15",
            "escopo": f"{demanda_raw} — {doc_title}" if doc_title else demanda_raw,
            "docTitulo": doc_title or f"Proposta Técnica {clean_client}",
            "docUrl": doc_url,
            "docTipo": doc_type,
            "hubspotUrl": hubspot_url,
            "hubspot": hubspot_url or f"HS-{1000 + idx}",
            "origem": "Planilha Google Sheets Oficial — Servinformacion"
        }
        opps.append(opp)

    os.makedirs(out_dir, exist_ok=True)
    all_opps = opps
    if specialist and prev_list:
        preserved = [o for o in prev_list if specialist.lower() not in o.get("preVenda", "").lower()]
        all_opps = preserved + opps
    elif prev_list:
        specs_in_opps = set(o.get("preVenda", "").lower() for o in opps)
        if len(specs_in_opps) == 1:
            single_spec = list(specs_in_opps)[0]
            preserved = [o for o in prev_list if single_spec not in o.get("preVenda", "").lower()]
            all_opps = preserved + opps

    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(all_opps, f, indent=2, ensure_ascii=False)

    out_file2 = os.path.join(out_dir, "servinformacion_opps.json")
    with open(out_file2, "w", encoding="utf-8") as f:
        json.dump(all_opps, f, indent=2, ensure_ascii=False)

    print(f"Successfully processed {len(opps)} opportunities (Total combined: {len(all_opps)}) and saved to {out_file}!")
    return opps, all_opps

if __name__ == "__main__":
    sync_spreadsheet()
