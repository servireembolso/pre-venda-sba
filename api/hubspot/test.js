// Vercel Serverless Function: HubSpot Connection Test
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = req.query.token || process.env.HUBSPOT_TOKEN || '';
  if (!token) {
    return res.status(400).json({ ok: false, error: 'Token não fornecido' });
  }

  try {
    const hubspotRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals?limit=1', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await hubspotRes.json();
    if (!hubspotRes.ok) {
      return res.status(hubspotRes.status).json({
        ok: false,
        error: data.message || `Erro API HubSpot (${hubspotRes.status})`
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Conexão com HubSpot validada com sucesso!',
      total: data.total
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
