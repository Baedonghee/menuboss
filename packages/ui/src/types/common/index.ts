export interface IOption {
  value: string | number;
  name: string;
  icon?: React.ReactNode;
}

export interface IApi<T = any> {
  status: number;
  message: string;
  data: T;
}

export interface IApiList<T = any> {
  status: number;
  message: string;
  list: T;
  count: number;
  page: IPage;
}

export interface IPage {
  offsetTime: number;
  size: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface ICustomError {
  message: string;
}

export interface ICode {
  code: string;
  name: string;
}

export interface IMoreMenuList {
  icon: React.ReactNode;
  color: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export interface ITabMenuList {
  name: string;
  path: string;
}

export interface ITimeRange {
  start: string;
  end: string;
}
