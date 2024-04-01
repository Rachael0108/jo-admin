import { ref, watch, WatchSource } from 'vue';
import { JSX } from 'vue/jsx-runtime';

export function useLazyRender(show: WatchSource<boolean | undefined>) {
  const inited = ref(false)

  watch(
    show,
    (value) => {
      if(value) {
        inited.value = value
      }
    },
    { immediate: true },
  );

  // 高阶函数： 返回一个render函数，render函数返回的类型是 JSX.Element
  return (render: () => JSX.Element) => () => (inited.value ? render() : null);
}
