const taskConst = {
  // 任务列表
  TASK_LIST: 'admin/task/list',
  TASK_ADD: 'admin/task/add',
  TASK_EDIT: 'admin/task/edit',
  TASK_DELETE: 'admin/task/delete',
  TASK_DETAILS: 'admin/task/detail',
  TASK_SHOW_STATUS: 'admin/task/change/show/status',

  // 任务组
  TASK_GROUP_LIST: 'admin/task/group/list',
  TASK_GROUP_TASK: 'admin/task/list/by/group',
  TASK_GROUP_ADD: 'admin/task/group/add',
  TASK_GROUP_EDIT: 'admin/task/group/edit',
  TASK_GROUP_DELETE: 'admin/task/group/delete',

  //专题任务
  //悬赏大厅-推荐任务组列表
  TASK_TOPIC_RECOMMEND_BOUNTY_LIST: 'admin/special/bounty/recommend/group',
  //悬赏大厅-赏金任务派发列表
  TASK_TOPIC_SEND_BOUNTY_LIST: 'admin/special/bounty/task',
  //悬赏大厅-推荐任务组显示开关
  TASK_TOPIC_RECOMMEND_SHOW_SET: 'admin/special/change/recommend/group/show',
  //悬赏大厅-推荐任务组更改样式
  TASK_TOPIC_RECOMMEND_STYLE_SET: 'admin/special/change/recommend/group/style',
  //悬赏大厅--赏金任务派发编辑
  TASK_TOPIC_SEND_BOUNTY_EDIT: 'admin/special/modify/bounty/task',
  //悬赏大厅-推荐任务组编辑
  TASK_TOPIC_RECOMMEND_BOUNTY_EDIT: 'admin/special/modify/recommend/group',

  //编辑专题名称
  TASK_TOPIC_NAME_EDIT: 'admin/special/modify/name',
  //长期任务-任务列表
  TASK_TOPIC_LONG_LIST: 'admin/special/long/task',
  //长期任务-编辑任务
  TASK_TOPIC_LONG_EDIT: 'admin/special/modify/long/task',

  //每日任务
  TASK_DAILY_CONFIG_GET: 'admin/special/daily/task',
  TASK_DAILY_CONFIG_SET: 'admin/special/daily/task/set',
};

export { taskConst };
