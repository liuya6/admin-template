import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { OperationConst } from '/@/api/operation/OperationConst';

// 开屏广告
export function addAdInfo(params?: {}) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: OperationConst.ADD_AD_INFO,
    params,
  });
}

// 用户分析 明细数据
export function getUserAnalyzeDetails(params: any) {
  return defHttp.get({
    url: OperationConst.OPERATION_USER_ANALYZE_DETAILS,
    params,
  });
}

// 用户分析 曲线图
export function getUserAnalyzeChart(params: any) {
  return defHttp.get({
    url: OperationConst.OPERATION_USER_ANALYZE_CHART,
    params,
  });
}

// 留存分析
export function getKeepAnalyzeList(params: any) {
  return defHttp.get({
    url: OperationConst.OPERATION_KEEP_ANALYZE_LIST,
    params,
  });
}
