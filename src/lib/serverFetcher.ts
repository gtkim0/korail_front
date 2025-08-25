import {cookies} from "next/headers";
import {UnauthorizedError} from "@/lib/errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function serverFetcher<T>(
  url: string,
  options: RequestInit & { revalidate?: number } = {method: 'GET'}
): Promise<T> {

  const cook = await cookies();
  const cookieHeader = cook.toString();

  const {revalidate, ...fetchOptions} = options;

  const res = await fetch(BASE_URL + url, {
    method: options.method ?? 'GET',
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieHeader,
      ...fetchOptions.headers,
      // ...(token && { Authorization: `Bearer ${token}` }),
    },
    // cache: 'force-cache',
    ...(revalidate && {next: {revalidate}}),
  });


  if (res.status === 401) {
    throw new UnauthorizedError();
  }

  return res.json();
}