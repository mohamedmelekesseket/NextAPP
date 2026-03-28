import { NextResponse } from "next/server";
import type { ContactPayload } from "@/types/contact";

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  if (!body?.email || !body?.message || !body?.name) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }
  // TODO: envoyer un e-mail ou enregistrer en base
  return NextResponse.json({ ok: true });
}
