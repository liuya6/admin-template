import { defineStore } from 'pinia';
import { store } from '/@/store';
import { AppInfoState } from '/#/store';

export interface AppListState {
  state: AppInfoState;
}

export const useAppListStateStore = defineStore({
  id: 'AppListInfoStateStore',
  state: (): AppListState => ({
    state: {
      id: 0,
    },
  }),
  getters: {
    getState(): Nullable<AppInfoState> {
      return this.state || {};
    },
  },
  actions: {
    setState(info: AppInfoState) {
      this.state = info;
    },
  },
});

export function appListStateStoreWithOut() {
  return useAppListStateStore(store);
}
