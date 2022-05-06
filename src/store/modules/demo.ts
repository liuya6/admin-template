import { defineStore } from 'pinia';
import { store } from '/@/store';

interface DemoState {
  countA: number;
  countB: number;
}

export const useDemoStore = defineStore({
  id: 'demoStore',
  state: (): DemoState => ({
    countA: 1,
    countB: 2,
  }),
  getters: {
    getSum(): Nullable<number> {
      return this.countA + this.countB;
    },
  },
  actions: {
    setCountA(num: number) {
      this.countA += num;
    },
  },
});

export function userDemoStoreWithOut() {
  return useDemoStore(store);
}
