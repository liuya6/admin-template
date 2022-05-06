import { defHttp } from '/@/utils/http/axios';
import { taskConst } from './taskConst';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 编辑长期任务
export function editLongTask(params: any) {
  return defHttp.post({
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    url: taskConst.TASK_TOPIC_LONG_EDIT,
    params,
  });
}

// 获取长期任务列表
export function getLongTask(params: any) {
  return defHttp.get({
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    url: taskConst.TASK_TOPIC_LONG_LIST,
    params,
  });
}

// 编辑专题名称
export function editTopicTaskName(params: any) {
  return defHttp.post({
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    url: taskConst.TASK_TOPIC_NAME_EDIT,
    params,
  });
}

// 赏金推荐组列表
export function getTopicRecommendList(params: any) {
  return defHttp.get({
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    url: taskConst.TASK_TOPIC_RECOMMEND_BOUNTY_LIST,
    params,
  });
}

// 赏金任务派发列表
export function getTopicSendList(params: any) {
  return defHttp.get({
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    url: taskConst.TASK_TOPIC_SEND_BOUNTY_LIST,
    params,
  });
}
// 悬赏大厅-赏金任务派发编辑
export function editTopicRecommend(params: any) {
  return defHttp.post({
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    url: taskConst.TASK_TOPIC_RECOMMEND_BOUNTY_EDIT,
    params,
  });
}
// 悬赏大厅-推荐任务组编辑
export function editTopicSend(params: any) {
  return defHttp.post({
    headers: {
      'Content-Type': ContentTypeEnum.JSON,
    },
    url: taskConst.TASK_TOPIC_SEND_BOUNTY_EDIT,
    params,
  });
}

// 获取每日任务
export function getDailyConfig() {
  return defHttp.get({
    url: taskConst.TASK_DAILY_CONFIG_GET,
  });
}

// 设置每日任务
export function setDailyConfig(params: any) {
  return defHttp.post({
    url: taskConst.TASK_DAILY_CONFIG_SET,
    params,
  });
}
