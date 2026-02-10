import Payment from "@/lib/db/payment.model";
import { authGuard } from "@/lib/auth";

export async function POST(req) {
  const user = await authGuard(req);
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan, upiRef } = await req.json();

  await Payment.create({
    user: user._id,
    plan,
    upiRef,
    status: "PENDING"
  });

  return Response.json({
    success: true,
    message: "Payment submitted. Waiting for approval."
  });
}
