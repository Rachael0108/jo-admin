import {
  ref,
  Transition,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue';

import { isDef, extend } from 'src/utils/basic';
import { getZIndexStyle } from 'src/utils/format';

import { useEventListener } from '@vant/use';
import { useLazyRender } from 'src/composables/useLazyRender';

import {createNamespace, preventDefault} from 'vant/es/utils'
import {numericProp, unknownProp, truthProp} from 'vant/es/utils'

import './index.scss'

const [name, bem] = createNamespace('overlay');

export const overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: unknownProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object as PropType<CSSProperties>,
}
export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export default defineComponent(
  {
  name,
  props: overlayProps,
  setup(props, {slots}) {
    const root = ref<HTMLElement>();
    const lazyRender = useLazyRender(() => props.show || !props.lazyRender)

    const onTouchMove = (event: TouchEvent) => {
      if(props.lockScroll) {
        preventDefault(event, true)
      }
    }

    const renderOverlay = lazyRender(() => {
      const style: CSSProperties = extend(
        getZIndexStyle(props.zIndex),
        props.customStyle,
      )

      if(isDef(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }

      return (
        <div
          v-show={props.show}
          ref={root}
          style={style}
          class={[props.className]}
        >
          {slots.default?.()}
        </div>
      )
    })

    useEventListener('touchmove', onTouchMove, {
      target: root,
    })

    return () => (
      <Transition v-slots={{ default: renderOverlay }} name="so-fade" appear />
    )
  }
})
