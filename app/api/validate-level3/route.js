export async function POST(req) {
  const body = await req.json();
  let { flag } = body;

  if (!flag) {
    return Response.json({ success: false });
  }

  // normalize input
  flag = flag.trim().toLowerCase();

  const correctFlag = "flag{gargantua_signal_shift_decoded}";

  if (flag === correctFlag) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false });
  }
}