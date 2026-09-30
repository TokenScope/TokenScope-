export default async function handler(req, res) {
  try {
    const { q, chain = "solana" } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Search query is required"
      });
    }

    const query = q.trim();

    // Solana token search through Jupiter
    if (chain.toLowerCase() === "solana") {
      const response = await fetch(
        `https://api.jup.ag/tokens/v2/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        return res.status(response.status).json({
          ok: false,
          error: "Token data provider returned an error"
        });
      }

      const tokens = await response.json();

      const results = Array.isArray(tokens) ? tokens : [];

      const formatted = results.map((token) => ({
        address: token.id || token.address || null,
        name: token.name || "Unknown",
        symbol: token.symbol || "UNKNOWN",
        logo: token.icon || token.logoURI || null,

        chain: "Solana",

        decimals: token.decimals ?? null,

        price: token.usdPrice ?? null,

        marketCap: token.mcap ?? null,
        fdv: token.fdv ?? null,

        liquidity: token.liquidity ?? null,

        holders: token.holderCount ?? null,

        organicScore: token.organicScore ?? null,

        isVerified: token.isVerified ?? false,

        raw: token
      }));

      return res.status(200).json({
        ok: true,
        query,
        chain: "solana",
        count: formatted.length,
        results: formatted
      });
    }

    return res.status(400).json({
      ok: false,
      error: `Chain "${chain}" is not supported yet`
    });

  } catch (error) {
    console.error("TokenScope search error:", error);

    return res.status(500).json({
      ok: false,
      error: "Unable to search token data",
      details: error.message
    });
  }
}
