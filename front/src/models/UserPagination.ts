import type User from "./User";

export interface UserPagination {
  users: User[];
  pagination: Pagination;
}
export type Pagination = {
  count_args: string[];
  ends: boolean;
  limit: number;
  outset: number;
  page: number;
  page_param: string;
  size: number;
  items: number;
  count: number;
  pages: number;
  series: (string | number)[];
};
