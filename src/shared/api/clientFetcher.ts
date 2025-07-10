// lib/fetchers/clientFetcher.ts
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

export async function clientFetch<T>(
  url: string,
  options: RequestInit = { method: 'GET' }
): Promise<T> {
  const token = localStorage.getItem('access_token'); // 또는 쿠키 파싱해서 가져오기

  const res = await fetch(url, {
    method: options.method ?? 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`클라이언트 API 요청 실패 (${res.status}): ${message}`);
  }

  return res.json();
}

export const clientGet = <T>(
  url: string,
  queryParams?: Record<string, any>
) => {
  const queryString = buildQueryParams(queryParams);
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  return clientFetch<T>(fullUrl, { method: 'GET' });
};

export const clientPost = <T>(url: string, body: any) =>
  clientFetch<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const clientPut = <T>(url: string, body: any) =>
  clientFetch<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const clientDelete = <T>(
  url: string,
  queryParams?: Record<string, any>
) => {
  const query = buildQueryParams(queryParams);
  const fullUrl = query ? `${url}?${query}` : url;

  return clientFetch<T>(fullUrl, {
    method: 'DELETE',
  });
};