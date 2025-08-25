'use client';
import {useAuthNavigation} from "@/shared/hooks/useAuthNavigation";

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

async function clientFetcher<T>(
  url: string,
  options: RequestInit = {method: 'GET'}
): Promise<Response> {

  const rootFlag = '/apis'

  let res = await fetch(`${rootFlag}${url}`, {
    method: options.method ?? 'GET',
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      // ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store"
  });

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res
  }

  return {} as Promise<Response>;
}

export function useClientApi() {

  const {onUnauthorized} = useAuthNavigation();

  const get = async <T>(
    url: string,
    queryParams?: Record<string, any>,
    optional?: any
  ) => {
    const queryString = buildQueryParams(queryParams);
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const res = await clientFetcher<T>(fullUrl, {method: 'GET', optional});

    if (res.status === 401) {
      await onUnauthorized();
    } else {
      return res.json()
    }
  }

  const post = async <T>(url: string, body: any) => {
    const res = await clientFetcher<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      await onUnauthorized()
    } else {
      return res.json()
    }
  }

  return {get, post}
}