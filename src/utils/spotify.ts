const REFRESH_TOKEN = import.meta.env.VITE_VERCEL_SPOTIFY_REFRESH_TOKEN as string;
const CLIENT_ID = import.meta.env.VITE_VERCEL_SPOTIFY_API as string;
const CLIENT_ID_SHH = import.meta.env.VITE_VERCEL_SPOTIFY_API_SECRET as string;

const getAccessToken = async () => {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_ID_SHH,
      })
    });
  
    const data = await res.json();
    return data.access_token;
  };

  async function fetchWebApi(endpoint : string, method : string, body? : JSON) {
    const token = await getAccessToken();
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }

const getTopTracks = async () => {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=1', 'GET'
  )).items;
}

const topTracks = await getTopTracks();


export { getTopTracks };