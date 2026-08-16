import { NextResponse } from "next/server";
import { cors, corsOptions } from "../cors";

export const dynamic = "force-dynamic";

// GET /api/league-materials/ping — diagnostic endpoint (CORS-enabled for cross-origin probing)
export async function GET() {
  return cors(NextResponse.json({ ok: true, time: Date.now() }));
}

// POST /api/league-materials/ping — test POST body reading
export async function POST() {
  return cors(NextResponse.json({ ok: true, time: Date.now(), msg: "POST received" }));
}

export async function OPTIONS() {
  return corsOptions();
}
