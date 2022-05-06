import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      name: '@cname()',
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/getSelectList',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(demoList);
    },
  },
] as MockMethod[];
