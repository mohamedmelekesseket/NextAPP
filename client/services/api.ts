/**
 * Central place for API calls. Set NEXT_PUBLIC_API_URL in `.env.local`
 * (e.g. http://localhost:5000).
 */
import axios from "axios";
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

async function requestJson<T>(path: string, payload?: unknown): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : baseUrl
      ? `${baseUrl}${path}`
      : path;
  try {
    const response = await axios.post<T>(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        error.message ||
        "Request failed";
      const status = error.response?.status ?? 500;
      const body =
        typeof error.response?.data === "string"
          ? error.response.data
          : JSON.stringify(error.response?.data ?? {});
      throw new ApiError(message, status, body);
    }
    throw new ApiError("Request failed", 500);
  }
}

export async function postContact(body: ContactPayload) {
  return requestJson<unknown>("/api/contact", body);
}

export async function postSubscribe(body: SubscribePayload) {
  return requestJson<unknown>("/api/subscribe", body);
}

export type VolunteerPayload = {
  name: string;
  email: string;
  phone?: string;
};

export async function postVolunteer(body: VolunteerPayload) {
  return requestJson<unknown>("/api/volunteer", body);
}
