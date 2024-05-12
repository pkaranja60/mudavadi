import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
    const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const { phone, message }: any = await request.json(); // Destructure formData from request body
    console.log("Sending SMS to:", phone);

    // Use formData in message if needed
    const result = await client.messages.create({
      body: message,
      from: "+14054337915", // Your Twilio phone number
      to: phone,
    });

    console.log("SMS sent successfully:", result.sid);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.error();
  }
}
