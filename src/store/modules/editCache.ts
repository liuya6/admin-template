import { defineStore } from 'pinia';
import { store } from '/@/store';

interface EditCacheState {
  taskEdit: any;
  taskGroupEdit: any;
}

export const useEditCacheStore = defineStore({
  id: 'editCache',
  state: (): EditCacheState => ({
    taskEdit: '',
    taskGroupEdit: '',
  }),
  getters: {},
  actions: {
    setTaskEdit(payload: any) {
      this.taskEdit = payload;
    },
    setTaskGroupEdit(payload: any) {
      this.taskGroupEdit = payload;
    },
  },
});

export function useEditCacheStoreWithOut() {
  return useEditCacheStore(store);
}
