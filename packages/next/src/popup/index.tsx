import { Drawer } from './Drawer'
import { Dialog } from './Dialog'
import { Balloon } from './Balloon'
import { Open } from './Open'
export type { IPopupActions } from './usePopup'

export const Popup = Dialog as typeof Dialog & {
  Balloon: typeof Balloon
  Dialog: typeof Dialog
  Drawer: typeof Drawer
  Open: typeof Open
}

Popup.Drawer = Drawer
Popup.Dialog = Dialog
Popup.Balloon = Balloon
Popup.Open = Open

export default Popup
