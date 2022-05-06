const SysSettingConst = {
  //获取腾讯云 token
  TX_COS_TOKEN: 'api/cos/security/token',

  //设置系统配置
  SETTING_CONFIG_SET: 'api/admin/sys/config/set',

  //获取系统配置
  SETTING_CONFIG_GET: 'api/admin/sys/config/get',

  //添加人员
  ADD_SYS_ACCOUNT: 'api/admin/sys/account/add',
  //删除账户
  DEL_SYS_ACCOUNT: 'api/admin/sys/account/delete',
  //编辑账户
  EDIT_SYS_ACCOUNT: 'api/admin/sys/account/edit',
  //账户列表
  SYS_ACCOUNT_LIST: 'api/admin/sys/account/list',
  //查看账户的角色
  GET_SYS_ACCOUNT_ROLES: 'api/admin/sys/account/roles',

  //添加角色
  ADD_SYS_ROLE: 'api/admin/sys/role/add',
  //编辑角色
  EDIT_SYS_ROLE: 'api/admin/sys/role/edit',
  //删除角色
  DEL_SYS_ROLE: 'api/admin/sys/role/delete',
  //角色列表
  GET_SYS_ROLE_LIST: 'api/admin/sys/role/list',
  //查看角色所拥有的权限
  GET_SYS_ROLE_PERMISSIONS: 'api/admin/sys/role/permissions',

  //权限树
  GET_SYS_PERMISSIONS_TREE: 'api/admin/sys/permission/tree',

  // 风控日志
  SYSTEM_RISK_LIST: 'api/admin/log/list',

  // ip限制
  SYSTEM_IP_LIMIT_LIST: 'api/admin/ip/black/list',
  SYSTEM_IP_LIMIT_ADD: 'api/admin/ip/black/add',
  SYSTEM_IP_LIMIT_EDIT: 'api/admin/ip/black/edit',
  SYSTEM_IP_LIMIT_DELETE: 'api/admin/ip/black/del',
  SYSTEM_IP_LIMIT_CONFIG: 'api/admin/ip/limit/config',
  SYSTEM_IP_LIMIT_CONFIG_SET: 'api/admin/ip/set/limit/config',

  // 意见反馈
  SYSTEM_FEEDBACK_LIST: 'api/admin/feedback/list',
  SYSTEM_FEEDBACK_HANDLE: 'api/admin/feedback/handle',

  // 版本更新
  SYSTEM_VERSION_CONFIG: 'api/admin/version/list',
  SYSTEM_VERSION_CONFIG_SET: 'api/admin/version/add',
};

export { SysSettingConst };
