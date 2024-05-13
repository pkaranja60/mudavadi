import { NextResponse, NextRequest } from "next/server";
const AfricasTalking = require("africastalking");

type SendSMSRequest = {
  phone: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const data: SendSMSRequest = await request.json(); // Destructure with typed data
    console.log("Sending SMS to:", data.phone);

    const africastalking = AfricasTalking({
      apiKey: String(process.env.NEXT_PUBLIC_AFRICAS_TALKING_API),
      username: String(process.env.NEXT_PUBLIC_AFRICAS_TALKING_USERNAME),
    });

    const result = await africastalking.SMS.send({
      message: data.message,
      from: "78485",
      to: data.phone,
    });

    console.log("SMS sent successfully:", result.sid);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending SMS:", error);
    if (error.response && error.response.status) {
      // Handle specific errors from Africa's Talking API
      return NextResponse.json(
        { message: error.message },
        { status: error.response.status }
      );
    } else {
      // Handle other errors (e.g., server error)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
