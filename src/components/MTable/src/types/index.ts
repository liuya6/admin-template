type HeaderTipsFn = () => string | string[];

type HeaderTips = string | string[] | HeaderTipsFn;

export interface TableData {
  title?: string;
  type?: 'checkbox' | 'drag';
  field?: string;
  minWidth?: number;
  width?: number;
  headerTips?: HeaderTips;
  formatter?: (params: any) => any;
  children?: TableData[];
  render?: any;
}
