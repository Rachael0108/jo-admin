import {onMounted, onUnmounted, watch, defineComponent} from 'vue'
import './index.scss'
import { makeNumberProp } from 'src/utils/basic'

export const toastProps = {
  show: Boolean,
  message: String,
  duration: makeNumberProp(2000),
  closeOnClick: Boolean,
}
export default defineComponent({
  name: 'Toast',
  props: toastProps,

  emits: ['update:show'],

  setup(props, { emit, slots }){
    let timer: ReturnType<typeof setTimeout>;
    let clickable = false

    const toggleClickable = () => {
      const newValue = props.show
      if (newValue !== clickable) {
        clickable = newValue
      }
    }
    const onClick = () => {
      if(props.closeOnClick) {
        updateShow(false)
      }
    }
    const updateShow = (show: boolean) => {
      emit('update:show', show)
    }
    const clearTimer = () => clearTimeout(timer);

    const renderMessage = () => {
      const { message } = props
      if(slots.message) {
        return <div class={'toast-text'}>{slots.message()}</div>
      }
      if (message !== '') {
        return (
          <div class={'toast-text'}>{message}</div>
        )
      }
    }
    watch(() => [props.show], toggleClickable)

    watch(
      () => [props.show, props.message, props.duration],
      () => {
        clearTimer();
        if(props.show && props.duration > 0) {
          timer = setTimeout(() => {
            updateShow(false)
          }, props.duration);
        }
      }
    )

    onMounted(toggleClickable)
    onUnmounted(toggleClickable)

    return () => (
      <div
        class={'popup-transition'}
        v-show={props.show}
      >
        {renderMessage()}
      </div>
    )
  }
})
