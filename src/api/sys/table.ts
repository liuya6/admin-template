import { defHttp } from '/@/utils/http/axios';
import { ResponseData } from '../model/baseModel';

export function getDemoTableData(params: any) {
  return defHttp.get<ResponseData>({
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
