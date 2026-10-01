# Servinformacion Pré-Vendas Hub 🚀

Hub de Gestão de Pré-Vendas, Arquitetura de Soluções Google Cloud Platform (GCP) e Google Workspace (GWS), com integração em tempo real a Google Sheets e HubSpot CRM.

---

## 🌟 Visão Geral

O **Servinformacion Pré-Vendas Hub** centraliza as operações comerciais e técnicas dos arquitetos de pré-vendas da Servinformacion:

- **👨‍💻 Danilo (Arquiteto GWS)**: Soluções Google Workspace, Enterprise, Gemini Enterprise, migrações de e-mail e segurança.
- **👨‍💻 Vinicius (Arquiteto GCP)**: Soluções Google Cloud Platform, migrações de infraestrutura, BigQuery, IA e Foundation.
- **👥 Toda a Equipe**: Visão unificada e consolidada para liderança e diretoria, com métricas de pipeline, volume de licenças e receita de serviços (SOW).

---

## ⚡ Principais Funcionalidades

1. **Gestão Multi-Planilha Não-Destrutiva**:
   - Sincronização direta com planilhas Google Sheets ou importação de arquivos `.xlsx` e `.csv`.
   - Arquitetura de merge que preserva 100% dos dados de cada especialista ao atualizar o outro.
   - Painel de configuração lado a lado para gerenciar links de planilhas individuais.

2. **Integração HubSpot CRM**:
   - Conexão direta com a API do HubSpot (Portal `8388367`).
   - Busca inteligente de deals, clientes e valores para vinculação imediata às propostas técnicas.

3. **Dashboard Executivo & Métricas**:
   - Gráficos de distribuição por estágio comercial e solução (SKU).
   - Indicadores de total de oportunidades, licenças estimadas e valor de serviços.
   - Filtros instantâneos por especialista e termo de busca.

4. **Dossiê Técnico & Acompanhamento de Implantação (Deploy)**:
   - Registro de histórico de propostas com links para Google Docs e Google Slides de defesa técnica.
   - Acompanhamento de fases de migração e go-live.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, Tailwind CSS, Lucide Icons, Chart.js, SheetJS (XLSX), PapaParse.
- **Backend**: Python 3 (servidor HTTP leve nativo com endpoints de sincronização e proxy).
- **Integrações**: Google Sheets API / CSV Export, HubSpot CRM Deals API.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Python 3.8+ instalado.

### Executando o Servidor
No diretório raiz do projeto, execute:

```bash
python server.py
```

O sistema estará acessível em:
👉 **http://localhost:8080**

---

## 📁 Estrutura de Arquivos

```
├── index.html            # Interface de usuário completa (Dashboard, Propostas, Dossiê)
├── app.js                # Lógica de aplicação, estado reativo e fusão de dados
├── server.py             # Servidor Python HTTP com proxy de integração Sheets e HubSpot
├── sync_sheets.py        # Módulo de download e parsing das planilhas Google
├── data/
│   ├── seidor_opps.json  # Base de dados consolidada (Danilo + Vinicius)
│   └── servinformacion_opps.json
├── .gitignore
└── README.md
```

---

## 👥 Autoria & Time

- **Danilo** — Arquiteto de Soluções Google Workspace (GWS) | Servinformacion
- **Vinicius** — Arquiteto de Soluções Google Cloud Platform (GCP) | Servinformacion
