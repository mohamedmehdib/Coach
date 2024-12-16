import { NextResponse } from "next/server";


const FLASK_API_URL = `${process.env.NEXT_PUBLIC_FLASK_API_URL}/api/create-payment`;

interface PaymentRequestBody {
  name: string;
  email: string;
  amount: number;
  service: string;
}

export async function POST(req: Request) {
  try {
    const body: Partial<PaymentRequestBody> = await req.json();

    const { name, email, amount, service } = body;
    if (!name || !email || !amount || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


    const paymentResponse = await fetch(FLASK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, amount, service }),
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error(`Flask API Error: ${errorText}`);
      return NextResponse.json(
        { error: `Failed to create payment: ${errorText}` },
        { status: 500 }
      );
    }

    const paymentData = await paymentResponse.json();

    return NextResponse.json({
      paymentUrl: paymentData.paymentUrl,
      paymentData: { name, email, amount, service },
    });
  } catch (error: any) {
    console.error("Error processing request:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
