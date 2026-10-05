export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/search/?q=solana"
    );

    const data = await response.json();

    res.status(200).json({
      ok: true,
      tokens: data.pairs || []
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
      }
