import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Load local .env file if available
env_file = os.path.join(DIRECTORY, '.env')
if os.path.exists(env_file):
    try:
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ.setdefault(k.strip(), v.strip())
    except Exception as _e:
        pass

DEFAULT_HUBSPOT_TOKEN = os.environ.get("HUBSPOT_TOKEN", "")
DEFAULT_HUBSPOT_PORTAL_ID = os.environ.get("HUBSPOT_PORTAL_ID", "8388367")
DEFAULT_SHEET_ID = os.environ.get("SHEET_ID", "18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4")

class AppProxyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/hubspot/search':
            self.handle_hubspot_search(parsed.query)
        elif parsed.path == '/api/hubspot/test':
            self.handle_hubspot_test(parsed.query)
        elif parsed.path == '/api/sheets/sync':
            self.handle_sheets_sync(parsed.query)
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else ""
        
        if parsed.path == '/api/hubspot/search':
            self.handle_hubspot_search_post(body)
        elif parsed.path == '/api/sheets/sync':
            self.handle_sheets_sync_post(body)
        elif parsed.path == '/api/sheets/save':
            self.handle_sheets_save(body)
        else:
            self.send_error(404, "Endpoint not found")

    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    # ==========================================
    # SHEETS SYNC ENDPOINTS
    # ==========================================
    def handle_sheets_sync(self, query_str):
        try:
            params = urllib.parse.parse_qs(query_str)
            sheet_id = params.get('sheet_id', [''])[0].strip() or DEFAULT_SHEET_ID
            sheet_name = params.get('sheet_name', [''])[0].strip() or None
            specialist = params.get('specialist', [''])[0].strip() or None
            
            import sync_sheets
            opps, all_opps = sync_sheets.sync_spreadsheet(sheet_id, sheet_name, specialist=specialist)
            self.send_json(200, {
                'ok': True,
                'count': len(opps),
                'total': len(all_opps),
                'sheetId': sheet_id,
                'specialist': specialist,
                'data': opps,
                'all': all_opps
            })
        except Exception as e:
            print("Sheets sync error:", e)
            self.send_json(500, {
                'ok': False,
                'error': str(e)
            })

    def handle_sheets_sync_post(self, body):
        try:
            data = json.loads(body) if body else {}
            sheet_id = data.get('sheet_id', '').strip() or DEFAULT_SHEET_ID
            sheet_name = data.get('sheet_name', '').strip() or None
            specialist = data.get('specialist', '').strip() or None

            import sync_sheets
            opps, all_opps = sync_sheets.sync_spreadsheet(sheet_id, sheet_name, specialist=specialist)
            self.send_json(200, {
                'ok': True,
                'count': len(opps),
                'total': len(all_opps),
                'sheetId': sheet_id,
                'specialist': specialist,
                'data': opps,
                'all': all_opps
            })
        except Exception as e:
            print("Sheets sync post error:", e)
            self.send_json(500, {
                'ok': False,
                'error': str(e)
            })

    def handle_sheets_save(self, body):
        try:
            data = json.loads(body) if body else {}
            opps = data.get('opps', [])
            specialist = data.get('specialist', '').strip() or None
            if not isinstance(opps, list):
                raise ValueError("Payload deve conter uma lista 'opps'")

            out_dir = os.path.join(DIRECTORY, "data")
            os.makedirs(out_dir, exist_ok=True)
            out_file = os.path.join(out_dir, "seidor_opps.json")

            final_opps = opps
            # If specialist was specified and opps is only for that specialist, merge with others
            if specialist:
                existing_opps = []
                if os.path.exists(out_file):
                    try:
                        with open(out_file, "r", encoding="utf-8") as f:
                            existing_opps = json.load(f)
                    except Exception:
                        pass
                preserved = [o for o in existing_opps if specialist.lower() not in o.get('preVenda', '').lower()]
                final_opps = preserved + opps

            with open(out_file, "w", encoding="utf-8") as f:
                json.dump(final_opps, f, indent=2, ensure_ascii=False)
            with open(os.path.join(out_dir, "servinformacion_opps.json"), "w", encoding="utf-8") as f:
                json.dump(final_opps, f, indent=2, ensure_ascii=False)

            self.send_json(200, {
                'ok': True,
                'count': len(opps),
                'total': len(final_opps),
                'message': f"{len(opps)} propostas salvas no servidor com sucesso"
            })
        except Exception as e:
            self.send_json(500, {
                'ok': False,
                'error': str(e)
            })

    # ==========================================
    # HUBSPOT CRM ENDPOINTS
    # ==========================================
    def handle_hubspot_test(self, query_str):
        params = urllib.parse.parse_qs(query_str)
        token = params.get('token', [''])[0].strip() or DEFAULT_HUBSPOT_TOKEN
        if not token:
            self.send_json(400, {'ok': False, 'error': 'Token não fornecido'})
            return

        url = "https://api.hubapi.com/crm/v3/objects/deals?limit=1"
        req = urllib.request.Request(url, headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        })

        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                self.send_json(200, {
                    'ok': True,
                    'message': 'Conexão com HubSpot validada com sucesso!',
                    'total': data.get('total')
                })
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode('utf-8', errors='ignore')
            self.send_json(e.code, {'ok': False, 'error': f"Erro API HubSpot ({e.code}): {err_msg}"})
        except Exception as e:
            self.send_json(500, {'ok': False, 'error': str(e)})

    def handle_hubspot_search(self, query_str):
        params = urllib.parse.parse_qs(query_str)
        q = params.get('q', [''])[0].strip()
        token = params.get('token', [''])[0].strip() or DEFAULT_HUBSPOT_TOKEN
        portal_id = params.get('portal_id', [''])[0].strip() or DEFAULT_HUBSPOT_PORTAL_ID

        if not q:
            self.send_json(400, {'ok': False, 'error': 'Termo de pesquisa (q) não fornecido'})
            return

        self.execute_hubspot_search(q, token, portal_id)

    def handle_hubspot_search_post(self, body):
        try:
            data = json.loads(body) if body else {}
        except Exception:
            data = {}

        q = data.get('q', '').strip()
        token = data.get('token', '').strip() or DEFAULT_HUBSPOT_TOKEN
        portal_id = data.get('portal_id', '').strip() or DEFAULT_HUBSPOT_PORTAL_ID

        if not q:
            self.send_json(400, {'ok': False, 'error': 'Termo de pesquisa (q) não fornecido'})
            return

        self.execute_hubspot_search(q, token, portal_id)

    def execute_hubspot_search(self, query, token, portal_id):
        url = "https://api.hubapi.com/crm/v3/objects/deals/search"
        payload = {
            "query": query,
            "limit": 15,
            "properties": [
                "dealname", "amount", "dealstage", "closedate", 
                "pipeline", "hubspot_owner_id", "createdate"
            ]
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                results = []
                for item in res_data.get('results', []):
                    props = item.get('properties', {})
                    deal_id = item.get('id')
                    deal_url = f"https://app.hubspot.com/contacts/{portal_id}/deal/{deal_id}" if portal_id else f"https://app.hubspot.com/deal/{deal_id}"
                    results.append({
                        'id': deal_id,
                        'name': props.get('dealname', 'Sem nome'),
                        'amount': float(props.get('amount') or 0),
                        'stage': props.get('dealstage', ''),
                        'pipeline': props.get('pipeline', ''),
                        'closeDate': props.get('closedate', ''),
                        'url': deal_url
                    })
                self.send_json(200, {
                    'ok': True,
                    'total': res_data.get('total', len(results)),
                    'results': results
                })
        except urllib.error.HTTPError as e:
            err_msg = e.read().decode('utf-8', errors='ignore')
            self.send_json(e.code, {'ok': False, 'error': f"Erro API HubSpot ({e.code}): {err_msg}"})
        except Exception as e:
            self.send_json(500, {'ok': False, 'error': str(e)})

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AppProxyHandler) as httpd:
        print(f"Servidor Pré-Vendas Servinformacion + HubSpot & Sheets Sync rodando em http://localhost:{PORT}")
        httpd.serve_forever()
