import { defHttp } from '/@/utils/http/axios';
import { taskConst } from './taskConst';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// todo 任务列表
// 列表
export function taskList(params: any) {
  return defHttp.get({
    url: taskConst.TASK_LIST,
    params,
  });
}

// 详情
export function taskDetails(params: any) {
  return defHttp.get({
    url: taskConst.TASK_DETAILS,
    params,
  });
}

// 任务显示开关
export function taskShowStatus(params: any) {
  return defHttp.post({
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    url: taskConst.TASK_SHOW_STATUS,
    params,
  });
}

// 新增任务
export function taskAdd(params: any) {
  return defHttp.post({
    url: taskConst.TASK_ADD,
    params,
  });
}

// 编辑任务
export function taskEdit(params: any) {
  return defHttp.post({
    url: taskConst.TASK_EDIT,
    params,
  });
}

// 删除任务
export function taskDelete(params: any) {
  return defHttp.post({
    url: taskConst.TASK_DELETE,
    params,
  });
}

// todo 任务组
// 列表
export function taskGroupList(params: any) {
  return defHttp.get({
    url: taskConst.TASK_GROUP_LIST,
    params,
  });
}

// 任务组下的任务
export function taskGroupTask(params: any) {
  return defHttp.get({
    url: taskConst.TASK_GROUP_TASK,
    params,
  });
}

// 新增任务组
export function taskGroupAdd(params: any) {
  return defHttp.post({
    url: taskConst.TASK_GROUP_ADD,
    params,
  });
}

// 编辑任务组
export function taskGroupEdit(params: any) {
  return defHttp.post({
    url: taskConst.TASK_GROUP_EDIT,
    params,
  });
}

// 删除任务组
export function taskGroupDelete(params: any) {
  return defHttp.post({
    url: taskConst.TASK_GROUP_DELETE,
    params,
  });
}

export * from './TopicApi';
