import { NextResponse, NextRequest } from "next/server";
const AfricasTalking = require("africastalking");

export async function POST(request: NextRequest) {
  try {
    const africastalking = AfricasTalking({
      apiKey: String(process.env.NEXT_PUBLIC_AFRICAS_TALKING_API),
      username: String(process.env.NEXT_PUBLIC_AFRICAS_TALKING_USERNAME),
    });

    const { phone, message }: any = await request.json(); // Destructure formData from request body
    console.log("Sending SMS to:", phone);

    const result = await africastalking.SMS.send({
      message: message,
      from: "78485",
      to: phone,
    });

    console.log("SMS sent successfully:", result.sid);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.error();
  }
}
