export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const endpoint = url.searchParams.get('endpoint');
  const apiKey = request.headers.get('x-api-key');
  const apiSecret = request.headers.get('x-api-secret');

  if (!endpoint || !apiKey || !apiSecret) {
    return new Response(JSON.stringify({ error: 'Missing params' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const alpacaUrl = 'https://data.alpaca.markets' + endpoint;

  try {
    const res = await fetch(alpacaUrl, {
      headers: {
        'APCA-API-KEY-ID': apiKey,
        'APCA-API-SECRET-KEY': apiSecret,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
