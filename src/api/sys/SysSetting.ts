import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { SysSettingConst } from '/@/api/sys/SysSettingConst';
import TxOssx from '/@/utils/txoss';

export function getTxToken(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.TX_COS_TOKEN,
    params,
  });
}

//设置系统配置
export function setSysConfig(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: SysSettingConst.SETTING_CONFIG_SET,
    params,
  });
}

//获取系统配置
export function getSysConfig(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.SETTING_CONFIG_GET,
    params,
  });
}

//上传文件到腾讯云
export async function postFile(file: any, progressFu?: any) {
  return await TxOssx.instance().postFile(file);
}

//添加账户人员
export function addAccount(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: SysSettingConst.ADD_SYS_ACCOUNT,
    params,
  });
}

//删除账户人员
export function delAccount(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: SysSettingConst.DEL_SYS_ACCOUNT,
    params,
  });
}

//编辑账户人员
export function editAccount(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: SysSettingConst.EDIT_SYS_ACCOUNT,
    params,
  });
}

//账户列表
export function getAccountList(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.SYS_ACCOUNT_LIST,
    params,
  });
}

//查看账户角色
export function getAccountRole(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.GET_SYS_ACCOUNT_ROLES,
    params,
  });
}

//角色列表
export function getRoleList(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.GET_SYS_ROLE_LIST,
    params,
  });
}

//添加角色
export function addRole(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: SysSettingConst.ADD_SYS_ROLE,
    params,
  });
}

//编辑角色
export function editRole(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: SysSettingConst.ADD_SYS_ROLE,
    params,
  });
}

//删除角色
export function delRole(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.ADD_SYS_ROLE,
    params,
  });
}

//获取角色下的权限
export function getRolePermission(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.ADD_SYS_ROLE,
    params,
  });
}

//获取角色下的权限
export function getPermissionTree(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: SysSettingConst.GET_SYS_PERMISSIONS_TREE,
    params,
  });
}

// 风控日志
export function getRiskList(params: any) {
  return defHttp.get({
    url: SysSettingConst.SYSTEM_RISK_LIST,
    params,
  });
}

// ip限制列表
export function getIpLimitList(params: any) {
  return defHttp.get({
    url: SysSettingConst.SYSTEM_IP_LIMIT_LIST,
    params,
  });
}

// 新增ip限制
export function addIpLimit(params: any) {
  return defHttp.post({
    url: SysSettingConst.SYSTEM_IP_LIMIT_ADD,
    params,
  });
}

// 编辑ip限制
export function editIpLimit(params: any) {
  return defHttp.post({
    url: SysSettingConst.SYSTEM_IP_LIMIT_EDIT,
    params,
  });
}

// 删除ip限制
export function delIpLimit(params: any) {
  return defHttp.post({
    url: SysSettingConst.SYSTEM_IP_LIMIT_DELETE,
    params,
  });
}

// 获取ip限制配置
export function getIpLimitConfig() {
  return defHttp.get({
    url: SysSettingConst.SYSTEM_IP_LIMIT_CONFIG,
  });
}

// 设置ip限制配置
export function setIpLimitConfig(params: any) {
  return defHttp.post({
    url: SysSettingConst.SYSTEM_IP_LIMIT_CONFIG_SET,
    params,
  });
}

// 版本更新记录
export function getVersionConfig() {
  return defHttp.get({
    url: SysSettingConst.SYSTEM_VERSION_CONFIG,
  });
}

// 意见反馈列表
export function getFeedbackList(params: any) {
  return defHttp.get({
    url: SysSettingConst.SYSTEM_FEEDBACK_LIST,
    params,
  });
}

// 处理意见反馈
export function handleFeedback(params: any) {
  return defHttp.post({
    url: SysSettingConst.SYSTEM_FEEDBACK_HANDLE,
    params,
  });
}

//  版本发布
export function addVersionConfig(params: any) {
  return defHttp.post({
    url: SysSettingConst.SYSTEM_VERSION_CONFIG_SET,
    params,
  });
}
