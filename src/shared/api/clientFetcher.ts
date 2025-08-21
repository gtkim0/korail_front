import {ResponseType} from "@/types/common";
import Router from 'next/router';

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
  options: RequestInit = {method: 'GET'}
): Promise<ResponseType<T>> {

  const token = localStorage.getItem('access_token'); // 또는 쿠키 파싱해서 가져오기

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

  if (!res.ok) {

    if (res.status && Number(res.status) === 401) {

      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {
        method: 'post'
      }).then(res => {
        Router.push('/auth/login')
      })

      // const refreshRes = await fetch('/auth/refresh', {
      //   method: 'POST',
      //   credentials: 'include'
      // })

      // if(refreshRes.ok) {
      //   // res = await fetch()
      // }

      return res.json();

      // const token = cookieStore.get('accessToken')
      // console.log(token);
    }

    const message = await res.json();
    return message as ResponseType<T>
    // Error(`API 요청 실패 (${res.status}): ${message}`);
  }

  const contentType = res.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  return {} as ResponseType<T>;
}

export const clientGet = <T>(
  url: string,
  queryParams?: Record<string, any>
) => {
  const queryString = buildQueryParams(queryParams);
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  return clientFetch<T>(fullUrl, {method: 'GET'});
};

export const clientPost = <T>(url: string, body: any) => {
  return clientFetch<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

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