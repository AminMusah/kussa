import { NextResponse } from "next/server";
import https from "https";

export async function POST(req: Request) {
  try {
    // Parse the request body to get email and amount
    const { email, amount } = await req.json();

    // Validate the input
    if (!email || !amount) {
      return new NextResponse("Email and amount are required", { status: 400 });
    }

    // Prepare the request options for Paystack API
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    // Make the request to Paystack API
    const paystackResponse = await new Promise((resolve, reject) => {
      const req = https
        .request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          reject(error);
        });

      req.write(JSON.stringify({ email, amount: amount * 100 })); // Paystack expects amount in kobo
      req.end();
    });

    return new NextResponse(JSON.stringify(paystackResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("[PAYMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
