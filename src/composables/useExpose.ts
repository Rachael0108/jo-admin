/**
 * @useExpose:用于将API暴露给组件实例
 * *
 * */
import { getCurrentInstance } from 'vue';
import { extend } from '@/utils/basic';

// expose public api
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy as object, apis); // 把 apis的属性扩展到 实例代理对象上， 便于访问
  }
}
