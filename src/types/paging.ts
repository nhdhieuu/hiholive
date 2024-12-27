export interface Paging {
  limit: number;
  page: number;
  total: number;
  cursor?: unknown;
  nextCursor?: unknown;
}
