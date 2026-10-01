/**
 * Servinformacion Pré-Vendas - Google Cloud & Workspace Intelligence Hub
 * Lead Pre-Sales Architect: Danilo
 * Focus: Proof of technical authorship, pipeline valuation, deployment governance & renewals
 */

// Application State
const state = {
  activeTab: 'dashboard',
  sheetId: localStorage.getItem('seidor_sheet_id') || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4',
  daniloSheetId: localStorage.getItem('serv_danilo_sheet') || '',
  daniloSheetName: localStorage.getItem('serv_danilo_sheet_name') || 'Página1',
  viniciusSheetId: localStorage.getItem('serv_vinicius_sheet') || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4',
  viniciusSheetName: localStorage.getItem('serv_vinicius_sheet_name') || 'Página1',
  oppsSheetName: localStorage.getItem('seidor_opps_name') || 'Página1',
  deploySheetName: localStorage.getItem('seidor_deploy_name') || 'Agenda GWS - Deploy Workspace',
  selectedSpecialist: localStorage.getItem('serv_specialist') || 'ALL',
  importTargetSpecialist: null,
  opps: [],
  deploys: [],
  renewals: [],
  filteredOpps: [],
  filteredDeploys: [],
  charts: {
    stages: null,
    skus: null
  }
};

// Consolidated base deals for Danilo (GWS) and Vinicius (GCP)
const defaultOpps = [
  {
    "id": "VIN-101",
    "cliente": "Tokio Marine",
    "clienteCompleto": "Tokio Marine 2400 contas",
    "demanda": "SOW Gemni Enterprise",
    "comercial": "Renato",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Gemini Enterprise",
    "licencas": 2400,
    "valorLicencas": 5184000,
    "valorServicos": 45000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "SOW Gemni Enterprise — Tokio Marine - Gemini Enterprise Workshop SOW  - DAF",
    "docTitulo": "Tokio Marine - Gemini Enterprise Workshop SOW  - DAF",
    "docUrl": "https://docs.google.com/document/d/1Tz0OHX6GEcWOjGWJCx5Cld7_8e_3-T58vM7KpdCR1WQ/edit?tab=t.0",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1001",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-102",
    "cliente": "Nexti",
    "clienteCompleto": "Nexti",
    "demanda": "SOW migração",
    "comercial": "Mirela",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Cloud Migration",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 36000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "SOW migração — SOW PSF - Nexti - Migração Supabase para GCP",
    "docTitulo": "SOW PSF - Nexti - Migração Supabase para GCP",
    "docUrl": "https://docs.google.com/document/d/1xX12iKqdKcnQJ-4rqd1ExIOGcp2drywTLFY6YlSOFuQ/edit?tab=t.0",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1002",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-103",
    "cliente": "Paulitec",
    "clienteCompleto": "Paulitec",
    "demanda": "Proposta Google Earth",
    "comercial": "Mirela",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Google Earth Platform",
    "licencas": 0,
    "valorLicencas": 95000,
    "valorServicos": 18000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Proposta Google Earth — Proposta Google Earth - Paulitec",
    "docTitulo": "Proposta Google Earth - Paulitec",
    "docUrl": "https://docs.google.com/document/d/1gmjggRiZlvvVNg9gtoMxWCA8LmfTFPEwr5Ub_KI-xXI/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1003",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-104",
    "cliente": "Vs Engenharia",
    "clienteCompleto": "Vs Engenharia",
    "demanda": "Proposta gcp",
    "comercial": "Mirela",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Google Cloud / Workspace",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 22000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Proposta gcp — VS ENGENHARIA - PROPOSTA TÉCNICA",
    "docTitulo": "VS ENGENHARIA - PROPOSTA TÉCNICA",
    "docUrl": "https://docs.google.com/document/d/1pdDCGy_ZVVY0jlo1OOVblFuKNXDXLuFljaGp27GdvIA/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1004",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-105",
    "cliente": "Clube FII",
    "clienteCompleto": "Clube FII",
    "demanda": "Transfer BIlling",
    "comercial": "Bruno",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Transfer Billing",
    "licencas": 0,
    "valorLicencas": 120000,
    "valorServicos": 12000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Transfer BIlling — [Clube FII] Transfer Billing - GCP",
    "docTitulo": "[Clube FII] Transfer Billing - GCP",
    "docUrl": "https://docs.google.com/document/d/1CGuNqVobPx7VKFvt2GL8I2jjQZa6isyDFo355vLALNQ/edit?tab=t.0",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1005",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-106",
    "cliente": "Nexti",
    "clienteCompleto": "Nexti",
    "demanda": "Migração GCP",
    "comercial": "Bruno",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Cloud Migration",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 36000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Migração GCP — PROPOSTA TÉCNICA - Nexti - MIGRAÇÃO SUPABASE",
    "docTitulo": "PROPOSTA TÉCNICA - Nexti - MIGRAÇÃO SUPABASE",
    "docUrl": "https://docs.google.com/document/d/1X7ExtM8JSb2FcF-gMD5Qut_3UXMTzLhOhbwjfshzXgs/edit?tab=t.0",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1006",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-107",
    "cliente": "AB Card",
    "clienteCompleto": "AB Card",
    "demanda": "Migração GCP",
    "comercial": "Bruno",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Cloud Migration",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 48000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Migração GCP — [Google] SOW AB Card - Migration of infrastructure",
    "docTitulo": "[Google] SOW AB Card - Migration of infrastructure",
    "docUrl": "https://docs.google.com/document/d/1OlwASMNCyeQSZRp9HmJopNdCJuWACcGRkjAxhZDKiDg/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1007",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-108",
    "cliente": "Theo Transportes",
    "clienteCompleto": "Theo Transportes",
    "demanda": "Gemini Enterprise Standard",
    "comercial": "Thiago",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Gemini Enterprise",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 12000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Gemini Enterprise Standard — Comparativo de Licenças Gemini Enterprise – Theo Transportes",
    "docTitulo": "Comparativo de Licenças Gemini Enterprise – Theo Transportes",
    "docUrl": "https://docs.google.com/document/d/1pkqN5CzFgYzVZ1NVwqZBQrhLlA0kiEe6mfEEhngNzU4/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1008",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-109",
    "cliente": "Theo Transportes",
    "clienteCompleto": "Theo Transportes",
    "demanda": "Transfer BIlling",
    "comercial": "Thiago",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Transfer Billing",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 12000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Transfer BIlling — [Theo Transportes] Transfer Billing - GCP",
    "docTitulo": "[Theo Transportes] Transfer Billing - GCP",
    "docUrl": "https://docs.google.com/document/d/1DBMArWfkPv7vIDRSSrWzvdC-IBckBs7H6t8zHT9T-fI/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1009",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-110",
    "cliente": "Theo Transportes",
    "clienteCompleto": "Theo Transportes",
    "demanda": "Transfer Token",
    "comercial": "Thiago",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GWS Transfer Token",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 12000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Transfer Token — Proposta Comercial - Théo Transportes - Servinformación - 17/09/2026",
    "docTitulo": "Proposta Comercial - Théo Transportes - Servinformación - 17/09/2026",
    "docUrl": "https://docs.google.com/presentation/d/1Iuzwhu-jaTC9DHEssIQ2AJvqL_zWtE4rK72P2FHTOBc/edit?usp=sharing",
    "docTipo": "Google Slides",
    "hubspotUrl": "",
    "hubspot": "HS-1010",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-111",
    "cliente": "Demetria",
    "clienteCompleto": "Demetria",
    "demanda": "Transfer Billing de 2 contas diferentes",
    "comercial": "Veronica",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Transfer Billing",
    "licencas": 0,
    "valorLicencas": 120000,
    "valorServicos": 12000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Transfer Billing de 2 contas diferentes — [Demetria] Transfer Billing - GCP",
    "docTitulo": "[Demetria] Transfer Billing - GCP",
    "docUrl": "https://docs.google.com/document/d/1Hn7gx2JDv3-Xj-QC5saVFwuFLB6xeD-Xs3fGSoNfqaA/edit?tab=t.0",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1011",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-112",
    "cliente": "Nexti",
    "clienteCompleto": "Nexti",
    "demanda": "Proposta consultoria + foundation",
    "comercial": "Veronica",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Foundation & Consultoria",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 36000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Proposta consultoria + foundation — PROPOSTA TÉCNICA - Nexti (Foundation + Consultoria)",
    "docTitulo": "PROPOSTA TÉCNICA - Nexti (Foundation + Consultoria)",
    "docUrl": "https://docs.google.com/document/d/1R0OwCoTe-eAQWtbG4d9KhkTrvZ1HHZXMu7WDOEHL6dw/edit?tab=t.0",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1012",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-113",
    "cliente": "Vs Engenharia",
    "clienteCompleto": "Vs Engenharia",
    "demanda": "Proposta Comercial Provisionamento",
    "comercial": "Mirela",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Provisionamento Infra",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 22000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Proposta Comercial Provisionamento — VS ENGENHARIA - Proposta Comercial",
    "docTitulo": "VS ENGENHARIA - Proposta Comercial",
    "docUrl": "https://docs.google.com/presentation/d/1h0mGqWsAydOaP_Ak0MXVRelaQc12ymGs1nubfKE_BsY/edit?slide=id.g2d8f50f02cc_1_812#slide=id.g2d8f50f02cc_1_812",
    "docTipo": "Google Slides",
    "hubspotUrl": "",
    "hubspot": "HS-1013",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-114",
    "cliente": "GFX Engenharia",
    "clienteCompleto": "GFX Engenharia",
    "demanda": "Migração On Premises",
    "comercial": "Mirela",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Cloud Migration",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 48000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Migração On Premises — Proposta Comercial - GFX Consultoria - Migração On premises para GCP",
    "docTitulo": "Proposta Comercial - GFX Consultoria - Migração On premises para GCP",
    "docUrl": "https://docs.google.com/presentation/d/1vPBg18uy0e5wXAwBjDBhVXKTGfMHjlCnms5nLQf5Wug/edit?slide=id.g2d8f50f02cc_1_1274#slide=id.g2d8f50f02cc_1_1274",
    "docTipo": "Google Slides",
    "hubspotUrl": "",
    "hubspot": "HS-1014",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-115",
    "cliente": "Richen",
    "clienteCompleto": "Richen",
    "demanda": "Migraçao e/ou Provisionamento",
    "comercial": "Veronica",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Cloud Migration",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 36000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Migraçao e/ou Provisionamento — Richen - Provisionamento de Ambiente",
    "docTitulo": "Richen - Provisionamento de Ambiente",
    "docUrl": "https://docs.google.com/presentation/d/1S0dZSWPO-JJ2bxRVTJ8wUx0x9X_dTijnHiClieU-EPI/edit?slide=id.g2d8f50f02cc_1_1385#slide=id.g2d8f50f02cc_1_1385",
    "docTipo": "Google Slides",
    "hubspotUrl": "",
    "hubspot": "HS-1015",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-116",
    "cliente": "Richen",
    "clienteCompleto": "Richen",
    "demanda": "Bolsa de Horas de Consultoria",
    "comercial": "Veronica",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Foundation & Consultoria",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 36000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Bolsa de Horas de Consultoria — Bolsa de Horas GCP - Richen",
    "docTitulo": "Bolsa de Horas GCP - Richen",
    "docUrl": "https://docs.google.com/presentation/d/1KJPhp7hfobCFJZT2LCp0ZAlGBeSWndWd_tMujZqwB-o/edit?slide=id.g1f2a6c430cd_0_266#slide=id.g1f2a6c430cd_0_266",
    "docTipo": "Google Slides",
    "hubspotUrl": "",
    "hubspot": "HS-1016",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-117",
    "cliente": "Nexti",
    "clienteCompleto": "Nexti",
    "demanda": "Bolsa de Horas de Consultoria",
    "comercial": "Bruno",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "GCP Foundation & Consultoria",
    "licencas": 0,
    "valorLicencas": 0,
    "valorServicos": 36000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "Bolsa de Horas de Consultoria — Bolsa de Horas GCP - Nexti",
    "docTitulo": "Bolsa de Horas GCP - Nexti",
    "docUrl": "https://docs.google.com/presentation/d/1HCYCVUdPztTP9TSNtTXO9DyPAUT9P_GaoR5f14juT5E/edit?usp=sharing",
    "docTipo": "Google Slides",
    "hubspotUrl": "",
    "hubspot": "HS-1017",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-118",
    "cliente": "Iguaçu Café",
    "clienteCompleto": "Iguaçu Café 800",
    "demanda": "SOW Gemni Enterprise",
    "comercial": "Renato",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Gemini Enterprise",
    "licencas": 800,
    "valorLicencas": 1728000,
    "valorServicos": 25000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "SOW Gemni Enterprise — Iguaçu Café - Gemini Enterprise Workshop SOW",
    "docTitulo": "Iguaçu Café - Gemini Enterprise Workshop SOW",
    "docUrl": "https://docs.google.com/document/d/1K2p9Yrqo-4Tr5E_ikLrsR0S3ju-hD9whM8VoKU8R87M/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1018",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-119",
    "cliente": "MercadoCar",
    "clienteCompleto": "MercadoCar 2500",
    "demanda": "SOW Gemni Enterprise",
    "comercial": "Renato",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Gemini Enterprise",
    "licencas": 2500,
    "valorLicencas": 5400000,
    "valorServicos": 45000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "SOW Gemni Enterprise — Mercado Car - Gemini Enterprise Workshop SOW",
    "docTitulo": "Mercado Car - Gemini Enterprise Workshop SOW",
    "docUrl": "https://docs.google.com/document/d/1qOEqn-KzTjYPnWqiN4LYzbAWZfBx-GA5_m5xSm_aE7U/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1019",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "VIN-120",
    "cliente": "ITA",
    "clienteCompleto": "ITA 400",
    "demanda": "SOW Gemni Enterprise",
    "comercial": "Renato",
    "preVenda": "Vinicius",
    "autoria": "Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion",
    "sku": "Gemini Enterprise",
    "licencas": 400,
    "valorLicencas": 864000,
    "valorServicos": 25000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-10-15",
    "escopo": "SOW Gemni Enterprise — ITA - Gemini Enterprise Workshop SOW",
    "docTitulo": "ITA - Gemini Enterprise Workshop SOW",
    "docUrl": "https://docs.google.com/document/d/1V_xz1nY7iJOVVYfbH3Y1xso7xPB8-EjKTx68oB856JE/edit?usp=sharing",
    "docTipo": "Google Docs",
    "hubspotUrl": "",
    "hubspot": "HS-1020",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "DAN-101",
    "cliente": "Hospital Santa Catarina",
    "clienteCompleto": "Hospital Santa Catarina 4.800 contas",
    "demanda": "Migração Exchange On-Prem para Google Workspace Enterprise Standard + Gemini",
    "comercial": "Marcelo Rocha",
    "preVenda": "Danilo",
    "autoria": "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion",
    "sku": "Google Workspace Enterprise Standard + Gemini",
    "licencas": 4800,
    "valorLicencas": 1200000,
    "valorServicos": 85000,
    "estagio": "Negociação",
    "previsao": "2026-10-25",
    "escopo": "Migração completa de 4.800 caixas Exchange On-Premise para Google Workspace Enterprise Standard com retenção Vault e segurança DLP avançada.",
    "docTitulo": "Proposta Técnica & Arquitetura — Hospital Santa Catarina",
    "docUrl": "https://docs.google.com/document/d/1vH9K2L8wHospitalSantaCatarina/edit",
    "docTipo": "Google Docs",
    "hubspotUrl": "https://app.hubspot.com/contacts/8388367/record/0-3/112938475",
    "hubspot": "HS-1001",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "DAN-102",
    "cliente": "TransBrasil Logística",
    "clienteCompleto": "TransBrasil Logística 1.200 contas",
    "demanda": "Google Workspace Business Plus + AppSheet Core para motoristas",
    "comercial": "Camila Silveira",
    "preVenda": "Danilo",
    "autoria": "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion",
    "sku": "Google Workspace Business Plus + AppSheet",
    "licencas": 1200,
    "valorLicencas": 450000,
    "valorServicos": 45000,
    "estagio": "Fechado Ganho",
    "previsao": "2026-10-10",
    "escopo": "Implementação Google Workspace Business Plus com AppSheet integrado a frotas em tempo real.",
    "docTitulo": "SOW Implantação GWS — TransBrasil",
    "docUrl": "https://docs.google.com/document/d/1mB7T5K9xTransBrasilLog/edit",
    "docTipo": "Google Docs",
    "hubspotUrl": "https://app.hubspot.com/contacts/8388367/record/0-3/112938476",
    "hubspot": "HS-1002",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "DAN-103",
    "cliente": "CrediFlow FinTech",
    "clienteCompleto": "CrediFlow FinTech 650 contas",
    "demanda": "Google Workspace Enterprise Plus + BeyondCorp Enterprise Zero Trust",
    "comercial": "Rodrigo Mendes",
    "preVenda": "Danilo",
    "autoria": "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion",
    "sku": "Google Workspace Enterprise Plus + BeyondCorp",
    "licencas": 650,
    "valorLicencas": 280000,
    "valorServicos": 38000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-11-05",
    "escopo": "Defesa técnica para conformidade Bacen com DLP, Context-Aware Access e BeyondCorp.",
    "docTitulo": "Arquitetura de Segurança Bancária — CrediFlow",
    "docUrl": "https://docs.google.com/presentation/d/1kL8N3M4xCrediFlowDeck/edit",
    "docTipo": "Google Slides",
    "hubspotUrl": "https://app.hubspot.com/contacts/8388367/record/0-3/112938477",
    "hubspot": "HS-1003",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "DAN-104",
    "cliente": "Metalúrgica Valença",
    "clienteCompleto": "Metalúrgica Valença 900 contas",
    "demanda": "Migração Zimbra para Google Workspace Business Standard",
    "comercial": "Marcelo Rocha",
    "preVenda": "Danilo",
    "autoria": "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion",
    "sku": "Google Workspace Business Standard",
    "licencas": 900,
    "valorLicencas": 220000,
    "valorServicos": 32000,
    "estagio": "Negociação",
    "previsao": "2026-10-30",
    "escopo": "Migração de caixas postais Zimbra open-source para Google Workspace Business Standard.",
    "docTitulo": "Plano de Transição Zimbra > GWS — Valença",
    "docUrl": "https://docs.google.com/document/d/1pQ9R8S7xValencaMetal/edit",
    "docTipo": "Google Docs",
    "hubspotUrl": "https://app.hubspot.com/contacts/8388367/record/0-3/112938478",
    "hubspot": "HS-1004",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "DAN-105",
    "cliente": "Rede Educacional Dom Bosco",
    "clienteCompleto": "Rede Educacional Dom Bosco 15.000 contas",
    "demanda": "Google Workspace for Education Plus + Chromebooks",
    "comercial": "Fernanda Lima",
    "preVenda": "Danilo",
    "autoria": "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion",
    "sku": "Google Workspace Education Plus",
    "licencas": 15000,
    "valorLicencas": 390000,
    "valorServicos": 60000,
    "estagio": "Proposta Técnica Entregue",
    "previsao": "2026-11-20",
    "escopo": "Licenciamento Education Plus para alunos e docentes com console centralizado.",
    "docTitulo": "Apresentação Pedagógica & TI — Dom Bosco",
    "docUrl": "https://docs.google.com/presentation/d/1tY8U7I6xDomBoscoEdu/edit",
    "docTipo": "Google Slides",
    "hubspotUrl": "https://app.hubspot.com/contacts/8388367/record/0-3/112938479",
    "hubspot": "HS-1005",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  },
  {
    "id": "DAN-106",
    "cliente": "Moda Brasil Varejo",
    "clienteCompleto": "Moda Brasil Varejo 2.100 contas",
    "demanda": "Google Workspace Frontline Worker + Enterprise Standard",
    "comercial": "Camila Silveira",
    "preVenda": "Danilo",
    "autoria": "Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion",
    "sku": "Google Workspace Frontline + Standard",
    "licencas": 2100,
    "valorLicencas": 340000,
    "valorServicos": 42000,
    "estagio": "Fechado Ganho",
    "previsao": "2026-10-18",
    "escopo": "Setup de contas corporativas para gerentes de loja e licenças Frontline para floor staff.",
    "docTitulo": "Arquitetura Frontline — Moda Brasil",
    "docUrl": "https://docs.google.com/document/d/1oP9I8U7xModaBrasil/edit",
    "docTipo": "Google Docs",
    "hubspotUrl": "https://app.hubspot.com/contacts/8388367/record/0-3/112938480",
    "hubspot": "HS-1006",
    "origem": "Planilha Google Sheets Oficial — Servinformacion"
  }
];


// Realistic deployment projects from the "Agenda GWS - Deploy Workspace" tab
const defaultDeploys = [
  {
    id: 'DEP-201',
    cliente: 'Hospital Santa Catarina & Rede Saúde',
    responsavel: 'Danilo (Arquiteto) & Time Deploy',
    fase: 'Provisionamento',
    dataInicio: '2026-10-01',
    goLive: '2026-10-25',
    origem: 'Exchange 2016 On-Premises',
    contas: 650,
    statusProgresso: 35,
    detalhes: 'DNS validado, rotas MX preparadas para dual-delivery, migração piloto de 30 VIPs agendada.'
  },
  {
    id: 'DEP-202',
    cliente: 'Grupo Logística TransBrasil S.A.',
    responsavel: 'Danilo (Líder Técnico)',
    fase: 'Migração',
    dataInicio: '2026-09-20',
    goLive: '2026-10-10',
    origem: 'Microsoft 365',
    contas: 280,
    statusProgresso: 70,
    detalhes: 'Migração de caixas via Google Workspace Migration for Microsoft Exchange (GWMME). 75% concluído.'
  },
  {
    id: 'DEP-203',
    cliente: 'Rede Educacional Dom Bosco',
    responsavel: 'Danilo (Homologador)',
    fase: 'Go-Live',
    dataInicio: '2026-09-01',
    goLive: '2026-09-29',
    origem: 'G Suite Legacy',
    contas: 1200,
    statusProgresso: 100,
    detalhes: 'Go-Live executado com sucesso sem interrupção de aulas. Treinamento docente concluído.'
  },
  {
    id: 'DEP-204',
    cliente: 'Agropecuária Serra Dourada',
    responsavel: 'Danilo (Pré-Vendas & Handover)',
    fase: 'Kickoff',
    dataInicio: '2026-10-08',
    goLive: '2026-11-15',
    origem: 'Zimbra Open Source',
    contas: 110,
    statusProgresso: 15,
    detalhes: 'Reunião de Kickoff realizada com time de TI do cliente. Levantamento de portas IMAP concluído.'
  }
];

// Realistic renewals
const defaultRenewals = [
  {
    id: 'REN-301',
    cliente: 'Tecnologia Alpha Sistemas',
    plano: 'Business Standard',
    licencas: 140,
    vencimento: '2026-10-28',
    upsell: 'Proposta de Upgrade para Business Plus + 40 Gemini',
    arr: 98000,
    status: 'Em Negociação'
  },
  {
    id: 'REN-302',
    cliente: 'Construtora Metropolitana',
    plano: 'Business Starter',
    licencas: 310,
    vencimento: '2026-11-12',
    upsell: 'Migração para Business Standard (Google Meet 150 + Gravação)',
    arr: 186000,
    status: 'Proposta Enviada'
  },
  {
    id: 'REN-303',
    cliente: 'Laboratório Farmacêutico Biovida',
    plano: 'Enterprise Standard',
    licencas: 220,
    vencimento: '2026-12-05',
    upsell: 'Renovação com 100% de Gemini Enterprise',
    arr: 290400,
    status: 'Confirmado Retenção'
  }
];

// Initialize application on page load
document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  await loadStoredData();
  setSpecialist(state.selectedSpecialist || 'ALL');
  renderAll();
});

// Format Currency BRL
function formatBRL(value) {
  const num = Number(value) || 0;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Format number
function formatNum(value) {
  const num = Number(value) || 0;
  return num.toLocaleString('pt-BR');
}

// Tab Switching logic
function switchTab(tabName) {
  state.activeTab = tabName;
  
  // Update nav buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'text-seidor-primary', 'bg-seidor-gray', 'border-b-2', 'border-seidor-primary');
    btn.classList.add('text-slate-600');
  });

  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'text-seidor-primary', 'bg-seidor-gray', 'border-b-2', 'border-seidor-primary');
    activeBtn.classList.remove('text-slate-600');
  }

  // Update tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });

  const activeContent = document.getElementById(`tab-${tabName}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }

  // Re-render chart sizes if entering dashboard
  if (tabName === 'dashboard') {
    setTimeout(renderCharts, 50);
  }

  lucide.createIcons();
}

// Load Stored Data or use Defaults
async function loadStoredData() {
  state.daniloSheetId = localStorage.getItem('serv_danilo_sheet') || '';
  state.daniloSheetName = localStorage.getItem('serv_danilo_sheet_name') || 'Página1';
  state.viniciusSheetId = localStorage.getItem('serv_vinicius_sheet') || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';
  state.viniciusSheetName = localStorage.getItem('serv_vinicius_sheet_name') || 'Página1';

  if (!state.sheetId) {
    state.sheetId = state.viniciusSheetId || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';
  }
  if (localStorage.getItem('seidor_opps_name')) {
    state.oppsSheetName = localStorage.getItem('seidor_opps_name');
  }

  const savedOpps = localStorage.getItem('seidor_opps_data');
  const savedDeploys = localStorage.getItem('seidor_deploy_data');
  const savedRenewals = localStorage.getItem('seidor_renewals_data');

  if (savedOpps) {
    try {
      const parsedOpps = JSON.parse(savedOpps);
      if (Array.isArray(parsedOpps) && parsedOpps.length > 0) {
        state.opps = parsedOpps;
        state.filteredOpps = [...parsedOpps];
      }
    } catch (e) {
      console.warn('Error parsing localStorage opps:', e);
    }
  }

  // Ensure both architects are loaded if present in backend json
  const hasDanilo = (state.opps || []).some(o => (o.preVenda || '').toLowerCase().includes('danilo'));
  const hasVinicius = (state.opps || []).some(o => (o.preVenda || '').toLowerCase().includes('vinicius'));

  if (!state.opps || state.opps.length === 0 || !hasDanilo || !hasVinicius) {
    try {
      const res = await fetch('data/seidor_opps.json');
      if (res.ok) {
        const realData = await res.json();
        if (Array.isArray(realData) && realData.length > 0) {
          state.opps = realData;
          state.filteredOpps = [...realData];
          localStorage.setItem('seidor_opps_data', JSON.stringify(realData));
        }
      }
    } catch (err) {
      console.log('Fetching local json skipped:', err);
    }
  }

  // Fallback to default mock opps if still empty
  if (!state.opps || state.opps.length === 0) {
    state.opps = defaultOpps;
    state.filteredOpps = [...defaultOpps];
  }

  state.deploys = savedDeploys ? JSON.parse(savedDeploys) : defaultDeploys;
  state.renewals = savedRenewals ? JSON.parse(savedRenewals) : defaultRenewals;
  state.filteredDeploys = [...state.deploys];

  // Fill modal inputs if present
  if (document.getElementById('cfg-sheet-url-danilo')) {
    document.getElementById('cfg-sheet-url-danilo').value = state.daniloSheetId || '';
  }
  if (document.getElementById('cfg-sheet-opps-danilo')) {
    document.getElementById('cfg-sheet-opps-danilo').value = state.daniloSheetName || 'Página1';
  }
  if (document.getElementById('cfg-sheet-url-vinicius')) {
    document.getElementById('cfg-sheet-url-vinicius').value = state.viniciusSheetId || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';
  }
  if (document.getElementById('cfg-sheet-opps-vinicius')) {
    document.getElementById('cfg-sheet-opps-vinicius').value = state.viniciusSheetName || 'Página1';
  }

  updateModalBadges();
}

// Helper to get opportunities based on the currently selected specialist
function getSpecialistOpps() {
  if (!state.selectedSpecialist || state.selectedSpecialist === 'ALL') {
    return state.opps;
  }
  return state.opps.filter(o => (o.preVenda || '').toLowerCase().includes(state.selectedSpecialist.toLowerCase()));
}

// Set active specialist (Danilo, Vinicius, or ALL)
function setSpecialist(name) {
  state.selectedSpecialist = name;
  localStorage.setItem('serv_specialist', name);

  // Sync Header select
  const headerSelect = document.getElementById('header-specialist-select');
  if (headerSelect && headerSelect.value !== name) {
    headerSelect.value = name;
  }

  // Sync Opps table filter select
  const oppsFilter = document.getElementById('opps-prevenda-filter');
  if (oppsFilter && oppsFilter.value !== name) {
    oppsFilter.value = name;
  }

  // Sync pill buttons styling across Dashboard and Dossier
  document.querySelectorAll('.pill-spec').forEach(btn => {
    const isCurrent = btn.getAttribute('data-spec') === name;
    if (isCurrent) {
      btn.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      btn.classList.remove('text-slate-600', 'text-slate-300', 'hover:text-slate-900', 'hover:text-white');
    } else {
      btn.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      if (btn.closest('#tab-dossier') || btn.closest('#tab-opps')) {
        btn.classList.add('text-slate-600', 'hover:text-slate-900');
      } else {
        btn.classList.add('text-slate-300', 'hover:text-white');
      }
    }
  });

  // Update Header Avatar & Role text
  const headerAvatar = document.getElementById('header-avatar');
  if (headerAvatar) {
    headerAvatar.textContent = name === 'ALL' ? 'EQ' : name.charAt(0).toUpperCase();
  }
  const headerRole = document.getElementById('header-specialist-role');
  if (headerRole) {
    if (name === 'ALL') {
      headerRole.textContent = 'Servinformacion Pré-Vendas';
    } else if (name === 'Vinicius') {
      headerRole.textContent = 'Vinicius • Arquiteto GCP';
    } else {
      headerRole.textContent = 'Danilo • Arquiteto GWS';
    }
  }

  // Update Dashboard Active Badge
  const activeBadge = document.getElementById('active-specialist-badge');
  if (activeBadge) {
    if (name === 'ALL') {
      activeBadge.textContent = 'Toda a Equipe (Consolidado)';
    } else if (name === 'Vinicius') {
      activeBadge.textContent = 'Vinicius (Arquiteto GCP)';
    } else {
      activeBadge.textContent = 'Danilo (Arquiteto GWS)';
    }
  }

  // Update Dossier Tab Button Text
  const dossierTabText = document.getElementById('tab-btn-dossier-text');
  if (dossierTabText) {
    dossierTabText.textContent = name === 'ALL' ? 'Dossiê da Equipe' : `Dossiê (${name})`;
  }

  filterOpps();
  renderKPIs();
  renderCharts();
  renderRecentDashboardLists();
  renderDossier();
}

function onOppsSpecialistFilterChange(value) {
  setSpecialist(value);
}

// Render All views & KPIs
function renderAll() {
  renderKPIs();
  renderRecentDashboardLists();
  renderOppsTable();
  renderDeployCards();
  renderRenewalsTable();
  renderDossier();
  renderCharts();
  updateBadges();
  lucide.createIcons();
}

// Update Header counts
function updateBadges() {
  const oppsBadge = document.getElementById('badge-opps-count');
  if (oppsBadge) oppsBadge.textContent = state.opps.length;
}

// Calculate and render executive KPIs
function renderKPIs() {
  const oppsList = getSpecialistOpps();

  const totalPipeline = oppsList.reduce((acc, curr) => acc + (Number(curr.valorLicencas) || 0), 0);
  const totalServices = oppsList.reduce((acc, curr) => acc + (Number(curr.valorServicos) || 0), 0);
  const totalSeats = oppsList.reduce((acc, curr) => acc + (Number(curr.licencas) || 0), 0);
  const totalWithDocs = oppsList.filter(o => o.docUrl || o.hubspotUrl).length;

  const kpiPipe = document.getElementById('kpi-pipeline-total');
  if (kpiPipe) kpiPipe.textContent = formatBRL(totalPipeline);

  const kpiServ = document.getElementById('kpi-services-total');
  if (kpiServ) kpiServ.textContent = formatBRL(totalServices);

  const kpiSeats = document.getElementById('kpi-seats-total');
  if (kpiSeats) kpiSeats.textContent = formatNum(totalSeats);

  const kpiDeploy = document.getElementById('kpi-deploy-active');
  if (kpiDeploy) kpiDeploy.textContent = totalWithDocs;

  // Dynamic subtitle for KPI 1
  const kpiSpecSubtext = document.getElementById('kpi-spec-subtext');
  if (kpiSpecSubtext) {
    kpiSpecSubtext.textContent = state.selectedSpecialist === 'ALL' ? 'Desenho Equipe' : `Desenho ${state.selectedSpecialist}`;
  }

  // Dossier values
  const dosPipe = document.getElementById('dossier-pipeline');
  if (dosPipe) dosPipe.textContent = formatBRL(totalPipeline);

  const dosServ = document.getElementById('dossier-services');
  if (dosServ) dosServ.textContent = formatBRL(totalServices);

  const dosSeats = document.getElementById('dossier-seats');
  if (dosSeats) dosSeats.textContent = formatNum(totalSeats);

  const dosDeploys = document.getElementById('dossier-deploys');
  if (dosDeploys) dosDeploys.textContent = totalWithDocs;
}

// Render Recent deals and deliverables on dashboard home
function renderRecentDashboardLists() {
  const oppsList = getSpecialistOpps();
  const oppsListEl = document.getElementById('dashboard-recent-opps');
  const deliverablesListEl = document.getElementById('dashboard-recent-deploys');

  // Top 4 Opps for active specialist
  if (oppsListEl) {
    if (oppsList.length === 0) {
      oppsListEl.innerHTML = `<div class="py-6 text-center text-xs text-slate-400">Nenhuma oportunidade atribuída a este especialista.</div>`;
    } else {
      oppsListEl.innerHTML = oppsList.slice(0, 4).map(opp => `
        <div class="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition cursor-pointer" onclick="viewOppDetail('${opp.id}')">
          <div>
            <div class="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span>${opp.cliente}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${getStageBadgeClass(opp.estagio)}">${opp.estagio}</span>
            </div>
            <div class="text-xs text-slate-500 mt-0.5">
              Comercial: <span class="font-medium text-slate-700">${opp.comercial}</span> • Pré-Vendas: <span class="font-bold ${opp.preVenda && opp.preVenda.toLowerCase().includes('vinicius') ? 'text-purple-600' : 'text-emerald-600'}">${opp.preVenda || 'Danilo'}</span> • SKU: <span class="text-seidor-primary font-semibold">${opp.sku}</span> (${opp.licencas} lic.)
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-black text-seidor-dark">${formatBRL(opp.valorLicencas)}</div>
            <div class="text-[11px] text-emerald-600 font-semibold">+ ${formatBRL(opp.valorServicos)} serv.</div>
          </div>
        </div>
      `).join('');
    }
  }

  // Top deliverables with links (SOW / HubSpot)
  if (deliverablesListEl) {
    const oppsWithLinks = oppsList.filter(o => o.docUrl || o.hubspotUrl).slice(0, 4);
    if (oppsWithLinks.length > 0) {
      deliverablesListEl.innerHTML = oppsWithLinks.map(opp => `
        <div class="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition cursor-pointer" onclick="viewOppDetail('${opp.id}')">
          <div>
            <div class="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <span>${opp.cliente}</span>
              ${opp.docTipo ? `<span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${opp.docTipo === 'Google Slides' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">${opp.docTipo}</span>` : ''}
              ${opp.hubspotUrl ? `<span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-orange-100 text-orange-800">HubSpot</span>` : ''}
            </div>
            <div class="text-xs text-slate-500 mt-0.5 line-clamp-1">
              ${opp.docTitulo || opp.demanda || 'Proposta Técnica & SOW'}
            </div>
          </div>
          <div class="flex items-center space-x-1.5 shrink-0">
            ${opp.docUrl ? `
              <a href="${opp.docUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="p-1.5 rounded-lg bg-blue-50 text-seidor-primary hover:bg-blue-100 border border-blue-200 transition" title="Abrir Documento">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              </a>
            ` : ''}
            ${opp.hubspotUrl ? `
              <a href="${opp.hubspotUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="p-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 transition" title="Abrir no HubSpot">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            ` : ''}
          </div>
        </div>
      `).join('');
    } else {
      deliverablesListEl.innerHTML = '<div class="py-6 text-center text-xs text-slate-400">Nenhum link vinculado ainda. Clique nas propostas para adicionar SOW ou HubSpot.</div>';
    }
  }
}

// Helper: Stage badge CSS
function getStageBadgeClass(stage) {
  if (!stage) return 'bg-slate-100 text-slate-700';
  const s = stage.toLowerCase();
  if (s.includes('ganho') || s.includes('fechado')) return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  if (s.includes('negocia')) return 'bg-blue-100 text-blue-800 border border-blue-200';
  if (s.includes('proposta') || s.includes('apresent')) return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
  if (s.includes('qualifica') || s.includes('poc')) return 'bg-amber-100 text-amber-800 border border-amber-200';
  return 'bg-slate-100 text-slate-700';
}

// Date formatter
function formatDate(dateStr) {
  if (!dateStr) return 'A definir';
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

// ==========================================
// OPPS TABLE & FILTERS
// ==========================================
function renderOppsTable() {
  const tbody = document.getElementById('opps-tbody');
  const empty = document.getElementById('opps-empty');

  if (state.filteredOpps.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  tbody.innerHTML = state.filteredOpps.map(opp => {
    // Format Deliverable Document Link (Google Doc or Google Slides)
    let docBtn = '';
    if (opp.docUrl) {
      const isSlide = opp.docTipo === 'Google Slides' || opp.docUrl.includes('presentation') || opp.docUrl.includes('slide');
      docBtn = `
        <div class="inline-flex items-center space-x-1">
          <a href="${opp.docUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="inline-flex items-center space-x-1 px-2 py-1 rounded-lg ${isSlide ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200' : 'bg-blue-50 text-seidor-primary hover:bg-blue-100 border-blue-200'} font-bold text-xs border transition shadow-sm group" title="${opp.docTitulo || 'Abrir proposta no Google Drive'}">
            <i data-lucide="${isSlide ? 'presentation' : 'file-text'}" class="w-3.5 h-3.5 ${isSlide ? 'text-amber-600' : 'text-blue-600'}"></i>
            <span>${isSlide ? 'Slides' : 'SOW / Doc'}</span>
            <i data-lucide="external-link" class="w-3 h-3 opacity-60 group-hover:opacity-100"></i>
          </a>
          <button onclick="event.stopPropagation(); copyLinkToClipboard('${opp.docUrl}')" class="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-seidor-primary transition" title="Copiar link do documento">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } else {
      docBtn = `
        <button onclick="event.stopPropagation(); viewOppDetail('${opp.id}')" class="inline-flex items-center space-x-1 px-2 py-1 rounded-lg border border-dashed border-slate-300 text-slate-400 hover:text-seidor-primary text-xs font-semibold transition" title="Clique para vincular link da proposta">
          <i data-lucide="plus" class="w-3 h-3"></i>
          <span>SOW / Doc</span>
        </button>
      `;
    }

    // Format HubSpot Deal Link
    let hubspotBtn = '';
    const hsUrl = opp.hubspotUrl || (opp.hubspot && opp.hubspot.startsWith('http') ? opp.hubspot : '');
    if (hsUrl) {
      hubspotBtn = `
        <div class="inline-flex items-center space-x-1">
          <a href="${hsUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="inline-flex items-center space-x-1.5 px-2 py-1 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 font-bold text-xs transition shadow-sm group" title="Abrir Deal no HubSpot">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>HubSpot</span>
            <i data-lucide="external-link" class="w-3 h-3 opacity-60 group-hover:opacity-100"></i>
          </a>
          <button onclick="event.stopPropagation(); copyLinkToClipboard('${hsUrl}')" class="p-1 rounded-lg hover:bg-orange-100 text-orange-400 hover:text-orange-700 transition" title="Copiar link do HubSpot">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>
          <button onclick="event.stopPropagation(); openHubSpotSearch('${opp.id}', '${(opp.cliente || '').replace(/'/g, "\\'")}')" class="p-1 rounded-lg hover:bg-orange-100 text-orange-400 hover:text-orange-700 transition" title="Pesquisar/Trocar Deal no HubSpot">
            <i data-lucide="search" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    } else {
      hubspotBtn = `
        <button onclick="event.stopPropagation(); quickAddHubSpot('${opp.id}')" class="inline-flex items-center space-x-1 px-2 py-1 rounded-lg border border-dashed border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-400 text-xs font-semibold transition" title="Clique para colocar o link do HubSpot">
          <i data-lucide="plus" class="w-3 h-3 text-orange-500"></i>
          <span>HubSpot</span>
        </button>
      `;
    }

    const docDisplay = `
      <div class="flex items-center justify-center space-x-1.5 flex-wrap gap-y-1">
        ${docBtn}
        ${hubspotBtn}
      </div>
    `;

    return `
      <tr class="hover:bg-slate-50/80 transition cursor-pointer" onclick="viewOppDetail('${opp.id}')">
        <td class="py-3.5 px-4">
          <div class="font-bold text-slate-900 flex items-center space-x-1.5">
            <span>${opp.cliente}</span>
            ${opp.licencas > 0 ? `<span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-semibold">${opp.licencas} contas</span>` : ''}
          </div>
          <div class="text-[11px] text-slate-500 font-medium">${opp.demanda || opp.sku || 'Google Workspace'}</div>
        </td>
        <td class="py-3.5 px-4 font-semibold text-slate-700">
          <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-seidor-primary"></span>
            <span>${opp.comercial || 'AM Responsável'}</span>
          </div>
        </td>
        <td class="py-3.5 px-4 font-medium text-slate-600 text-xs whitespace-nowrap">
          ${formatDate(opp.previsao)}
        </td>
        <td class="py-3.5 px-4 text-center">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${getStageBadgeClass(opp.estagio)}">
            ${opp.estagio}
          </span>
        </td>
        <td class="py-3.5 px-4 max-w-xs">
          <div class="text-xs text-slate-600 line-clamp-2" title="${opp.escopo || ''}">
            ${opp.escopo || '<span class="text-slate-300 italic">Sem notas cadastradas</span>'}
          </div>
        </td>
        <td class="py-3.5 px-4 text-center whitespace-nowrap">
          ${docDisplay}
        </td>
        <td class="py-3.5 px-4 text-center whitespace-nowrap">
          <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg ${opp.preVenda && opp.preVenda.toLowerCase().includes('vinicius') ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'} text-xs font-bold border" title="Defesa técnica conduzida por ${opp.preVenda || 'Danilo'}">
            <i data-lucide="${opp.preVenda && opp.preVenda.toLowerCase().includes('vinicius') ? 'user-check' : 'shield-check'}" class="w-3.5 h-3.5 ${opp.preVenda && opp.preVenda.toLowerCase().includes('vinicius') ? 'text-purple-600' : 'text-emerald-600'}"></i>
            <span>${opp.preVenda || 'Danilo'}</span>
          </span>
        </td>
        <td class="py-3.5 px-4 text-center">
          <button onclick="event.stopPropagation(); viewOppDetail('${opp.id}')" class="p-1.5 text-slate-400 hover:text-seidor-primary rounded-lg hover:bg-slate-100 transition" title="Ver detalhes completos">
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  lucide.createIcons();
}

function filterOpps() {
  const search = (document.getElementById('opps-search')?.value || '').toLowerCase();
  const stage = document.getElementById('opps-stage-filter')?.value || 'ALL';
  const spec = document.getElementById('opps-prevenda-filter')?.value || state.selectedSpecialist || 'ALL';

  state.filteredOpps = state.opps.filter(opp => {
    const matchesSearch = 
      (opp.cliente && opp.cliente.toLowerCase().includes(search)) ||
      (opp.comercial && opp.comercial.toLowerCase().includes(search)) ||
      (opp.sku && opp.sku.toLowerCase().includes(search)) ||
      (opp.preVenda && opp.preVenda.toLowerCase().includes(search)) ||
      (opp.estagio && opp.estagio.toLowerCase().includes(search));

    const matchesStage = stage === 'ALL' || (opp.estagio && opp.estagio.toLowerCase().includes(stage.toLowerCase()));
    const matchesSpec = spec === 'ALL' || (opp.preVenda && opp.preVenda.toLowerCase().includes(spec.toLowerCase()));

    return matchesSearch && matchesStage && matchesSpec;
  });

  renderOppsTable();
}

// ==========================================
// DEPLOY CARDS (AGENDA GWS)
// ==========================================
function renderDeployCards() {
  const grid = document.getElementById('deploy-cards-grid');
  const empty = document.getElementById('deploy-empty');
  if (!grid) return;

  if (state.filteredDeploys.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  grid.innerHTML = state.filteredDeploys.map(dep => `
    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4 cursor-pointer" onclick="viewDeployDetail('${dep.id}')">
      <div class="flex items-start justify-between">
        <div>
          <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-seidor-light/20 text-seidor-primary">
            ${dep.fase}
          </span>
          <h4 class="font-bold text-slate-900 text-base mt-1.5">${dep.cliente}</h4>
          <p class="text-xs text-slate-500">ID: ${dep.id} • ${dep.contas} Contas</p>
        </div>
        <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
          <i data-lucide="rocket" class="w-4 h-4"></i>
        </div>
      </div>

      <!-- Progress bar -->
      <div>
        <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1">
          <span>Progresso do Deploy</span>
          <span class="text-seidor-primary font-bold">${dep.statusProgresso || 50}%</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div class="bg-emerald-500 h-2 rounded-full transition-all duration-500" style="width: ${dep.statusProgresso || 50}%"></div>
        </div>
      </div>

      <div class="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Origem:</span>
          <span class="font-semibold text-slate-700">${dep.origem || 'Exchange / On-Prem'}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Kickoff:</span>
          <span class="font-semibold text-slate-700">${formatDate(dep.dataInicio)}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Go-Live:</span>
          <span class="font-bold text-emerald-600">${formatDate(dep.goLive)}</span>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span class="text-slate-500">Resp. Técnico:</span>
        <span class="font-bold text-seidor-primary flex items-center space-x-1">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i>
          <span>${dep.responsavel || 'Danilo'}</span>
        </span>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function filterDeploys() {
  const search = document.getElementById('deploy-search').value.toLowerCase();
  const filter = document.getElementById('deploy-status-filter').value;

  state.filteredDeploys = state.deploys.filter(dep => {
    const matchesSearch = 
      (dep.cliente && dep.cliente.toLowerCase().includes(search)) ||
      (dep.origem && dep.origem.toLowerCase().includes(search)) ||
      (dep.responsavel && dep.responsavel.toLowerCase().includes(search));

    const matchesFilter = filter === 'ALL' || (dep.fase && dep.fase.toLowerCase().includes(filter.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  renderDeployCards();
}

// ==========================================
// RENEWALS TABLE
// ==========================================
function renderRenewalsTable() {
  const tbody = document.getElementById('renewals-tbody');
  if (!tbody) return;
  tbody.innerHTML = state.renewals.map(ren => `
    <tr class="hover:bg-slate-50/80 transition">
      <td class="py-3.5 px-4 font-bold text-slate-900">${ren.cliente}</td>
      <td class="py-3.5 px-4 font-medium text-slate-700">${ren.plano}</td>
      <td class="py-3.5 px-4 text-center font-bold text-slate-700">${formatNum(ren.licencas)}</td>
      <td class="py-3.5 px-4 font-semibold text-amber-700">${formatDate(ren.vencimento)}</td>
      <td class="py-3.5 px-4 text-xs font-semibold text-seidor-primary">${ren.upsell}</td>
      <td class="py-3.5 px-4 text-right font-black text-slate-900">${formatBRL(ren.arr)}</td>
      <td class="py-3.5 px-4 text-center">
        <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
          ${ren.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// DOSSIÊ DO ESPECIALISTA & SELO DE AUTORIA
// ==========================================
function renderDossier() {
  const oppsList = getSpecialistOpps();
  const spec = state.selectedSpecialist || 'ALL';
  const isAll = spec === 'ALL';
  const displayName = isAll ? 'Equipe de Pré-Vendas' : spec;

  // Update header text, avatar and metadata in dossier
  const avatarEl = document.getElementById('dossier-avatar');
  if (avatarEl) avatarEl.textContent = isAll ? 'EQ' : spec.charAt(0).toUpperCase();

  const nameEl = document.getElementById('dossier-name');
  if (nameEl) nameEl.textContent = displayName;

  const watermarkEl = document.getElementById('dossier-watermark');
  if (watermarkEl) watermarkEl.textContent = isAll ? 'EQUIPE GWS' : spec.toUpperCase();

  const badgeEl = document.getElementById('dossier-badge');
  if (badgeEl) {
    badgeEl.textContent = isAll ? 'Portfólio Consolidado da Equipe' : 'Pré-Vendas & Soluções Google';
  }

  const docIdEl = document.getElementById('dossier-doc-id');
  if (docIdEl) {
    const cleanId = (isAll ? 'EQUIPE' : spec).toUpperCase().replace(/[^A-Z0-9]/g, '');
    docIdEl.textContent = `Doc. ID: SERV-GWS-${cleanId}-2026`;
  }

  const servicesSubEl = document.getElementById('dossier-services-sub');
  if (servicesSubEl) {
    servicesSubEl.textContent = isAll ? 'Escopos técnicos da equipe' : `Escopos técnicos ${spec}`;
  }

  const declEl = document.getElementById('dossier-declaration');
  if (declEl) {
    declEl.innerHTML = `<strong>Declaração de Autoria Técnica:</strong> Este relatório consolida todas as oportunidades, dimensionamentos de infraestrutura, planos de migração (Exchange/M365 para Google Workspace), cálculos de licenciamento e defesas técnicas com clientes elaboradas e defendidas diretamente por <strong>${isAll ? 'Danilo e Vinicius (Equipe de Pré-Vendas)' : spec}</strong> em parceria com a equipe comercial da <strong>Servinformacion Pré-Vendas</strong>.`;
  }

  const listTitleEl = document.getElementById('dossier-list-title');
  if (listTitleEl) {
    listTitleEl.textContent = `Rastreabilidade de Entregas & Propostas de ${isAll ? 'Toda a Equipe' : displayName}`;
  }

  const container = document.getElementById('dossier-list');
  if (!container) return;

  if (oppsList.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="file-question" class="w-12 h-12 mx-auto mb-2 text-slate-300"></i>
        <p class="font-bold text-slate-700 text-sm">Nenhuma proposta vinculada a ${displayName} no momento.</p>
        <p class="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Na planilha do Google Sheets oficial, atribua a coluna <strong>"Pré-Vendas (Autoria)"</strong> com <strong>"${displayName}"</strong> ou cadastre uma nova proposta pelo botão "Nova Proposta".
        </p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = oppsList.map(opp => {
    const oppAuthor = opp.preVenda || 'Danilo';
    const isVinicius = oppAuthor.toLowerCase().includes('vinicius');
    const authorBadgeClass = isVinicius ? 'text-purple-600' : 'text-emerald-600';
    const authorIcon = isVinicius ? 'user-check' : 'shield-check';

    return `
      <div class="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 last:border-b-0">
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span class="font-extrabold text-slate-900 text-base">${opp.cliente}</span>
            ${opp.licencas > 0 ? `<span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">${opp.licencas} contas</span>` : ''}
            <span class="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-50 text-seidor-primary border border-blue-200">
              ${opp.sku}
            </span>
            <span class="text-xs px-2 py-0.5 rounded-full font-bold ${getStageBadgeClass(opp.estagio)}">
              ${opp.estagio}
            </span>
          </div>
          <p class="text-xs text-slate-600 max-w-2xl leading-relaxed">
            <strong class="text-slate-800">Entregável Técnico:</strong> ${opp.escopo || 'Arquitetura de nuvem Google Workspace & GCP, dimensionamento, segurança e governança.'}
          </p>
          <div class="flex items-center space-x-4 text-xs text-slate-400">
            <span>Comercial Parceiro: <strong>${opp.comercial}</strong></span>
            <span>•</span>
            <span class="${authorBadgeClass} font-bold flex items-center space-x-1">
              <i data-lucide="${authorIcon}" class="w-3.5 h-3.5"></i>
              <span>Autor Técnico: ${oppAuthor} (Pré-Vendas)</span>
            </span>
          </div>
        </div>

        <div class="text-right shrink-0 flex flex-col items-end space-y-2">
          <div>
            <div class="text-lg font-black text-seidor-dark">${formatBRL(opp.valorLicencas)}</div>
            <div class="text-xs font-bold text-emerald-600">+ ${formatBRL(opp.valorServicos)} em Serviços</div>
          </div>
          <div class="flex items-center space-x-2">
            ${opp.docUrl ? `
              <a href="${opp.docUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl ${opp.docTipo === 'Google Slides' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-blue-50 text-seidor-primary border-blue-200 hover:bg-blue-100'} font-bold text-xs border transition shadow-sm">
                <i data-lucide="${opp.docTipo === 'Google Slides' ? 'presentation' : 'file-text'}" class="w-3.5 h-3.5"></i>
                <span>${opp.docTipo === 'Google Slides' ? 'Slides' : 'SOW / Doc'}</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            ` : ''}
            ${(opp.hubspotUrl || (opp.hubspot && opp.hubspot.startsWith('http'))) ? `
              <a href="${opp.hubspotUrl || opp.hubspot}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 font-bold text-xs border transition shadow-sm" title="Abrir Deal no HubSpot">
                <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>HubSpot Deal</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// ==========================================
// CHART.JS INTEGRATION
// ==========================================
function renderCharts() {
  renderStageChart();
  renderSkuChart();
}

function renderStageChart() {
  const ctx = document.getElementById('chart-stages');
  if (!ctx) return;

  const oppsList = getSpecialistOpps();

  // Aggregate by stage
  const stagesMap = {};
  oppsList.forEach(opp => {
    const stage = opp.estagio || 'Outro';
    stagesMap[stage] = (stagesMap[stage] || 0) + (Number(opp.valorLicencas) || 0);
  });

  const labels = Object.keys(stagesMap);
  const data = Object.values(stagesMap);

  if (state.charts.stages) {
    state.charts.stages.destroy();
  }

  state.charts.stages = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Pipeline (R$)',
        data: data,
        backgroundColor: ['#07153a', '#263c7a', '#66b6ff', '#0ea5e9', '#10b981'],
        borderRadius: 8,
        barThickness: 32
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          ticks: {
            callback: value => 'R$ ' + (value / 1000).toFixed(0) + 'k'
          },
          grid: { color: '#f1f5f9' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function renderSkuChart() {
  const ctx = document.getElementById('chart-skus');
  if (!ctx) return;

  const oppsList = getSpecialistOpps();
  const skuMap = {};
  oppsList.forEach(opp => {
    const sku = opp.sku || 'Outro';
    skuMap[sku] = (skuMap[sku] || 0) + (Number(opp.licencas) || 0);
  });

  const labels = Object.keys(skuMap);
  const data = Object.values(skuMap);

  if (state.charts.skus) {
    state.charts.skus.destroy();
  }

  state.charts.skus = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#263c7a', '#66b6ff', '#07153a', '#3b82f6', '#10b981'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 10 } }
        }
      },
      cutout: '65%'
    }
  });
}

// ==========================================
// DETAILS MODAL
// ==========================================
function viewOppDetail(oppId) {
  const opp = state.opps.find(o => o.id === oppId);
  if (!opp) return;

  document.getElementById('detail-type-badge').textContent = 'Oportunidade & Proposta';
  document.getElementById('detail-type-badge').className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-seidor-primary';
  document.getElementById('detail-title').textContent = opp.cliente;

  document.getElementById('detail-body').innerHTML = `
    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 uppercase font-bold">Status do Negócio:</span>
        <span class="text-xs px-2.5 py-1 rounded-full font-bold ${getStageBadgeClass(opp.estagio)}">${opp.estagio}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 uppercase font-bold">Comercial Parceiro:</span>
        <span class="text-sm font-semibold text-slate-800">${opp.comercial}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 uppercase font-bold">Autor / Pré-Venda:</span>
        <div class="flex items-center space-x-2">
          <span class="text-sm font-bold ${opp.preVenda && opp.preVenda.toLowerCase().includes('vinicius') ? 'text-purple-600' : 'text-emerald-600'} flex items-center space-x-1">
            <i data-lucide="${opp.preVenda && opp.preVenda.toLowerCase().includes('vinicius') ? 'user-check' : 'shield-check'}" class="w-4 h-4"></i>
            <span>${opp.preVenda || 'Danilo'} (Arquiteto GWS)</span>
          </span>
          <button onclick="changeOppSpecialist('${opp.id}')" class="text-xs text-slate-400 hover:text-seidor-primary underline">Alterar</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 text-xs">
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <span class="text-slate-400">SKU Workspace:</span>
        <div class="font-bold text-slate-900 text-sm mt-0.5">${opp.sku}</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <span class="text-slate-400">Qtd. de Licenças:</span>
        <div class="font-bold text-slate-900 text-sm mt-0.5">${formatNum(opp.licencas)} contas</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Valor Anual Licenças:</span>
          <button onclick="editOppValues('${opp.id}')" class="text-[11px] text-seidor-primary hover:underline font-bold">Editar</button>
        </div>
        <div class="font-bold text-seidor-primary text-sm mt-0.5">${formatBRL(opp.valorLicencas)}</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Valor Serviços Implantação:</span>
          <button onclick="editOppValues('${opp.id}')" class="text-[11px] text-emerald-600 hover:underline font-bold">Editar</button>
        </div>
        <div class="font-bold text-emerald-600 text-sm mt-0.5">${formatBRL(opp.valorServicos)}</div>
      </div>
    </div>

    ${opp.docUrl ? `
      <div class="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-2.5 rounded-xl ${opp.docTipo === 'Google Slides' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-seidor-primary'}">
              <i data-lucide="${opp.docTipo === 'Google Slides' ? 'presentation' : 'file-text'}" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-xs font-bold text-seidor-primary">${opp.docTipo || 'Documento Técnico Oficial'}</div>
              <div class="text-xs font-semibold text-slate-800 line-clamp-1">${opp.docTitulo || opp.escopo}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="copyLinkToClipboard('${opp.docUrl}')" class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm flex items-center space-x-1.5 transition">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Copiar</span>
            </button>
            <a href="${opp.docUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-seidor-primary hover:bg-seidor-dark text-white font-bold text-xs flex items-center space-x-1.5 transition shadow">
              <span>Abrir Proposta</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
        <div class="bg-white/90 p-2 rounded-lg border border-blue-100 text-[11px] font-mono text-slate-600 truncate select-all" title="${opp.docUrl}">
          ${opp.docUrl}
        </div>
      </div>
    ` : ''}

    ${(opp.hubspotUrl || (opp.hubspot && opp.hubspot.startsWith('http'))) ? `
      <div class="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-2.5 rounded-xl bg-orange-100 text-orange-600">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.8 7.3c-.9 0-1.7.5-2.1 1.2L12.9 6c.1-.3.1-.6.1-.9 0-1.9-1.5-3.4-3.4-3.4s-3.4 1.5-3.4 3.4c0 .8.3 1.5.7 2.1l-2.7 2.7c-.5-.3-1.1-.5-1.7-.5-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4c1.6 0 2.9-1.1 3.3-2.6l4.6 2.7c-.1.4-.1.8-.1 1.2 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4c-.7 0-1.4.2-2 .5L9.6 11c.1-.4.2-.8.2-1.2 0-.2 0-.5-.1-.7l3.8-2.5c.6.9 1.6 1.5 2.7 1.5 1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4z"/></svg>
            </div>
            <div>
              <div class="text-xs font-bold text-orange-700">Oportunidade no HubSpot (CRM)</div>
              <div class="text-xs font-semibold text-slate-800 line-clamp-1">Deal Servinformacion • ${opp.cliente}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="copyLinkToClipboard('${opp.hubspotUrl || opp.hubspot}')" class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-orange-200 shadow-sm flex items-center space-x-1.5 transition">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span>Copiar</span>
            </button>
            <a href="${opp.hubspotUrl || opp.hubspot}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center space-x-1.5 transition shadow">
              <span>Abrir no HubSpot</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
        <div class="bg-white/90 p-2 rounded-lg border border-orange-100 text-[11px] font-mono text-slate-600 truncate select-all" title="${opp.hubspotUrl || opp.hubspot}">
          ${opp.hubspotUrl || opp.hubspot}
        </div>
      </div>
    ` : ''}

    <!-- Link Manager Form -->
    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <span class="text-xs font-bold uppercase text-slate-700 flex items-center space-x-1.5">
          <i data-lucide="link-2" class="w-3.5 h-3.5 text-seidor-primary"></i>
          <span>Gerenciar Links da Oportunidade</span>
        </span>
      </div>

      <!-- SOW / Document Link Input -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-bold text-slate-600 uppercase">1. Link da Proposta / SOW (Google Docs / Slides):</label>
        <input type="url" id="edit-opp-url" value="${opp.docUrl || ''}" placeholder="https://docs.google.com/document/d/... ou /presentation/d/..." class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-seidor-primary focus:outline-none">
        
        <div class="grid grid-cols-2 gap-2 pt-1">
          <input type="text" id="edit-opp-title" value="${opp.docTitulo || ''}" placeholder="Título do documento..." class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-seidor-primary focus:outline-none">
          <select id="edit-opp-tipo" class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-seidor-primary focus:outline-none">
            <option value="Google Docs" ${opp.docTipo === 'Google Docs' ? 'selected' : ''}>Google Docs (SOW / Texto)</option>
            <option value="Google Slides" ${opp.docTipo === 'Google Slides' ? 'selected' : ''}>Google Slides (Apresentação)</option>
            <option value="PDF" ${opp.docTipo === 'PDF' ? 'selected' : ''}>PDF / Outro Link</option>
          </select>
        </div>
      </div>

      <!-- HubSpot Link Input -->
      <div class="space-y-1.5 pt-2 border-t border-slate-200">
        <div class="flex items-center justify-between">
          <label class="block text-[11px] font-bold text-orange-700 uppercase flex items-center space-x-1">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>2. Link da Oportunidade no HubSpot (CRM):</span>
          </label>
          <button type="button" onclick="openHubSpotSearch('${opp.id}', '${(opp.cliente || '').replace(/'/g, "\\'")}')" class="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-lg text-[11px] font-bold flex items-center space-x-1 transition shadow-sm" title="Pesquisar Deal no HubSpot">
            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.8 7.3c-.9 0-1.7.5-2.1 1.2L12.9 6c.1-.3.1-.6.1-.9 0-1.9-1.5-3.4-3.4s-3.4 1.5-3.4 3.4c0 .8.3 1.5.7 2.1l-2.7 2.7c-.5-.3-1.1-.5-1.7-.5-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4c1.6 0 2.9-1.1 3.3-2.6l4.6 2.7c-.1.4-.1.8-.1 1.2 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4c-.7 0-1.4.2-2 .5L9.6 11c.1-.4.2-.8.2-1.2 0-.2 0-.5-.1-.7l3.8-2.5c.6.9 1.6 1.5 2.7 1.5 1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4z"/></svg>
            <span>Buscar Deal no HubSpot</span>
          </button>
        </div>
        <input type="url" id="edit-opp-hubspot" value="${opp.hubspotUrl || (opp.hubspot && opp.hubspot.startsWith('http') ? opp.hubspot : '')}" placeholder="https://app.hubspot.com/contacts/.../deal/..." class="w-full px-3 py-2 rounded-xl border border-orange-200 bg-orange-50/30 text-xs font-mono focus:border-orange-500 focus:outline-none">
      </div>

      <button onclick="saveOppLinkFromModal('${opp.id}')" class="w-full py-2.5 bg-seidor-primary hover:bg-seidor-dark text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5">
        <i data-lucide="check" class="w-4 h-4"></i>
        <span>Salvar Links da Oportunidade</span>
      </button>
    </div>

    <div>
      <h5 class="text-xs font-bold uppercase text-slate-500 mb-1">Escopo Técnico e Arquitetura:</h5>
      <p class="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
        ${opp.escopo || 'Arquitetura de nuvem Google Workspace & GCP, dimensionamento, segurança e governança.'}
      </p>
    </div>
  `;

  document.getElementById('modal-details').classList.remove('hidden');
  lucide.createIcons();
}

// Copy Link Helper
function copyLinkToClipboard(url) {
  if (!url) return;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copiado para a área de transferência com sucesso!\n\n' + url);
  }).catch(() => {
    prompt('Copie o link abaixo:', url);
  });
}

// Save Proposal Link and HubSpot Link from Details Modal
function saveOppLinkFromModal(oppId) {
  const opp = state.opps.find(o => o.id === oppId);
  if (!opp) return;

  const urlInput = document.getElementById('edit-opp-url');
  const titleInput = document.getElementById('edit-opp-title');
  const typeInput = document.getElementById('edit-opp-tipo');
  const hsInput = document.getElementById('edit-opp-hubspot');

  if (urlInput) {
    opp.docUrl = urlInput.value.trim();
  }
  if (titleInput && titleInput.value.trim()) {
    opp.docTitulo = titleInput.value.trim();
  }
  if (typeInput) {
    opp.docTipo = typeInput.value;
  } else if (opp.docUrl) {
    opp.docTipo = opp.docUrl.includes('presentation') || opp.docUrl.includes('slide') ? 'Google Slides' : 'Google Docs';
  }

  if (hsInput) {
    const hsVal = hsInput.value.trim();
    opp.hubspotUrl = hsVal;
    opp.hubspot = hsVal || opp.hubspot;
  }

  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  renderAll();
  viewOppDetail(oppId);
  alert('Links da oportunidade (Proposta Técnica e HubSpot) salvos com sucesso!');
}

// Quick Add HubSpot URL from Table Row or Cards
function quickAddHubSpot(oppId) {
  const opp = state.opps.find(o => o.id === oppId);
  if (!opp) return;
  openHubSpotSearch(oppId, opp.cliente || '');
}

// Quick Change Specialist for an Opportunity
function changeOppSpecialist(oppId) {
  const opp = state.opps.find(o => o.id === oppId);
  if (!opp) return;

  const current = opp.preVenda || 'Danilo';
  const newSpec = prompt(`Definir o Pré-Venda responsável para "${opp.cliente}":\n(Danilo, Vinicius ou outro especialista)`, current);
  if (newSpec === null) return;

  const cleanSpec = newSpec.trim() || 'Danilo';
  opp.preVenda = cleanSpec;
  opp.autoria = `${cleanSpec} — Arquiteto de Soluções Google | Servinformacion Pré-Vendas`;

  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  renderAll();
  viewOppDetail(oppId);
  alert(`Pré-venda responsável atualizado para "${cleanSpec}"!`);
}

// Quick Edit Financial Values for an Opportunity
function editOppValues(oppId) {
  const opp = state.opps.find(o => o.id === oppId);
  if (!opp) return;

  const currentLic = opp.valorLicencas || 0;
  const currentServ = opp.valorServicos || 0;

  const newLicStr = prompt(`Informe o Valor Anual de Licenças (R$) para "${opp.cliente}":`, currentLic);
  if (newLicStr === null) return;

  const newServStr = prompt(`Informe o Valor de Serviços / SOW (R$) para "${opp.cliente}":`, currentServ);
  if (newServStr === null) return;

  const parseVal = (str) => {
    if (!str) return 0;
    const clean = String(str).replace(/[^\d,\.]/g, '').replace(/\./g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  };

  opp.valorLicencas = parseVal(newLicStr);
  opp.valorServicos = parseVal(newServStr);

  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  renderAll();
  viewOppDetail(oppId);
  alert(`Valores de "${opp.cliente}" atualizados com sucesso!\n• Licenças: ${formatBRL(opp.valorLicencas)}\n• Serviços: ${formatBRL(opp.valorServicos)}`);
}

// New Record Modal
function openNewRecordModal(type) {
  document.getElementById('modal-new-record').classList.remove('hidden');
  const specInput = document.getElementById('new-opp-prevenda');
  if (specInput && state.selectedSpecialist && state.selectedSpecialist !== 'ALL') {
    specInput.value = state.selectedSpecialist;
  }
  lucide.createIcons();
}

function closeNewRecordModal() {
  document.getElementById('modal-new-record').classList.add('hidden');
  const form = document.getElementById('form-new-opp');
  if (form) form.reset();
}

// Save New Opportunity with Document Link and HubSpot Link
function saveNewOpportunity(event) {
  event.preventDefault();

  const cliente = document.getElementById('new-opp-cliente').value.trim();
  const comercial = document.getElementById('new-opp-comercial').value;
  const preVendaInput = document.getElementById('new-opp-prevenda');
  const preVendaVal = (preVendaInput ? preVendaInput.value : state.selectedSpecialist) || 'Danilo';
  const finalPreVenda = preVendaVal === 'ALL' ? 'Danilo' : preVendaVal;

  const sku = document.getElementById('new-opp-sku').value;
  const licencas = parseInt(document.getElementById('new-opp-licencas').value, 10) || 0;
  const status = document.getElementById('new-opp-status').value;
  const docUrl = document.getElementById('new-opp-doc-url').value.trim();
  const docTitulo = document.getElementById('new-opp-doc-title').value.trim() || `Proposta Técnica - ${cliente}`;
  const docTipo = document.getElementById('new-opp-doc-tipo').value;
  const hubspotInput = document.getElementById('new-opp-hubspot-url');
  const hubspotUrl = hubspotInput ? hubspotInput.value.trim() : '';
  const escopo = document.getElementById('new-opp-escopo').value.trim() || `Defesa técnica e proposta elaborada por ${finalPreVenda}.`;

  let valorLicencas = 0;
  let valorServicos = 0;
  if (licencas > 0) {
    valorLicencas = sku.includes('Gemini') ? licencas * 180 * 12 : licencas * 60 * 12;
    valorServicos = licencas >= 1000 ? 45000 : 25000;
  } else {
    valorServicos = 30000;
  }

  const newOpp = {
    id: `SERV-${Date.now().toString().slice(-4)}`,
    cliente: cliente,
    clienteCompleto: cliente,
    demanda: sku,
    comercial: comercial,
    preVenda: finalPreVenda,
    autoria: `${finalPreVenda} — Arquiteto de Soluções Google | Servinformacion Pré-Vendas`,
    sku: sku,
    licencas: licencas,
    valorLicencas: valorLicencas,
    valorServicos: valorServicos,
    estagio: status,
    previsao: new Date().toISOString().split('T')[0],
    escopo: escopo,
    docTitulo: docTitulo,
    docUrl: docUrl,
    docTipo: docTipo,
    hubspotUrl: hubspotUrl,
    hubspot: hubspotUrl || `HS-${Date.now().toString().slice(-4)}`,
    origem: 'Cadastro Manual no Hub'
  };

  state.opps.unshift(newOpp);
  state.filteredOpps.unshift(newOpp);
  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));

  closeNewRecordModal();
  renderAll();
  alert(`Proposta de "${cliente}" cadastrada com sucesso para ${finalPreVenda} com seus links vinculados!`);
}

function viewDeployDetail(depId) {
  const dep = state.deploys.find(d => d.id === depId);
  if (!dep) return;

  document.getElementById('detail-type-badge').textContent = 'Projeto de Implantação';
  document.getElementById('detail-type-badge').className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
  document.getElementById('detail-title').textContent = dep.cliente;

  document.getElementById('detail-body').innerHTML = `
    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 uppercase font-bold">Fase Atual:</span>
        <span class="text-xs px-2.5 py-1 rounded-full font-bold bg-seidor-light/20 text-seidor-primary">${dep.fase}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 uppercase font-bold">Ambiente Origem:</span>
        <span class="text-sm font-semibold text-slate-800">${dep.origem || 'Exchange / On-Prem'}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500 uppercase font-bold">Arquiteto Responsável:</span>
        <span class="text-sm font-bold text-emerald-600">${dep.responsavel || 'Danilo'}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 text-xs">
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <span class="text-slate-400">Data Kickoff:</span>
        <div class="font-bold text-slate-900 text-sm mt-0.5">${formatDate(dep.dataInicio)}</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <span class="text-slate-400">Previsão Go-Live:</span>
        <div class="font-bold text-emerald-600 text-sm mt-0.5">${formatDate(dep.goLive)}</div>
      </div>
    </div>

    <div>
      <h5 class="text-xs font-bold uppercase text-slate-500 mb-1">Status & Atividades em Execução:</h5>
      <p class="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
        ${dep.detalhes || 'Execução técnica de migração e alinhamentos de segurança.'}
      </p>
    </div>
  `;

  document.getElementById('modal-details').classList.remove('hidden');
  lucide.createIcons();
}

function closeDetailsModal() {
  document.getElementById('modal-details').classList.add('hidden');
}

// ==========================================
// CONFIGURATION MODAL & GOOGLE SHEETS MULTI-SPECIALIST SYNC
// ==========================================

// Update count badges inside modal
function updateModalBadges() {
  const daniloCount = (state.opps || []).filter(o => (o.preVenda || '').toLowerCase().includes('danilo')).length;
  const viniciusCount = (state.opps || []).filter(o => (o.preVenda || '').toLowerCase().includes('vinicius')).length;

  const bDanilo = document.getElementById('badge-danilo-count');
  if (bDanilo) bDanilo.textContent = `${daniloCount} proposta${daniloCount === 1 ? '' : 's'}`;

  const bVinicius = document.getElementById('badge-vinicius-count');
  if (bVinicius) bVinicius.textContent = `${viniciusCount} proposta${viniciusCount === 1 ? '' : 's'}`;
}

// Non-destructive merge of opportunities for Danilo or Vinicius
function mergeSpecialistOpps(incomingOpps, targetSpec = null) {
  if (!incomingOpps || !Array.isArray(incomingOpps) || incomingOpps.length === 0) return;

  const currentOpps = state.opps || [];

  // Determine target specialist
  if (!targetSpec || targetSpec === 'ALL' || targetSpec === 'AUTO') {
    const hasDanilo = incomingOpps.some(o => (o.preVenda || '').toLowerCase().includes('danilo'));
    const hasVinicius = incomingOpps.some(o => (o.preVenda || '').toLowerCase().includes('vinicius'));

    if (hasDanilo && hasVinicius) {
      // Both are present in incoming dataset! Full team update
      state.opps = incomingOpps;
      targetSpec = null;
    } else if (hasDanilo) {
      targetSpec = 'Danilo';
    } else if (hasVinicius) {
      targetSpec = 'Vinicius';
    } else if (state.selectedSpecialist && state.selectedSpecialist !== 'ALL') {
      targetSpec = state.selectedSpecialist;
    } else {
      targetSpec = 'Danilo';
    }
  }

  if (targetSpec && targetSpec !== 'ALL' && targetSpec !== 'AUTO') {
    const isTarget = (name) => (name || '').toLowerCase().includes(targetSpec.toLowerCase());
    
    // 1. Keep other specialists completely intact!
    const preservedOthers = currentOpps.filter(o => !isTarget(o.preVenda));

    // 2. Format incoming opps with proper specialist tags, prefixes and titles
    const isDan = targetSpec.toLowerCase().includes('danilo');
    const authorTitle = isDan 
      ? 'Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion'
      : 'Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion';
    const prefix = isDan ? 'DAN' : 'VIN';

    const formattedIncoming = incomingOpps.map((opp, idx) => ({
      ...opp,
      id: opp.id && (opp.id.startsWith('DAN-') || opp.id.startsWith('VIN-')) ? opp.id : `${prefix}-${101 + idx}`,
      preVenda: isDan ? 'Danilo' : 'Vinicius',
      autoria: authorTitle
    }));

    // 3. Combine non-destructively
    state.opps = [...preservedOthers, ...formattedIncoming];
  }

  state.filteredOpps = [...state.opps];
  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));

  // Persist to server backend non-destructively
  try {
    fetch('/api/sheets/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opps: state.opps, specialist: targetSpec })
    });
  } catch (e) {
    console.warn('Falha ao salvar no backend:', e);
  }

  updateModalBadges();
  filterOpps();
  renderAll();
}

function openConfigModal() {
  const danInput = document.getElementById('cfg-sheet-url-danilo');
  if (danInput) danInput.value = state.daniloSheetId || '';

  const danName = document.getElementById('cfg-sheet-opps-danilo');
  if (danName) danName.value = state.daniloSheetName || 'Página1';

  const vinInput = document.getElementById('cfg-sheet-url-vinicius');
  if (vinInput) vinInput.value = state.viniciusSheetId || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';

  const vinName = document.getElementById('cfg-sheet-opps-vinicius');
  if (vinName) vinName.value = state.viniciusSheetName || 'Página1';

  updateModalBadges();

  const feedback = document.getElementById('cfg-sync-feedback');
  if (feedback) feedback.classList.add('hidden');
  document.getElementById('modal-config').classList.remove('hidden');
  lucide.createIcons();
}

function closeConfigModal() {
  document.getElementById('modal-config').classList.add('hidden');
}

// Extract Google Sheet ID from any URL or raw string
function extractSheetId(input) {
  if (!input) return '';
  const match = input.match(/\/d\/([a-zA-Z0-9-_]{15,})/);
  if (match && match[1]) return match[1];
  return input.trim();
}

// Save both sheet URLs into state and localStorage
function saveSpecialistSheetUrls() {
  const danUrlInput = document.getElementById('cfg-sheet-url-danilo');
  const vinUrlInput = document.getElementById('cfg-sheet-url-vinicius');
  const danNameInput = document.getElementById('cfg-sheet-opps-danilo');
  const vinNameInput = document.getElementById('cfg-sheet-opps-vinicius');

  if (danUrlInput) {
    const rawDan = danUrlInput.value.trim();
    state.daniloSheetId = rawDan ? extractSheetId(rawDan) : '';
    localStorage.setItem('serv_danilo_sheet', state.daniloSheetId);
  }
  if (danNameInput) {
    state.daniloSheetName = danNameInput.value.trim() || 'Página1';
    localStorage.setItem('serv_danilo_sheet_name', state.daniloSheetName);
  }

  if (vinUrlInput) {
    const rawVin = vinUrlInput.value.trim();
    state.viniciusSheetId = rawVin ? extractSheetId(rawVin) : '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';
    localStorage.setItem('serv_vinicius_sheet', state.viniciusSheetId);
  }
  if (vinNameInput) {
    state.viniciusSheetName = vinNameInput.value.trim() || 'Página1';
    localStorage.setItem('serv_vinicius_sheet_name', state.viniciusSheetName);
  }

  closeConfigModal();
  alert('Links e abas das planilhas salvos com sucesso!');
}

// Synchronize a specific specialist's sheet without touching the other
async function syncSpecialistSheets(specialist) {
  const feedback = document.getElementById('cfg-sync-feedback');
  const statusText = document.getElementById('sync-status-text');
  const syncIcon = document.getElementById('sync-icon');

  let urlInput, sheetNameInput;
  if (specialist === 'Danilo') {
    urlInput = document.getElementById('cfg-sheet-url-danilo');
    sheetNameInput = document.getElementById('cfg-sheet-opps-danilo');
  } else {
    urlInput = document.getElementById('cfg-sheet-url-vinicius');
    sheetNameInput = document.getElementById('cfg-sheet-opps-vinicius');
  }

  const rawUrl = urlInput ? urlInput.value.trim() : (specialist === 'Danilo' ? state.daniloSheetId : state.viniciusSheetId);
  const sheetName = sheetNameInput ? sheetNameInput.value.trim() : 'Página1';

  if (!rawUrl) {
    alert(`Por favor, insira o link ou ID da planilha do ${specialist}.`);
    return;
  }

  const sheetId = extractSheetId(rawUrl);
  if (specialist === 'Danilo') {
    state.daniloSheetId = sheetId;
    state.daniloSheetName = sheetName;
    localStorage.setItem('serv_danilo_sheet', sheetId);
    localStorage.setItem('serv_danilo_sheet_name', sheetName);
  } else {
    state.viniciusSheetId = sheetId;
    state.viniciusSheetName = sheetName;
    localStorage.setItem('serv_vinicius_sheet', sheetId);
    localStorage.setItem('serv_vinicius_sheet_name', sheetName);
  }

  if (syncIcon) syncIcon.classList.add('animate-spin');
  if (statusText) statusText.textContent = `Sincronizando planilha de ${specialist}...`;

  if (feedback) {
    feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 block';
    feedback.textContent = `Sincronizando planilha de ${specialist} (${sheetId})...`;
  }

  try {
    let loadedData = null;
    let countLoaded = 0;

    // 1. Try local or cloud backend endpoint
    try {
      const syncUrl = `/api/sheets/sync?sheet_id=${encodeURIComponent(sheetId)}&sheet_name=${encodeURIComponent(sheetName)}&specialist=${encodeURIComponent(specialist)}`;
      const res = await fetch(syncUrl);
      if (res.ok) {
        const text = await res.text();
        if (text && !text.includes('<!DOCTYPE')) {
          const json = JSON.parse(text);
          if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
            loadedData = json.data;
            countLoaded = json.count || loadedData.length;
          }
        }
      }
    } catch (_beErr) {
      // Backend not running, proceed to direct Google Sheets client-side fetch
    }

    // 2. Direct browser fetch fallback (works 100% on GitHub Pages without any backend!)
    if (!loadedData) {
      if (statusText) statusText.textContent = `Carregando dados direto do Google Sheets (${specialist})...`;
      const directCsvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
      const csvRes = await fetch(directCsvUrl);
      if (!csvRes.ok) {
        throw new Error(`Não foi possível baixar a planilha do Google Sheets (${csvRes.status}). Certifique-se de que a planilha está com compartilhamento público ("Qualquer pessoa com o link pode ler").`);
      }
      const csvText = await csvRes.text();
      loadedData = parseOppsCsvToObjects(csvText, specialist);
      countLoaded = loadedData.length;
    }

    if (!loadedData || loadedData.length === 0) {
      throw new Error('Nenhuma linha de proposta válida encontrada na planilha.');
    }

    // Merge non-destructively
    mergeSpecialistOpps(loadedData, specialist);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (statusText) statusText.textContent = `Google Sheets ${specialist} Conectado (${countLoaded} propostas)`;
    const lastUpdate = document.getElementById('sync-last-update');
    if (lastUpdate) lastUpdate.textContent = `Última atualização: Hoje às ${timeStr}`;

    if (feedback) {
      feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      feedback.textContent = `✓ Sucesso! ${countLoaded} propostas do ${specialist} sincronizadas. Total da equipe: ${state.opps.length} propostas.`;
    }

    updateModalBadges();
    alert(`Planilha do ${specialist} sincronizada com sucesso!\n\n${countLoaded} propostas carregadas.\nTotal consolidado na equipe: ${state.opps.length} propostas.\nOs dados do outro arquiteto continuam 100% preservados!`);
  } catch (err) {
    console.error(`Erro ao sincronizar ${specialist}:`, err);
    if (feedback) {
      feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 block';
      feedback.textContent = `Erro ao sincronizar ${specialist}: ${err.message}`;
    }
    if (statusText) statusText.textContent = `Erro ao sincronizar ${specialist}`;
    alert(`Erro ao sincronizar planilha do ${specialist}:\n${err.message}\n\nDica: Certifique-se de que a planilha está com acesso público ("Qualquer pessoa com o link pode ler") ou utilize o botão "Carregar Arquivo (.xlsx/.csv)".`);
  } finally {
    if (syncIcon) syncIcon.classList.remove('animate-spin');
  }
}

// Synchronize both specialists' sheets in parallel and consolidate
async function syncAllSpecialistsSheets() {
  const feedback = document.getElementById('cfg-sync-feedback');
  const statusText = document.getElementById('sync-status-text');
  const syncIcon = document.getElementById('sync-icon');

  if (syncIcon) syncIcon.classList.add('animate-spin');
  if (statusText) statusText.textContent = 'Sincronizando planilhas de Danilo e Vinicius...';

  if (feedback) {
    feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 block';
    feedback.textContent = 'Iniciando sincronização unificada da equipe (Danilo + Vinicius)...';
  }

  let vinCount = 0;
  let danCount = 0;
  let errors = [];

  // 1. Sync Vinicius (GCP)
  const vinUrlInput = document.getElementById('cfg-sheet-url-vinicius');
  const vinRawUrl = vinUrlInput ? vinUrlInput.value.trim() : state.viniciusSheetId;
  const vinSheetId = extractSheetId(vinRawUrl) || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';
  const vinSheetName = (document.getElementById('cfg-sheet-opps-vinicius')?.value || state.viniciusSheetName || 'Página1').trim();

  try {
    const resVin = await fetch(`/api/sheets/sync?sheet_id=${encodeURIComponent(vinSheetId)}&sheet_name=${encodeURIComponent(vinSheetName)}&specialist=Vinicius`);
    if (resVin.ok) {
      const jVin = await resVin.json();
      if (jVin.ok && jVin.data) {
        mergeSpecialistOpps(jVin.data, 'Vinicius');
        vinCount = jVin.count;
      } else if (jVin.error) {
        errors.push(`Vinicius: ${jVin.error}`);
      }
    }
  } catch (eVin) {
    errors.push(`Vinicius: ${eVin.message}`);
  }

  // 2. Sync Danilo (GWS) if URL provided
  const danUrlInput = document.getElementById('cfg-sheet-url-danilo');
  const danRawUrl = danUrlInput ? danUrlInput.value.trim() : state.daniloSheetId;
  if (danRawUrl) {
    const danSheetId = extractSheetId(danRawUrl);
    const danSheetName = (document.getElementById('cfg-sheet-opps-danilo')?.value || state.daniloSheetName || 'Página1').trim();
    try {
      const resDan = await fetch(`/api/sheets/sync?sheet_id=${encodeURIComponent(danSheetId)}&sheet_name=${encodeURIComponent(danSheetName)}&specialist=Danilo`);
      if (resDan.ok) {
        const jDan = await resDan.json();
        if (jDan.ok && jDan.data) {
          mergeSpecialistOpps(jDan.data, 'Danilo');
          danCount = jDan.count;
        } else if (jDan.error) {
          errors.push(`Danilo: ${jDan.error}`);
        }
      }
    } catch (eDan) {
      errors.push(`Danilo: ${eDan.message}`);
    }
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  if (statusText) statusText.textContent = `Equipe Sincronizada (${state.opps.length} propostas)`;
  const lastUpdate = document.getElementById('sync-last-update');
  if (lastUpdate) lastUpdate.textContent = `Última atualização: Hoje às ${timeStr}`;

  updateModalBadges();
  renderAll();

  if (syncIcon) syncIcon.classList.remove('animate-spin');

  if (errors.length > 0) {
    if (feedback) {
      feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 block';
      feedback.textContent = `Atenção: ${errors.join(' | ')}. Total atual: ${state.opps.length} propostas.`;
    }
    alert(`Sincronização concluída com avisos:\n${errors.join('\n')}\n\nTotal consolidado na equipe: ${state.opps.length} propostas.`);
  } else {
    if (feedback) {
      feedback.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      feedback.textContent = `✓ Sucesso! Vinicius: ${vinCount} propostas | Danilo: ${danCount || '(atuais preservadas)'}. Total equipe: ${state.opps.length} propostas.`;
    }
    alert(`Sincronização da Equipe Concluída!\n\n👨‍💻 Vinicius (Arquiteto GCP): ${vinCount} propostas\n👨‍💻 Danilo (Arquiteto GWS): ${danCount ? danCount + ' propostas' : 'propostas atuais mantidas'}\n\n👥 Total Consolidado no Hub: ${state.opps.length} propostas.`);
  }
}

// Master sync function called from header button or general actions
async function syncGoogleSheets(forceSync = false, targetSpecialist = null) {
  const spec = targetSpecialist || state.selectedSpecialist;
  if (spec === 'Danilo') {
    return await syncSpecialistSheets('Danilo');
  } else if (spec === 'Vinicius') {
    return await syncSpecialistSheets('Vinicius');
  } else {
    return await syncAllSpecialistsSheets();
  }
}

// Universal trigger for file import with specialist awareness
function triggerFileImport(targetSpecialist = null) {
  if (targetSpecialist) {
    state.importTargetSpecialist = targetSpecialist;
    const input = document.getElementById('input-import-file');
    if (input) {
      input.value = '';
      input.click();
    }
    return;
  }

  // If already filtering a single specialist, direct upload to that specialist
  if (state.selectedSpecialist === 'Danilo' || state.selectedSpecialist === 'Vinicius') {
    state.importTargetSpecialist = state.selectedSpecialist;
    const input = document.getElementById('input-import-file');
    if (input) {
      input.value = '';
      input.click();
    }
    return;
  }

  // Otherwise, show selection modal
  const modalChoice = document.getElementById('modal-choose-specialist');
  if (modalChoice) {
    modalChoice.classList.remove('hidden');
    lucide.createIcons();
  } else {
    state.importTargetSpecialist = 'Danilo';
    const input = document.getElementById('input-import-file');
    if (input) {
      input.value = '';
      input.click();
    }
  }
}

function closeSpecialistChoiceModal() {
  const modalChoice = document.getElementById('modal-choose-specialist');
  if (modalChoice) modalChoice.classList.add('hidden');
}

function confirmSpecialistImport(chosenSpec) {
  closeSpecialistChoiceModal();
  state.importTargetSpecialist = chosenSpec;
  const input = document.getElementById('input-import-file');
  if (input) {
    input.value = '';
    input.click();
  }
}

// Handle file input selection event
function handleFileInputChange(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const target = state.importTargetSpecialist;
  importSpreadsheetFile(file, target);
}

// Universal parser for uploaded Excel / CSV files with SheetJS and non-destructive merge
async function importSpreadsheetFile(file, targetSpecialist = null) {
  const statusText = document.getElementById('sync-status-text');
  const syncIcon = document.getElementById('sync-icon');

  if (syncIcon) syncIcon.classList.add('animate-spin');
  if (statusText) statusText.textContent = `Lendo arquivo "${file.name}"...`;

  try {
    const data = await file.arrayBuffer();
    // Read with SheetJS
    const workbook = XLSX.read(data, { type: 'array', cellFormula: true, cellStyles: true });
    
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error('Nenhuma aba encontrada na planilha.');
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Decode range
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:Z200');
    const rows = [];
    
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const row = {};
      let hasData = false;
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = worksheet[cellAddress];
        const colLetter = XLSX.utils.encode_col(C);
        
        let val = '';
        let url = '';
        if (cell) {
          val = cell.w || cell.v || '';
          if (cell.l && cell.l.Target) {
            url = cell.l.Target;
          }
          if (String(val).trim()) hasData = true;
        }
        row[colLetter] = { text: String(val).trim(), url: url.trim() };
      }
      if (hasData) rows.push(row);
    }

    if (rows.length < 2) {
      throw new Error('O arquivo selecionado está vazio ou não possui linhas de dados suficientes.');
    }

    // Match headers
    const headerRow = rows[0];
    const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    
    let colCliente = null, colDemanda = null, colDoc = null, colComercial = null, colPreVenda = null, colHubspot = null, colSku = null, colLic = null, colValLic = null, colValServ = null;

    for (const [colLetter, cellObj] of Object.entries(headerRow)) {
      const t = norm(cellObj.text);
      if (/cliente|empresa|conta|oportunidade/.test(t) && !colCliente) colCliente = colLetter;
      else if (/demanda|escopo|servico|descricao|tipo/.test(t) && !colDemanda) colDemanda = colLetter;
      else if (/link|proposta|sow|documento|deck|arquivo|url/.test(t) && !colDoc) colDoc = colLetter;
      else if (/comercial|am|vendedor|responsavel/.test(t) && !colComercial) colComercial = colLetter;
      else if (/prevenda|autoria|arquiteto|especialista/.test(t) && !colPreVenda) colPreVenda = colLetter;
      else if (/hubspot|crm|deal/.test(t) && !colHubspot) colHubspot = colLetter;
      else if (/sku|produto|solucao/.test(t) && !colSku) colSku = colLetter;
      else if (/licenca|contas|seats|usuarios/.test(t) && !colLic) colLic = colLetter;
      else if (/valorlicenca|licencasbrl|valoranual|anual|mrr|arr/.test(t) && !colValLic) colValLic = colLetter;
      else if (/valorservico|servicos|sow|implantacao/.test(t) && !colValServ) colValServ = colLetter;
    }

    // Fallbacks if not recognized by names
    if (!colCliente) colCliente = 'B';
    if (!colDemanda) colDemanda = 'C';
    if (!colDoc) colDoc = 'D';
    if (!colComercial) colComercial = 'E';
    if (!colPreVenda) colPreVenda = 'F';

    const parseMoney = (v) => {
      if (!v) return null;
      const clean = String(v).replace(/[^\d,\.]/g, '').replace(/\./g, '').replace(',', '.');
      const num = parseFloat(clean);
      return isNaN(num) ? null : num;
    };

    const newOpps = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      const clienteRaw = r[colCliente]?.text || '';
      const demandaRaw = r[colDemanda]?.text || '';
      const docObj = r[colDoc] || {};
      const docTitle = docObj.text || '';
      let docUrl = docObj.url || (docTitle.startsWith('http') ? docTitle : '');
      const comercial = r[colComercial]?.text || 'AM Responsável';
      const preVendaText = r[colPreVenda]?.text || '';
      const preVendaUrl = r[colPreVenda]?.url || '';

      if (!clienteRaw && !demandaRaw && !docTitle) continue;

      let cleanCliente = clienteRaw.replace(/\s+\d+\s*(?:contas|licen[cç]as|seats|usu[aá]rios)?/gi, '').trim() || clienteRaw;
      
      let seats = 0;
      const numMatch = clienteRaw.match(/\b(\d{2,5})\b/);
      if (numMatch) seats = parseInt(numMatch[1], 10);

      // Pre-Venda determination
      let preVenda = 'Danilo';
      if (targetSpecialist && targetSpecialist !== 'ALL' && targetSpecialist !== 'AUTO') {
        preVenda = targetSpecialist;
      } else if (/danilo/i.test(preVendaText)) {
        preVenda = 'Danilo';
      } else if (/vinicius/i.test(preVendaText)) {
        preVenda = 'Vinicius';
      } else if (preVendaText && !preVendaText.startsWith('http')) {
        preVenda = preVendaText;
      } else if (state.selectedSpecialist && state.selectedSpecialist !== 'ALL') {
        preVenda = state.selectedSpecialist;
      } else {
        preVenda = 'Danilo';
      }

      // HubSpot link
      let hubspotUrl = '';
      if (colHubspot && r[colHubspot]) {
        hubspotUrl = r[colHubspot].url || (r[colHubspot].text.startsWith('http') ? r[colHubspot].text : '');
      }
      if (!hubspotUrl) {
        for (const candidate of [preVendaUrl, preVendaText]) {
          if (/hubspot|crm|deal|app\./i.test(candidate) && candidate.startsWith('http')) {
            hubspotUrl = candidate;
            break;
          }
        }
      }

      // Preserve existing manual edits if matched
      const existing = state.opps.find(o => o.cliente.toLowerCase() === cleanCliente.toLowerCase());
      if (existing) {
        if (!docUrl && existing.docUrl) docUrl = existing.docUrl;
        if (!hubspotUrl && existing.hubspotUrl) hubspotUrl = existing.hubspotUrl;
      }

      // SKU
      let sku = 'Google Workspace';
      const textAll = `${cleanCliente} ${demandaRaw} ${docTitle}`.toLowerCase();
      if (textAll.includes('gemini')) sku = 'Gemini Enterprise';
      else if (textAll.includes('earth')) sku = 'Google Earth Platform';
      else if (textAll.includes('supabase') || textAll.includes('migra')) sku = 'GCP Cloud Migration';
      else if (textAll.includes('billing')) sku = 'GCP Transfer Billing';
      else if (textAll.includes('foundation') || textAll.includes('consultoria')) sku = 'GCP Foundation & Consultoria';
      else if (textAll.includes('bolsa')) sku = 'Bolsa de Horas GCP';
      else if (textAll.includes('provisionamento')) sku = 'GCP Provisionamento Infra';

      let docTipo = 'Google Docs';
      if (docUrl.includes('presentation') || docUrl.includes('slide') || textAll.includes('apresentacao')) {
        docTipo = 'Google Slides';
      }

      let valLic = colValLic ? parseMoney(r[colValLic]?.text) : null;
      let valServ = colValServ ? parseMoney(r[colValServ]?.text) : null;

      if (valLic === null) {
        if (existing && existing.valorLicencas !== undefined) valLic = existing.valorLicencas;
        else if (seats > 0) valLic = sku.includes('Gemini') ? seats * 180 * 12 : seats * 60 * 12;
        else if (sku.includes('Billing')) valLic = 120000;
        else if (sku.includes('Earth')) valLic = 95000;
        else valLic = 0;
      }

      if (valServ === null) {
        if (existing && existing.valorServicos !== undefined) valServ = existing.valorServicos;
        else if (seats > 0) valServ = seats >= 1000 ? 45000 : 25000;
        else if (sku.includes('Bolsa')) valServ = 36000;
        else if (sku.includes('Migration')) valServ = 48000;
        else if (sku.includes('Provisionamento')) valServ = 22000;
        else valServ = 20000;
      }

      const isDaniloRole = preVenda.toLowerCase().includes('danilo');
      const authorText = isDaniloRole 
        ? 'Danilo — Arquiteto GWS (Google Workspace & Soluções) | Servinformacion'
        : 'Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion';
      const oppPrefix = isDaniloRole ? 'DAN' : 'VIN';

      newOpps.push({
        id: `${oppPrefix}-${100 + i}`,
        cliente: cleanCliente,
        clienteCompleto: clienteRaw,
        demanda: demandaRaw,
        comercial: comercial,
        preVenda: preVenda,
        autoria: authorText,
        sku: sku,
        licencas: seats,
        valorLicencas: valLic,
        valorServicos: valServ,
        estagio: 'Proposta Técnica Entregue',
        previsao: '2026-10-15',
        escopo: demandaRaw && docTitle ? `${demandaRaw} — ${docTitle}` : (demandaRaw || docTitle),
        docTitulo: docTitle || `Proposta Técnica ${cleanCliente}`,
        docUrl: docUrl,
        docTipo: docTipo,
        hubspotUrl: hubspotUrl,
        hubspot: hubspotUrl || `HS-${1000 + i}`,
        origem: `Arquivo "${file.name}"`
      });
    }

    if (newOpps.length === 0) {
      throw new Error('Nenhuma oportunidade válida foi encontrada no arquivo.');
    }

    // Perform NON-DESTRUCTIVE merge
    const finalSpec = targetSpecialist && targetSpecialist !== 'ALL' && targetSpecialist !== 'AUTO' 
      ? targetSpecialist 
      : (state.selectedSpecialist !== 'ALL' ? state.selectedSpecialist : null);

    mergeSpecialistOpps(newOpps, finalSpec);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    if (statusText) statusText.textContent = `Arquivo "${file.name}" importado (${newOpps.length} propostas)`;
    const lastUpdate = document.getElementById('sync-last-update');
    if (lastUpdate) lastUpdate.textContent = `Última atualização: Hoje às ${timeStr}`;

    closeConfigModal();
    renderAll();
    
    alert(`Sucesso!\n\n${newOpps.length} propostas importadas do arquivo "${file.name}" para ${finalSpec || 'a equipe'}.\nTotal consolidado na equipe: ${state.opps.length} propostas.\nOs dados de outros arquitetos foram 100% preservados!`);
  } catch (err) {
    console.error('Erro ao importar arquivo:', err);
    alert(`Erro ao importar arquivo:\n${err.message}`);
    if (statusText) statusText.textContent = 'Erro ao importar arquivo';
  } finally {
    if (syncIcon) syncIcon.classList.remove('animate-spin');
  }
}


// Parse Opps CSV into array of structured opportunity objects
function parseOppsCsvToObjects(csvText, targetSpecialist = null) {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  if (!parsed.data || parsed.data.length === 0) return [];

  const prefix = targetSpecialist === 'Vinicius' ? 'VIN' : 'DAN';

  return parsed.data.map((row, index) => {
    const keys = Object.keys(row);
    
    // Fuzzy matching for columns
    const getVal = (patterns) => {
      for (const p of patterns) {
        const foundKey = keys.find(k => {
          const cleanK = k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
          return cleanK.includes(p);
        });
        if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
          return String(row[foundKey]).trim();
        }
      }
      return '';
    };

    // Extract raw fields
    const rawCliente = getVal(['cliente', 'empresa', 'conta', 'nome', 'oportunidade']) || `Oportunidade ${index + 1}`;
    const rawDemanda = getVal(['demanda', 'tipo', 'servico']) || '';
    const rawDoc = getVal(['linkoportunidade', 'link', 'documento', 'proposta', 'sow', 'deck']) || '';
    const rawComercial = getVal(['comercial', 'amresponsavel', 'am', 'vendedor']) || 'AM Responsável';
    const rawPreVenda = getVal(['prevendas', 'prevenda', 'autoria', 'arquiteto', 'especialista', 'responsaveltecnico']) || (targetSpecialist || 'Danilo');
    const rawData = getVal(['datadaproposta', 'proposta', 'data']) || '2026-10-15';
    const rawStatus = getVal(['status', 'fase', 'estagio']) || 'Proposta Técnica Entregue';
    const rawNotas = getVal(['notas', 'proximopasso', 'passo', 'observacao', 'escopo']) || '';
    const rawHubspot = getVal(['linkhubspot', 'urlhubspot', 'hubspot', 'crm', 'deal']) || '';
    let hubspotUrl = rawHubspot.startsWith('http') ? rawHubspot : '';

    // Clean client name and detect seats
    let licencas = 0;
    const matchSeats = (rawCliente + ' ' + rawDemanda + ' ' + rawNotas).match(/(\d+)\s*(licen[cç]as?|contas?|seats?|usu[aá]rios?)?/i);
    const numMatch = rawCliente.match(/\b(\d{2,5})\b/);
    if (numMatch) {
      licencas = parseInt(numMatch[1], 10);
    } else if (matchSeats && parseInt(matchSeats[1], 10) > 10) {
      licencas = parseInt(matchSeats[1], 10);
    }

    const cleanCliente = rawCliente.replace(/\s+\d+\s*(?:contas|licen[cç]as|seats|usu[aá]rios)?/gi, '').trim() || rawCliente;

    // Detect Solution / SKU
    let sku = targetSpecialist === 'Vinicius' ? 'GCP Foundation & Consultoria' : 'Google Workspace';
    const textAll = `${cleanCliente} ${rawDemanda} ${rawDoc} ${rawNotas}`.toLowerCase();
    if (textAll.includes('gemini')) sku = 'Gemini Enterprise';
    else if (textAll.includes('earth')) sku = 'Google Earth Platform';
    else if (textAll.includes('supabase') || textAll.includes('migra')) sku = 'GCP Cloud Migration';
    else if (textAll.includes('transfer billing')) sku = 'GCP Transfer Billing';
    else if (textAll.includes('transfer token')) sku = 'GWS Transfer Token';
    else if (textAll.includes('foundation') || textAll.includes('consultoria')) sku = 'GCP Foundation & Consultoria';
    else if (textAll.includes('bolsa de horas')) sku = 'Bolsa de Horas GCP';
    else if (textAll.includes('provisionamento')) sku = 'GCP Provisionamento Infra';

    let docUrl = rawDoc.startsWith('http') ? rawDoc : '';
    let docTipo = 'Google Docs';
    if (docUrl.includes('presentation') || docUrl.includes('slide') || textAll.includes('apresentacao')) {
      docTipo = 'Google Slides';
    }

    const existing = (state.opps || []).find(o => o.cliente.toLowerCase() === cleanCliente.toLowerCase() || (o.docTitulo && o.docTitulo.toLowerCase().includes(rawDoc.toLowerCase())));
    if (existing) {
      if (existing.docUrl && !docUrl) {
        docUrl = existing.docUrl;
        docTipo = existing.docTipo || docTipo;
      }
      if (existing.hubspotUrl && !hubspotUrl) {
        hubspotUrl = existing.hubspotUrl;
      }
    }

    const rawValLic = getVal(['valorlicenca', 'licencasbrl', 'valoranual', 'anual', 'mrr', 'arr', 'licenca', 'total']);
    const rawValServ = getVal(['valorservico', 'servicos', 'sow', 'implantacao', 'consultoria']);

    const parseMoney = (v) => {
      if (!v) return null;
      const clean = String(v).replace(/[^\d,\.]/g, '').replace(/\./g, '').replace(',', '.');
      const num = parseFloat(clean);
      return isNaN(num) ? null : num;
    };

    let valorLicencas = parseMoney(rawValLic);
    let valorServicos = parseMoney(rawValServ);

    if (valorLicencas === null && existing && existing.valorLicencas !== undefined) {
      valorLicencas = existing.valorLicencas;
    }
    if (valorServicos === null && existing && existing.valorServicos !== undefined) {
      valorServicos = existing.valorServicos;
    }

    if (valorLicencas === null) {
      if (licencas > 0) {
        valorLicencas = sku.includes('Gemini') ? licencas * 180 * 12 : licencas * 60 * 12;
      } else if (sku.includes('Billing')) {
        valorLicencas = 120000;
      } else if (sku.includes('Earth')) {
        valorLicencas = 95000;
      } else {
        valorLicencas = 0;
      }
    }

    if (valorServicos === null) {
      if (licencas > 0) {
        valorServicos = licencas >= 1000 ? 45000 : 25000;
      } else if (sku.includes('Bolsa')) {
        valorServicos = 36000;
      } else if (sku.includes('Migration')) {
        valorServicos = 48000;
      } else if (sku.includes('Provisionamento')) {
        valorServicos = 22000;
      } else if (sku.includes('Billing')) {
        valorServicos = 12000;
      } else if (sku.includes('Earth')) {
        valorServicos = 18000;
      } else {
        valorServicos = 20000;
      }
    }

    const escopoDisplay = rawDemanda ? `${rawDemanda}${rawDoc ? ' — ' + rawDoc : ''}` : (rawNotas || 'Defesa técnica, arquitetura e proposta comercial');
    const preVendaFinal = targetSpecialist || rawPreVenda || (existing && existing.preVenda) || 'Danilo';
    const isVin = preVendaFinal.toLowerCase().includes('vinicius');

    return {
      id: `${prefix}-${101 + index}`,
      cliente: cleanCliente,
      clienteCompleto: rawCliente,
      demanda: rawDemanda,
      comercial: rawComercial,
      preVenda: isVin ? 'Vinicius' : 'Danilo',
      autoria: isVin
        ? 'Vinicius — Arquiteto GCP (Google Cloud Platform) | Servinformacion'
        : 'Danilo — Especialista GWS & Gemini | Servinformacion Pré-Vendas',
      sku: sku,
      licencas: licencas,
      valorLicencas: valorLicencas,
      valorServicos: valorServicos,
      estagio: rawStatus,
      previsao: rawData,
      escopo: escopoDisplay,
      docTitulo: rawDoc || `${cleanCliente} — Proposta Técnica`,
      docUrl: docUrl,
      docTipo: docTipo,
      hubspotUrl: hubspotUrl,
      hubspot: hubspotUrl || rawHubspot || `HS-${1001 + index}`,
      origem: 'Planilha Google Sheets Oficial — Servinformacion'
    };
  });
}

// Parse Opps CSV supporting both 5-column and 6-column structures
function parseAndApplyOppsCSV(csvText, targetSpecialist = null) {
  const normalized = parseOppsCsvToObjects(csvText, targetSpecialist);
  if (!normalized || normalized.length === 0) return;
  mergeSpecialistOpps(normalized, targetSpecialist);
}

// Parse Deploy CSV
function parseAndApplyDeployCSV(csvText) {
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  if (!parsed.data || parsed.data.length === 0) return;

  const normalized = parsed.data.map((row, index) => {
    const keys = Object.keys(row);
    const getVal = (patterns) => {
      for (const p of patterns) {
        const foundKey = keys.find(k => k.toLowerCase().trim().replace(/[^a-z0-9]/g, '').includes(p));
        if (foundKey && row[foundKey] !== undefined) return row[foundKey];
      }
      return '';
    };

    return {
      id: getVal(['id', 'codigo']) || `DEP-${200 + index}`,
      cliente: getVal(['cliente', 'empresa', 'projeto']) || `Projeto ${index + 1}`,
      responsavel: getVal(['responsavel', 'deployer', 'tecnico', 'danilo']) || 'Danilo',
      fase: getVal(['fase', 'status', 'etapa']) || 'Em Andamento',
      dataInicio: getVal(['inicio', 'kickoff', 'data']) || '',
      goLive: getVal(['golive', 'previsao', 'fim']) || '',
      origem: getVal(['origem', 'ambiente', 'migracao']) || 'Exchange / On-Prem',
      contas: parseInt(getVal(['contas', 'caixas', 'licencas'])) || 0,
      statusProgresso: parseInt(getVal(['progresso', 'percentual'])) || 50,
      detalhes: getVal(['detalhe', 'observacao', 'escopo']) || ''
    };
  });

  state.deploys = normalized;
  state.filteredDeploys = [...normalized];
  localStorage.setItem('seidor_deploy_data', JSON.stringify(normalized));
}

// Reset to default demo mock data (Restoring both Danilo and Vinicius portfolio)
async function useMockData() {
  try {
    const res = await fetch('data/seidor_opps.json');
    if (res.ok) {
      const serverOpps = await res.json();
      state.opps = serverOpps;
    } else {
      state.opps = defaultOpps;
    }
  } catch (e) {
    state.opps = defaultOpps;
  }
  state.deploys = defaultDeploys;
  state.renewals = defaultRenewals;
  state.filteredOpps = [...state.opps];
  state.filteredDeploys = [...defaultDeploys];

  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  updateModalBadges();

  closeConfigModal();
  renderAll();
  alert('Dados padrão restaurados com sucesso (Danilo + Vinicius consolidado)!');
}

// Export Opps to CSV
function exportOppsCSV() {
  const csv = Papa.unparse(state.opps);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Servinformacion_PreVendas_Danilo_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}


// ==========================================
// HUBSPOT CRM INTEGRATION MODULE
// ==========================================

const hubspotConfig = {
  token: localStorage.getItem('seidor_hubspot_token') || '',
  portalId: localStorage.getItem('seidor_hubspot_portal') || '8388367',
  apiBaseUrl: localStorage.getItem('seidor_api_base_url') || '',
  apiUrl: '/api/hubspot'
};

let currentHubSpotResults = [];

// Open HubSpot Search Modal
function openHubSpotSearch(oppId = '', defaultQuery = '') {
  const modal = document.getElementById('modal-hubspot-search');
  if (!modal) return;

  const targetInput = document.getElementById('hubspot-target-opp-id');
  const banner = document.getElementById('hubspot-target-banner');
  const bannerText = document.getElementById('hubspot-target-text');
  const searchInput = document.getElementById('hubspot-search-input');

  targetInput.value = oppId || '';

  if (oppId === '__new__') {
    banner.classList.remove('hidden');
    bannerText.innerHTML = 'Vincular deal selecionado à: <strong>Nova Proposta em Cadastro</strong>';
    if (!defaultQuery) {
      const clientInput = document.getElementById('new-opp-cliente');
      defaultQuery = clientInput ? clientInput.value.trim() : '';
    }
  } else if (oppId) {
    const opp = state.opps.find(o => o.id === oppId);
    if (opp) {
      banner.classList.remove('hidden');
      bannerText.innerHTML = `Vincular deal selecionado à proposta: <strong>${opp.cliente}</strong> <span class="text-slate-500 font-normal">(${opp.sku || opp.demanda || 'Workspace'})</span>`;
      if (!defaultQuery) {
        defaultQuery = opp.cliente || '';
      }
    } else {
      banner.classList.add('hidden');
    }
  } else {
    banner.classList.add('hidden');
  }

  // Pre-fill search input
  searchInput.value = defaultQuery;

  modal.classList.remove('hidden');
  lucide.createIcons();

  if (defaultQuery) {
    searchHubSpotDeals(defaultQuery);
  } else {
    document.getElementById('hubspot-search-results').innerHTML = `
      <div class="py-12 text-center text-slate-400 text-xs">
        <svg class="w-10 h-10 fill-current text-slate-300 mx-auto mb-2" viewBox="0 0 24 24"><path d="M18.8 7.3c-.9 0-1.7.5-2.1 1.2L12.9 6c.1-.3.1-.6.1-.9 0-1.9-1.5-3.4-3.4s-3.4 1.5-3.4 3.4c0 .8.3 1.5.7 2.1l-2.7 2.7c-.5-.3-1.1-.5-1.7-.5-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4c1.6 0 2.9-1.1 3.3-2.6l4.6 2.7c-.1.4-.1.8-.1 1.2 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4c-.7 0-1.4.2-2 .5L9.6 11c.1-.4.2-.8.2-1.2 0-.2 0-.5-.1-.7l3.8-2.5c.6.9 1.6 1.5 2.7 1.5 1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4z"/></svg>
        <p>Digite o nome do cliente, empresa ou proposta e clique em <strong>Buscar Deals</strong>.</p>
      </div>
    `;
    setTimeout(() => searchInput.focus(), 100);
  }
}

// Open Search for New Opp Modal
function openHubSpotSearchForNewOpp() {
  const clientInput = document.getElementById('new-opp-cliente');
  const q = clientInput ? clientInput.value.trim() : '';
  openHubSpotSearch('__new__', q);
}

// Close HubSpot Search Modal
function closeHubSpotSearch() {
  const modal = document.getElementById('modal-hubspot-search');
  if (modal) modal.classList.add('hidden');
}

// Clear specific target
function clearHubSpotTarget() {
  const targetInput = document.getElementById('hubspot-target-opp-id');
  const banner = document.getElementById('hubspot-target-banner');
  if (targetInput) targetInput.value = '';
  if (banner) banner.classList.add('hidden');
}

// Search Form Submission Handler
function handleHubSpotSearchSubmit(e) {
  if (e) e.preventDefault();
  const searchInput = document.getElementById('hubspot-search-input');
  const q = searchInput ? searchInput.value.trim() : '';
  searchHubSpotDeals(q);
}

// Search Deals via Proxy
async function searchHubSpotDeals(query) {
  const resultsContainer = document.getElementById('hubspot-search-results');
  if (!resultsContainer) return;

  if (!query) {
    resultsContainer.innerHTML = `
      <div class="py-8 text-center text-xs text-slate-400">
        Digite um termo para pesquisar oportunidades no HubSpot CRM.
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = `
    <div class="py-12 text-center text-slate-500 space-y-3">
      <div class="inline-block w-7 h-7 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-xs font-semibold text-slate-700">Buscando deals no HubSpot CRM da Servinformacion para "${escapeHtml(query)}"...</p>
    </div>
  `;

  try {
    const params = new URLSearchParams({
      q: query,
      token: hubspotConfig.token,
      portal_id: hubspotConfig.portalId
    });

    const baseUrl = (hubspotConfig.apiBaseUrl || '').replace(/\/+$/, '');
    const res = await fetch(`${baseUrl}/api/hubspot/search?${params.toString()}`);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (_parseErr) {
      if (res.status === 404 || text.includes('<!DOCTYPE') || text.includes('<html')) {
        throw new Error('Ambiente Estático (GitHub Pages): Esta versão do sistema está no GitHub Pages, onde servidores de backend (Python) não executam na nuvem. Você pode colar a URL do Deal abaixo ou executar localmente via python server.py.');
      }
      throw new Error(`Resposta inválida do servidor: ${text.slice(0, 100)}`);
    }

    if (!res.ok || !data.ok) {
      throw new Error(data.error || `Erro de conexão com o HubSpot (Status ${res.status})`);
    }

    currentHubSpotResults = data.results || [];
    renderHubSpotSearchResults(currentHubSpotResults, query);
  } catch (err) {
    console.error('Erro na busca HubSpot:', err);
    const isStaticEnv = err.message.includes('Ambiente Estático') || err.message.includes('GitHub Pages') || err.message.includes('<!DOCTYPE');

    if (isStaticEnv) {
      resultsContainer.innerHTML = `
        <div class="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-3.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 font-bold text-amber-800">
              <i data-lucide="info" class="w-4 h-4 text-amber-600"></i>
              <span>Ambiente Estático (GitHub Pages)</span>
            </div>
            <a href="https://app.hubspot.com/contacts/${escapeHtml(hubspotConfig.portalId)}/deals/list/view/all/?query=${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-xl font-bold text-[11px] shadow-sm flex items-center space-x-1.5 transition">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.8 7.3c-.9 0-1.7.5-2.1 1.2L12.9 6c.1-.3.1-.6.1-.9 0-1.9-1.5-3.4-3.4s-3.4 1.5-3.4 3.4c0 .8.3 1.5.7 2.1l-2.7 2.7c-.5-.3-1.1-.5-1.7-.5-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4c1.6 0 2.9-1.1 3.3-2.6l4.6 2.7c-.1.4-.1.8-.1 1.2 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4c-.7 0-1.4.2-2 .5L9.6 11c.1-.4.2-.8.2-1.2 0-.2 0-.5-.1-.7l3.8-2.5c.6.9 1.6 1.5 2.7 1.5 1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4z"/></svg>
              <span>Abrir "${escapeHtml(query)}" no CRM HubSpot ↗</span>
            </a>
          </div>
          <p class="text-[11px] text-amber-700 leading-relaxed">
            O GitHub Pages é uma hospedagem estática. Para busca 100% integrada na nuvem, basta conectar à <strong>Vercel</strong> (gratuito) ou colar a URL / ID do Deal abaixo:
          </p>
          <div class="p-3.5 bg-white rounded-xl border border-amber-300 space-y-2.5 shadow-sm">
            <label class="block font-bold text-[11px] text-slate-800">
              👉 Vincular Deal do HubSpot (Cole a URL completa ou apenas o ID numérico):
            </label>
            <div class="flex items-center space-x-2">
              <input type="text" id="inline-hubspot-deal-url" placeholder="Ex: https://app.hubspot.com/contacts/8388367/deal/53822024757 ou 53822024757" class="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:border-orange-500 focus:outline-none">
              <button type="button" onclick="applyInlineHubSpotUrl()" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow transition whitespace-nowrap">
                Vincular Deal
              </button>
            </div>
            <p class="text-[10px] text-slate-400">Você pode colar o link completo do deal aberto ou apenas os dígitos do ID do negócio.</p>
          </div>
          <div class="pt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span>Para busca dinâmica na nuvem: conecte à Vercel ou execute <code>python server.py</code> localmente.</span>
            <button type="button" onclick="openHubSpotConfigModal()" class="text-amber-800 underline font-bold">Configurar Backend</button>
          </div>
        </div>
      `;
    } else {
      resultsContainer.innerHTML = `
        <div class="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-2">
          <div class="font-bold flex items-center space-x-1.5">
            <i data-lucide="alert-circle" class="w-4 h-4 text-red-600"></i>
            <span>Não foi possível consultar o HubSpot</span>
          </div>
          <p class="text-[11px] text-red-700 leading-relaxed">${escapeHtml(err.message)}</p>
          <div class="pt-2 flex items-center space-x-3">
            <button onclick="openHubSpotConfigModal()" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-sm">
              Verificar Conexão HubSpot
            </button>
            <button onclick="promptManualHubSpotUrl()" class="px-3 py-1.5 bg-white border border-red-300 hover:bg-red-50 text-red-700 rounded-xl text-xs font-bold transition">
              Colar Link Manualmente
            </button>
          </div>
        </div>
      `;
    }
    lucide.createIcons();
  }
}

// Apply Inline HubSpot URL from static notice
function applyInlineHubSpotUrl() {
  const input = document.getElementById('inline-hubspot-deal-url');
  if (!input || !input.value.trim()) {
    alert('Por favor, informe a URL ou o ID do Deal no HubSpot.');
    return;
  }
  let url = input.value.trim();
  if (/^\d+$/.test(url)) {
    url = `https://app.hubspot.com/contacts/${hubspotConfig.portalId}/deal/${url}`;
  } else if (!url.startsWith('http')) {
    alert('A URL deve começar com https:// ou informe apenas os dígitos do ID do Deal.');
    return;
  }

  const targetOppId = document.getElementById('hubspot-target-opp-id').value;
  const match = url.match(/deal\/(\d+)/i);
  const dealId = match ? match[1] : 'HS-' + Date.now().toString().slice(-4);

  if (targetOppId === '__new__') {
    const urlInput = document.getElementById('new-opp-hubspot-url');
    if (urlInput) urlInput.value = url;
    closeHubSpotSearch();
    alert(`Link do Deal (${dealId}) vinculado à nova proposta!`);
    return;
  }

  if (targetOppId) {
    const opp = state.opps.find(o => o.id === targetOppId);
    if (opp) {
      opp.hubspotUrl = url;
      opp.hubspot = url;
      localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
      renderAll();

      const detailsModal = document.getElementById('modal-details');
      if (detailsModal && !detailsModal.classList.contains('hidden')) {
        viewOppDetail(targetOppId);
      }
      closeHubSpotSearch();
      alert(`Deal do HubSpot (${dealId}) vinculado com sucesso para "${opp.cliente}"!`);
      return;
    }
  }

  // Case 3: No target opp pre-selected, prompt user to choose
  const oppNames = state.opps.slice(0, 15).map((o, i) => `${i + 1}. ${o.cliente} (${o.sku || 'GWS'})`).join('\n');
  const choice = prompt(`Selecione o número da proposta para vincular este Deal (${dealId}):\n\n${oppNames}\n\nDigite o número de 1 a ${Math.min(15, state.opps.length)}:`);
  if (!choice) return;

  const idx = parseInt(choice.trim(), 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= state.opps.length) {
    alert('Número de proposta inválido.');
    return;
  }

  const selectedOpp = state.opps[idx];
  selectedOpp.hubspotUrl = url;
  selectedOpp.hubspot = url;
  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  renderAll();
  closeHubSpotSearch();
  alert(`Deal do HubSpot (${dealId}) vinculado com sucesso para "${selectedOpp.cliente}"!`);
}

// Render Results in Modal
function renderHubSpotSearchResults(results, query) {
  const container = document.getElementById('hubspot-search-results');
  const targetOppId = document.getElementById('hubspot-target-opp-id').value;

  if (!results || results.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-500 text-xs space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <i data-lucide="search-x" class="w-6 h-6"></i>
        </div>
        <div>
          <p class="font-bold text-slate-700 text-sm">Nenhum Deal encontrado para "${escapeHtml(query)}"</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Tente usar apenas o primeiro nome da empresa ou o ID do deal no HubSpot.</p>
        </div>
        <div class="pt-2">
          <button onclick="promptManualHubSpotUrl()" class="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl text-xs font-bold transition">
            🔗 Vincular URL do Deal Manualmente
          </button>
        </div>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const stageLabels = {
    'closedwon': { label: 'Fechado Ganho', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    'closedlost': { label: 'Fechado Perdido', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    'presentationscheduled': { label: 'Apresentação Agendada', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    'decisionmakerboughtin': { label: 'Em Negociação', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    'contractsent': { label: 'Contrato Enviado', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    'qualifiedtobuy': { label: 'Qualificado', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
  };

  let html = `
    <div class="text-[11px] text-slate-500 font-semibold mb-2 flex items-center justify-between">
      <span>Encontrados <strong>${results.length}</strong> deal(s) no HubSpot:</span>
      <span class="text-orange-600 font-bold">Portal ${hubspotConfig.portalId}</span>
    </div>
    <div class="space-y-2">
  `;

  results.forEach((deal, idx) => {
    const stageInfo = stageLabels[deal.stage] || { label: deal.stage || 'Em Aberto', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    const formattedAmount = deal.amount > 0 ? formatBRL(deal.amount) : 'Valor a definir';
    const closeDateStr = deal.closeDate ? formatDate(deal.closeDate) : 'Sem data';

    html += `
      <div class="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 hover:shadow-md transition space-y-2 group">
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-0.5 flex-1 min-w-0">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-slate-900 text-sm truncate" title="${escapeHtml(deal.name)}">
                ${escapeHtml(deal.name)}
              </span>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold border ${stageInfo.color}">
                ${stageInfo.label}
              </span>
            </div>
            <div class="flex items-center space-x-3 text-xs text-slate-500">
              <span class="font-mono font-bold text-slate-800">${formattedAmount}</span>
              <span>•</span>
              <span>Fechamento: <strong>${closeDateStr}</strong></span>
              <span>•</span>
              <span class="font-mono text-[10px] text-slate-400">ID: ${deal.id}</span>
            </div>
          </div>

          <div class="flex items-center space-x-2 shrink-0">
            <a href="${deal.url}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition" title="Abrir Deal no HubSpot">
              <i data-lucide="external-link" class="w-4 h-4"></i>
            </a>

            <button onclick="linkHubSpotDeal(${idx})" class="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs shadow-sm transition flex items-center space-x-1.5">
              <i data-lucide="link-2" class="w-3.5 h-3.5"></i>
              <span>${targetOppId ? 'Vincular a esta' : 'Vincular Deal'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
  lucide.createIcons();
}

// Link HubSpot Deal to Target Opportunity
function linkHubSpotDeal(dealIndex) {
  const deal = currentHubSpotResults[dealIndex];
  if (!deal) return;

  const targetOppId = document.getElementById('hubspot-target-opp-id').value;

  // Case 1: Linking into New Opportunity Form
  if (targetOppId === '__new__') {
    const urlInput = document.getElementById('new-opp-hubspot-url');
    if (urlInput) urlInput.value = deal.url;

    const clientInput = document.getElementById('new-opp-cliente');
    if (clientInput && !clientInput.value.trim()) {
      clientInput.value = deal.name;
    }

    closeHubSpotSearch();
    alert(`Deal "${deal.name}" inserido com sucesso no formulário da nova proposta!`);
    return;
  }

  // Case 2: Target Opportunity is already defined
  if (targetOppId) {
    const opp = state.opps.find(o => o.id === targetOppId);
    if (!opp) return;

    opp.hubspotUrl = deal.url;
    opp.hubspot = deal.url;

    // If deal has an amount and opportunity amount is 0, update amount
    if (deal.amount > 0 && (!opp.valor || opp.valor === 0)) {
      opp.valor = deal.amount;
    }

    localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
    renderAll();

    // If details modal is open for this opportunity, refresh it
    const detailsModal = document.getElementById('modal-details');
    if (detailsModal && !detailsModal.classList.contains('hidden')) {
      viewOppDetail(targetOppId);
    }

    closeHubSpotSearch();
    alert(`Deal "${deal.name}" vinculado com sucesso à proposta de "${opp.cliente}"!`);
    return;
  }

  // Case 3: Opened globally, ask user which opportunity to link
  const oppNames = state.opps.slice(0, 15).map((o, i) => `${i + 1}. ${o.cliente} (${o.sku || 'GWS'})`).join('\n');
  const choice = prompt(`Selecione o número da proposta para vincular o deal "${deal.name}":\n\n${oppNames}\n\nDigite o número de 1 a ${Math.min(15, state.opps.length)}:`);
  if (!choice) return;

  const idx = parseInt(choice.trim(), 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= state.opps.length) {
    alert('Número de proposta inválido.');
    return;
  }

  const selectedOpp = state.opps[idx];
  selectedOpp.hubspotUrl = deal.url;
  selectedOpp.hubspot = deal.url;
  if (deal.amount > 0 && (!selectedOpp.valor || selectedOpp.valor === 0)) {
    selectedOpp.valor = deal.amount;
  }

  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  renderAll();
  closeHubSpotSearch();
  alert(`Deal "${deal.name}" vinculado com sucesso à proposta de "${selectedOpp.cliente}"!`);
}

// Prompt Manual URL fallback
function promptManualHubSpotUrl() {
  const targetOppId = document.getElementById('hubspot-target-opp-id').value;

  if (targetOppId === '__new__') {
    const url = prompt('Cole a URL completa do Deal no HubSpot (https://app.hubspot.com/...):');
    if (url && url.trim().startsWith('http')) {
      const urlInput = document.getElementById('new-opp-hubspot-url');
      if (urlInput) urlInput.value = url.trim();
      closeHubSpotSearch();
      alert('Link do Deal colado com sucesso!');
    }
    return;
  }

  if (targetOppId) {
    const opp = state.opps.find(o => o.id === targetOppId);
    if (!opp) return;

    const current = opp.hubspotUrl || (opp.hubspot && opp.hubspot.startsWith('http') ? opp.hubspot : '');
    const url = prompt(`Informe a URL completa do Deal no HubSpot para "${opp.cliente}":`, current);
    if (url && url.trim().startsWith('http')) {
      opp.hubspotUrl = url.trim();
      opp.hubspot = url.trim();
      localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
      renderAll();

      const detailsModal = document.getElementById('modal-details');
      if (detailsModal && !detailsModal.classList.contains('hidden')) {
        viewOppDetail(targetOppId);
      }
      closeHubSpotSearch();
      alert(`Link do HubSpot vinculado com sucesso para "${opp.cliente}"!`);
    }
    return;
  }

  // Case 3: Opened without target opp, ask for URL and which opp to link to
  const url = prompt('Cole a URL completa do Deal no HubSpot (https://app.hubspot.com/...):');
  if (!url || !url.trim().startsWith('http')) return;

  const oppNames = state.opps.slice(0, 15).map((o, i) => `${i + 1}. ${o.cliente} (${o.sku || 'GWS'})`).join('\n');
  const choice = prompt(`Selecione o número da proposta para vincular este Deal:\n\n${oppNames}\n\nDigite o número de 1 a ${Math.min(15, state.opps.length)}:`);
  if (!choice) return;

  const idx = parseInt(choice.trim(), 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= state.opps.length) {
    alert('Número de proposta inválido.');
    return;
  }

  const selectedOpp = state.opps[idx];
  selectedOpp.hubspotUrl = url.trim();
  selectedOpp.hubspot = url.trim();
  localStorage.setItem('seidor_opps_data', JSON.stringify(state.opps));
  renderAll();
  closeHubSpotSearch();
  alert(`Deal do HubSpot vinculado com sucesso para "${selectedOpp.cliente}"!`);
}

// Open Config Modal
function openHubSpotConfigModal() {
  const modal = document.getElementById('modal-hubspot-config');
  if (!modal) return;

  const portalInput = document.getElementById('cfg-hubspot-portal-id');
  const tokenInput = document.getElementById('cfg-hubspot-token');
  const apiBaseInput = document.getElementById('cfg-hubspot-api-base');

  if (portalInput) portalInput.value = hubspotConfig.portalId;
  if (tokenInput) tokenInput.value = hubspotConfig.token;
  if (apiBaseInput) apiBaseInput.value = hubspotConfig.apiBaseUrl || '';

  modal.classList.remove('hidden');
  lucide.createIcons();
}

// Close Config Modal
function closeHubSpotConfigModal() {
  const modal = document.getElementById('modal-hubspot-config');
  if (modal) modal.classList.add('hidden');
}

// Toggle Token Password Visibility
function toggleTokenVisibility() {
  const tokenInput = document.getElementById('cfg-hubspot-token');
  const icon = document.getElementById('icon-toggle-token');
  if (!tokenInput) return;

  if (tokenInput.type === 'password') {
    tokenInput.type = 'text';
    if (icon) icon.setAttribute('data-lucide', 'eye-off');
  } else {
    tokenInput.type = 'password';
    if (icon) icon.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
}

// Test HubSpot Connection
async function testHubSpotConnection() {
  const tokenInput = document.getElementById('cfg-hubspot-token');
  const testText = document.getElementById('hubspot-test-text');
  const testContainer = document.getElementById('hubspot-test-status');

  const token = tokenInput ? tokenInput.value.trim() : hubspotConfig.token;
  if (!token) {
    alert('Informe um token para testar a conexão.');
    return;
  }

  if (testText) testText.textContent = 'Validando token com a API do HubSpot...';

  try {
    const baseUrl = (hubspotConfig.apiBaseUrl || '').replace(/\/+$/, '');
    const res = await fetch(`${baseUrl}/api/hubspot/test?token=${encodeURIComponent(token)}`);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (_e) {
      if (res.status === 404 || text.includes('<!DOCTYPE')) {
        throw new Error('Ambiente Estático (GitHub Pages): Teste de API requer servidor local (python server.py) ou deploy no Vercel.');
      }
      throw new Error(`Resposta inválida: ${text.slice(0, 70)}`);
    }

    if (data.ok) {
      if (testContainer) {
        testContainer.className = 'p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between';
      }
      if (testText) {
        testText.textContent = `Conexão validada com sucesso! (${data.total || 'OK'} deals acessíveis)`;
      }
    } else {
      throw new Error(data.error || 'Falha ao autenticar.');
    }
  } catch (err) {
    if (testContainer) {
      testContainer.className = 'p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between';
    }
    if (testText) {
      testText.textContent = `${err.message}`;
    }
  }
}

// Save HubSpot Configuration
function saveHubSpotConfig() {
  const portalInput = document.getElementById('cfg-hubspot-portal-id');
  const tokenInput = document.getElementById('cfg-hubspot-token');
  const apiBaseInput = document.getElementById('cfg-hubspot-api-base');

  const newPortal = portalInput ? portalInput.value.trim() : '8388367';
  const newToken = tokenInput ? tokenInput.value.trim() : hubspotConfig.token;
  const newApiBase = apiBaseInput ? apiBaseInput.value.trim().replace(/\/+$/, '') : '';

  if (!newToken) {
    alert('O token da API do HubSpot é obrigatório.');
    return;
  }

  hubspotConfig.portalId = newPortal || '8388367';
  hubspotConfig.token = newToken;
  hubspotConfig.apiBaseUrl = newApiBase;

  localStorage.setItem('seidor_hubspot_portal', hubspotConfig.portalId);
  localStorage.setItem('seidor_hubspot_token', hubspotConfig.token);
  localStorage.setItem('seidor_api_base_url', hubspotConfig.apiBaseUrl);
  localStorage.setItem('seidor_hubspot_token', hubspotConfig.token);

  // Update header badge
  const badge = document.getElementById('hubspot-status-badge');
  if (badge) {
    badge.textContent = `HubSpot CRM Conectado (Portal ${hubspotConfig.portalId})`;
  }

  closeHubSpotConfigModal();
  alert('Configuração do HubSpot CRM salva com sucesso!');
}

// Escape HTML helper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
