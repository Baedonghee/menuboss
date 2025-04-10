export interface IMainPlanListKo {
  name: string;
  yearPrice: string;
  monthPrice: string;
  perScreen?: string;
  description: string;
  count: number;
  buttonName: string;
  options: string[];
  optionDescription?: string;
  currency?: string;
}

export interface IMainPlanList {
  name: string;
  yearPrice: string;
  monthPrice: string;
  perScreen?: string;
  description: string;
  count: number;
  buttonName: string;
  options: string[];
  disabledOptions: string[];
  optionDescription?: string;
  currency?: string;
}
