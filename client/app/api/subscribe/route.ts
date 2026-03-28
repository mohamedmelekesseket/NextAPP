import { NextResponse } from "next/server";
import type { SubscribePayload } from "@/types/subscribe";

export async function POST(request: Request) {
  const body = (await request.json()) as SubscribePayload;
  if (!body?.email?.trim()) {
    return NextResponse.json({ error: "E-mail requis." }, { status: 400 });
  }
  // TODO: brancher votre liste / backend
  return NextResponse.json({ ok: true });
}
