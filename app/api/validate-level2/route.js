export async function POST(req) {
  const body = await req.json();
  const { flag } = body;

  const correctFlag = "FLAG{stay}";

  if (flag === correctFlag) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false });
  }
}