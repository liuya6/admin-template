import { defHttp } from '/@/utils/http/axios';

export function getDemoTableData(params: any) {
  return defHttp.get({
    url: 'basic-api/getDemoList',
    params,
  });
}

export function getSelectList(params: any) {
  return defHttp.get({
    url: 'basic-api/getSelectList',
    params,
  });
}
