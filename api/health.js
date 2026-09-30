export default async function handler(req, res) {
  return res.status(200).json({
    ok: true,
    service: "TokenScope API",
    status: "online",
    message: "TokenScope backend is working"
  });
}
