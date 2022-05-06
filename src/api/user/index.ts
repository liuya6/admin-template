import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { userConst } from './userConst';

export function login(params: { username: string; password: string }) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: userConst.USER_LOGIN,
    params,
  });
}

export function getUserList(params: any) {
  return defHttp.get({
    url: userConst.USER_LIST,
    params,
  });
}

export function changeUserStatus(params: any) {
  return defHttp.post({
    url: userConst.USER_CHANGE_STATUS,
    params,
  });
}
