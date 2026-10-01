// Vercel Serverless Function: Google Sheets CSV Sync Proxy
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sheetId = req.query.sheet_id || process.env.SHEET_ID || '18W3pM9p7R86obA0vAFlkl6NrLzNjk3Aa9dVlipGi7R4';
  const specialist = req.query.specialist || 'Vinicius';

  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const response = await fetch(csvUrl);
    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: `Erro ao baixar planilha do Google Sheets (${response.status})`
      });
    }

    const csvText = await response.text();
    return res.status(200).json({
      ok: true,
      sheet_id: sheetId,
      specialist: specialist,
      csv: csvText
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
