import { ref, reactive, withKeys, defineComponent, type PropType, type ExtractPropTypes } from 'vue'
import { callInterceptors, numericProp } from 'src/utils';
import { extend } from 'src/utils/basic';
import { Popup } from 'vant';

export const dialogProps = extend({}, {
  title: String,
  width: numericProp,

})
export default defineComponent({
  name: 'dialog',
  props: dialogProps,
  emits: [ 'confirm', 'cancel', 'keydown', 'update:show' ],

  setup(props, { emits, slots }) {

    return () => {
      const { width, title, theme, message, className } = props;
      return (
        <Popup
        >
        </Popup>
      )
    }
  }
})
