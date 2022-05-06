export interface BasicPageParams {
  page: number;
  limit: number;
}

export interface TableData {
  list: any[];
  total: number;
}

export interface ResponseData {
  result: TableData;
  code: number;
  message: string;
  type: string;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
