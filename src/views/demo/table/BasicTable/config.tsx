const tableTitle = () => {
  return [
    {
      title: '基础信息',
      // field: 'name',
      // headerTips: '测试headerTip',
      children: [
        {
          title: '姓名',
          field: 'name',
          headerTips: 'cs',
        },
        {
          title: '地址',
          field: 'address',
          headerTips: '2222',
        },
        {
          title: 'number',
          field: 'no',
          headerTips: '2222',
        },
      ],
    },
    {
      title: 'beginTime',
      field: 'beginTime',
      headerTips: ['测试headerTip', '测试headerTip2', '测试headerTip3'],
    },
    {
      title: 'endTime',
      field: 'endTime',
      headerTips: () => {
        return ['endTime', 'endTime222'];
      },
    },
    {
      title: '状态',
      field: 'status',
    },
  ];
};

export { tableTitle };
