/**
 * Central place for API calls. Set NEXT_PUBLIC_API_URL in `.env.local`
 * (e.g. http://localhost:4000). Uses native fetch — add axios here if you prefer.
 */
import type { ContactPayload } from "@/types/contact";
import type { SubscribePayload } from "@/types/subscribe";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function requestJson<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const { json, ...rest } = init;
  const url = path.startsWith("http")
    ? path
    : baseUrl
      ? `${baseUrl}${path}`
      : path;
  const headers = new Headers(rest.headers);
  if (json !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(url, {
    ...rest,
    headers,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new ApiError(res.statusText || "Request failed", res.status, text);
  }
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export async function postContact(body: ContactPayload) {
  return requestJson<unknown>("/api/contact", { method: "POST", json: body });
}

export async function postSubscribe(body: SubscribePayload) {
  return requestJson<unknown>("/api/subscribe", {
    method: "POST",
    json: body,
  });
}
