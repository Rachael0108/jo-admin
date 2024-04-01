import { withInstall } from 'src/utils/withInstall';
import _Overlay from './Overlay';

export const Overlay = withInstall(_Overlay);
export default Overlay;
export type { OverlayProps } from './Overlay';
export type OverlayThemeVars = {
  overlayZIndex?: number | string;
  overlayBackground?: string;
};
