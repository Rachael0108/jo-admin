import {CSSProperties} from 'vue'
import {Numeric} from '@/utils/basic'

const camelizeRE = /-(\w)/g;
export const camelize = (str: string): string =>
  str.replace(camelizeRE, (_, c) => c.toUpperCase())

export function getZIndexStyle(zIndex?: Numeric) {
  const style: CSSProperties = {};
  if(zIndex !== undefined) {
    style.zIndex = +zIndex
  }
  return style;
}
