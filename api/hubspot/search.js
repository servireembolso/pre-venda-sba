// Vercel Serverless Function: HubSpot Deals Search
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query.q || (req.body && req.body.q) || '';
  const token = req.query.token || (req.body && req.body.token) || process.env.HUBSPOT_TOKEN || '';
  const portalId = req.query.portal_id || (req.body && req.body.portal_id) || process.env.HUBSPOT_PORTAL_ID || '8388367';

  if (!query) {
    return res.status(400).json({ ok: false, error: 'Parâmetro de pesquisa (q) não fornecido' });
  }

  if (!token) {
    return res.status(400).json({ ok: false, error: 'Token do HubSpot não configurado' });
  }

  try {
    const hubspotRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        limit: 15,
        properties: [
          'dealname', 'amount', 'dealstage', 'closedate',
          'pipeline', 'hubspot_owner_id', 'createdate'
        ]
      })
    });

    const data = await hubspotRes.json();
    if (!hubspotRes.ok) {
      return res.status(hubspotRes.status).json({
        ok: false,
        error: data.message || `Erro API HubSpot (${hubspotRes.status})`
      });
    }

    const results = (data.results || []).map(d => {
      const props = d.properties || {};
      return {
        id: d.id,
        name: props.dealname || 'Sem nome',
        amount: parseFloat(props.amount || 0),
        stage: props.dealstage || 'Não definido',
        ownerId: props.hubspot_owner_id || '',
        closeDate: props.closedate || '',
        createDate: props.createdate || '',
        url: `https://app.hubspot.com/contacts/${portalId}/deal/${d.id}`
      };
    });

    return res.status(200).json({
      ok: true,
      query: query,
      total: data.total || results.length,
      count: results.length,
      results: results
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
