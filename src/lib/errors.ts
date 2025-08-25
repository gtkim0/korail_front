export class UnauthorizedError extends Error {
  status = 401 as const;

  constructor(msg = 'Unauthorized') {
    super(msg);
    this.name = 'UnauthorizedError';
  }
}

export const isUnauthorized = (e: unknown): e is UnauthorizedError =>
  e instanceof UnauthorizedError || (typeof e === 'object' && e !== null && (e as any).status === 401)