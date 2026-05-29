exports.handler = async function(event) {
  const endpoint = event.queryStringParameters.endpoint;
  const apiKey = event.headers['x-api-key'];
  const apiSecret = event.headers['x-api-secret'];

  if (!endpoint || !apiKey || !apiSecret) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing params' }) };
  }

  const url = 'https://data.alpaca.markets' + endpoint;

  try {
    const res = await fetch(url, {
      headers: {
        'APCA-API-KEY-ID': apiKey,
        'APCA-API-SECRET-KEY': apiSecret,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
