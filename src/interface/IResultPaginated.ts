export default interface IResultPaginated<T> {
  results: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}
