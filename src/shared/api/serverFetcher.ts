import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export function buildQueryParams(params?: Record<string, any>): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function serverFetch<T>(
  url: string,
  options: RequestInit & { revalidate?: number } = { method: 'GET' }
): Promise<T> {

  const storeCookie = await cookies();
  const token = storeCookie.get('access_token');

  const { revalidate, ...fetchOptions } = options;

  const res = await fetch(BASE_URL + url, {
    method: options.method ?? 'GET',
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: 'force-cache',
    ...(revalidate && { next: { revalidate } }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`서버 API 요청 실패 (${res.status}): ${message}`);
  }

  return res.json();
}

export const serverGet = <T>(
  url: string,
  queryParams?: Record<string, any>,
  options?: RequestInit & { revalidate?: number }
) => {
  const queryString = buildQueryParams(queryParams);
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return serverFetch<T>(fullUrl, {
    method: 'GET',
    ...options,
  });
};

export const serverPost = <T>(url: string, body: any) =>
  serverFetch<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const serverPut = <T>(url: string, body: any) =>
  serverFetch<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const serverDelete = <T>(
  url: string,
  queryParams?: Record<string, any>
) => {
  const query = buildQueryParams(queryParams);
  const fullUrl = query ? `${url}?${query}` : url;

  return serverFetch<T>(fullUrl, {
    method: 'DELETE',
  });
};