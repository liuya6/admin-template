import { ref } from 'vue';

export function useCount() {
  const count = ref(0);

  function add(num: number) {
    count.value += num;
  }

  return {
    numbers: count,
    add,
  };
}
