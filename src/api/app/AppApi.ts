import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { AppConst } from '/@/api/app/AppConst';

export function addAppInfo(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: AppConst.ADD_APP_INFO,
    params,
  });
}

export function delAppInfo(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: AppConst.DEL_APP_INFO,
    params,
  });
}

export function getAppInfoList(params) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: AppConst.GET_APP_INFO_LIST,
    params,
  });
}
