import Payment from "@/lib/db/payment.model";
import User from "@/lib/db/user.model";

export async function POST(req) {
  const { paymentId } = await req.json();

  const payment = await Payment.findById(paymentId);
  if (!payment) {
    return Response.json({ error: "Payment not found" });
  }

  payment.status = "APPROVED";
  await payment.save();

  await User.findByIdAndUpdate(payment.user, {
    plan: payment.plan
  });

  return Response.json({
    success: true,
    message: "Plan activated successfully"
  });
}
