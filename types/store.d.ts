import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// 锁屏信息
export interface LockInfo {
  // 要求输入密码
  pwd?: string | undefined;
  // 是否被锁定？
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

export interface AppInfoState {
  company?: string;
  connecter?: string;
  createAt?: number;
  createTime?: string;
  downloadTimes?: number;
  fileSize?: string;
  id?: number;
  logo?: string;
  mobile?: string;
  name?: string;
  packageName?: string;
  remark?: string;
  spreadImage?: string;
  status?: number;
  tag?: string;
  type?: string;
  updateAt?: number;
  updateTime?: string;
  url?: string;
  versionNo?: string;
}
