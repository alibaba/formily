import { Drawer } from './Drawer'
import { Modal } from './Modal'
import { Popconfirm } from './Popconfirm'
import { Popover } from './Popover'
import { Open } from './Open'
export type { IPopupActions } from './usePopup'

export const Popup = Modal as typeof Modal & {
  Popover: typeof Popover
  Popconfirm: typeof Popconfirm
  Modal: typeof Modal
  Drawer: typeof Drawer
  Open: typeof Open
}

Popup.Drawer = Drawer
Popup.Modal = Modal
Popup.Popconfirm = Popconfirm
Popup.Popover = Popover
Popup.Open = Open

export default Popup
