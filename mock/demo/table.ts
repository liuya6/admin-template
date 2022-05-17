import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 60; index++) {
    result.push({
      id: `${index}`,
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      name: '@cname()',
      'no|100000-10000000': 100000,
      'status|1': ['正常', '启用', '停用'],
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/getDemoList',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, limit = 20 } = query;
      return resultPageSuccess(page, limit, demoList);
    },
  },
] as MockMethod[];

export { demoList };
