import {extend} from '@/utils/basic'
import {reactive, createApp, Component } from 'vue'
import {useExpose} from '@/composables/useExpose'
export function usePopupState() {
  const state = reactive<{
    show: boolean;
    [key: string]: any;
  }>({
    show: false,
  })

  const toggle = (show: boolean) => {
    state.show = show;
  }
  const open = (props: Record<string, any>) => {
    extend(state, props, {transitionAppear: true})
    toggle(true);
  }
  const close = () => toggle(false);

  useExpose({ open, close, toggle })

  return {
    open,
    close,
    state,
    toggle,
  }
}

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent);
  const root = document.createElement('div');

  document.body.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    },
  };
}
