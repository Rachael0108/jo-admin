import CsToast from './Toast'
import {ToastOptions} from 'vant'
import {ToastWrapperInstance} from 'vant/es/toast/types'
import { extend, isObject, inBrowser } from 'src/utils/basic';
import { mountComponent, usePopupState } from 'src/utils/mount-component';
import {watch, ref, getCurrentInstance} from 'vue';

const defaultOptions: ToastOptions = {
  message: '',
  onClose: undefined,
  onOpened: undefined,
  position: 'middle',
  duration: 2000,
  closeOnClick: false,
}

let queue: ToastWrapperInstance[] = []
let allowMultiple = false;
let currentOptions = extend({}, defaultOptions);

function parseOptions(message: string | ToastOptions): ToastOptions {
  if(isObject(message)) {
    return message;
  }
  return { message };
}

function createInstance() {
  const { instance, unmount } = mountComponent({
    setup(){
      const message = ref('');
      const { open, state, close, toggle } = usePopupState();
      const onClosed = () => {
        if(allowMultiple) {
          queue = queue.filter((item) => item !== instance)
          unmount()
        }
      }

      const render = () => {
        const attrs: Record<string, unknown> = {
          onClosed,
          'onUpdate:show': toggle,
        };
        return <CsToast {...state} {...attrs}/>
      }

      watch(message, (val) => {
        state.message = val
      });

      (getCurrentInstance() as any).render = render;

      return {
        open,
        close,
        message,
      }
    }
  });
  return instance as ToastWrapperInstance;
}

function getInstance() {
  if(!queue.length || allowMultiple) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
}

export function showToast(options: string | ToastOptions) {
  if(!inBrowser) {
    return {} as ToastWrapperInstance;
  }
  const toast = getInstance();
  const parsedOptions = parseOptions(options);

  toast.open(
    extend(
      {},
      currentOptions,
      parsedOptions,
    )
  )
  return toast;
}
