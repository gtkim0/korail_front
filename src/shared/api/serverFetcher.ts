import {cookies} from 'next/headers';
import logger from "@/lib/logger";
import {ResponseType} from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export type QueryPrimitive = string | number | boolean | null | undefined;
export type QueryValue = QueryPrimitive | QueryPrimitive[];
export type QueryParams = Record<string, QueryValue>;

export type RevalidateOption = {
  next?: { revalidate?: number; tags?: string[] };
  revalidate?: number;
};

export type ServerGetOptions = Omit<RequestInit, "method" | "body"> & RevalidateOption;

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
  options: RequestInit & { revalidate?: number } = {method: 'GET'}
): Promise<T> {

  const {revalidate, ...fetchOptions} = options;

  const cook = await cookies();
  const cookieHeader = cook.toString()

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

  // @TODO json 타입인지 확인하는 처리해야할듯.

  logger.error({
    message: 'res >>>', data: {
      endPoint: '/board',
      method: 'GET',
      body: {},
      headers: {},
      params: {},
      response: {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        url: res.url,
      }
    }
  });


  if (!res.ok) {
    const message = await res.text();
    logger.error({
      message: 'res >>>', data: {
        endPoint: '/board',
        method: 'GET',
        body: {},
        headers: {},
        params: {},
        response: {
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
          body: message
        }
      }
    });
    throw new Error(`서버 API 요청 실패 (${res.status}): ${message}`);
  }

  return res.json();
}

// export const serverGet = <T>(
//   url: string,
//   queryParams?: Record<string, any>,
//   options?: RequestInit & { revalidate?: number }
// ) => {
//   const queryString = buildQueryParams(queryParams);
//   const fullUrl = queryString ? `${url}?${queryString}` : url;
//
//   return serverFetch<ResponseType<T>>(fullUrl, {
//     method: 'GET',
//     ...options,
//   });
// };

export const serverGet = async <T>(
  url: string,
  queryParams?: QueryParams,
  options?: ServerGetOptions
): Promise<ResponseType<T>> => {
  const queryString = buildQueryParams(queryParams);
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const next =
    options?.next || options?.revalidate
      ? {...(options?.next ?? {}), revalidate: options?.next?.revalidate ?? options?.revalidate}
      : undefined;

  return serverFetch<ResponseType<T>>(fullUrl, {
    method: "GET",
    ...options,
    ...(next ? {next} : {}),
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