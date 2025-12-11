import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing captcha token" },
        { status: 400 }
      );
    }

    const secret = process.env.CAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: "Missing CAPTCHA_SECRET_KEY env" },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
        }).toString(),
      }
    );

    const verification = await verifyResponse.json();

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed", details: verification["error-codes"] },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, score: verification.score, action: verification.action });
  } catch (error) {
    console.error("Captcha verification error", error);
    return NextResponse.json(
      { success: false, error: "Captcha verification error" },
      { status: 500 }
    );
  }
}
