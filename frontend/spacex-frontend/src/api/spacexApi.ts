import type { Launch } from "../models/Launch";

const BASE_URL =
  "https://m4r0woavrj.execute-api.us-east-1.amazonaws.com/Prod/api/v1";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Error al consumir la API");
  }
  return response.json();
}

export async function getAllLaunches(): Promise<Launch[]> {
  const res = await fetch(`${BASE_URL}/launches`);
  return handleResponse<Launch[]>(res);
}

export async function getLaunchesByStatus(
  status: string
): Promise<Launch[]> {
  const res = await fetch(`${BASE_URL}/launches/status/${status}`);
  return handleResponse<Launch[]>(res);
}

export async function getLaunchesByRocket(
  rocket: string
): Promise<Launch[]> {
  const res = await fetch(
    `${BASE_URL}/launches/rocket/${encodeURIComponent(rocket)}`
  );
  return handleResponse<Launch[]>(res);
}

export async function getLaunchesByLaunchpad(
  launchpad: string
): Promise<Launch[]> {
  const res = await fetch(
    `${BASE_URL}/launches/launchpad/${encodeURIComponent(launchpad)}`
  );
  return handleResponse<Launch[]>(res);
}

export async function getLaunchesByDate(
  date: string
): Promise<Launch[]> {
  const res = await fetch(`${BASE_URL}/launches/date/${date}`);
  return handleResponse<Launch[]>(res);
}
