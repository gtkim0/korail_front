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
  options: RequestInit = { method: 'GET' }
): Promise<T> {
  const token = cookies().get('access_token')?.value;

  const res = await fetch(BASE_URL + url, {
    method: options.method ?? 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`서버 API 요청 실패 (${res.status}): ${message}`);
  }

  return res.json();
}

export const serverGet = <T>(
  url: string,
  queryParams?: Record<string, any>
) => {
  const queryString = buildQueryParams(queryParams);
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return serverFetch<T>(fullUrl, { method: 'GET' });
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