"use server";

import {withAuth} from "@/lib/withAuth";
import {serverGet} from "@/shared/api/serverFetcher";
import {serverFetcher} from "@/lib/serverFetcher";
import type {ResponseType} from "@/types/common";

export async function serverGetAuth<T>(
  url: string,
  params?: any,
  opts?: { returnTo?: string; loginPath?: string; logout?: boolean }
) {
  return withAuth<ResponseType<T>>(() => serverGet<T>(url, params), opts);
}

export async function serverFetchAuth<T>(
  url: string,
  body?: any,
  opts?: { returnTo?: string; loginPath?: string; logout?: boolean }
) {
  return withAuth<T>(() => serverFetcher<T>(url, body), opts);
}