import { app, BrowserWindow, Tray, Menu } from 'electron'
import { APP_TITLE } from '@/utils/constant'
const path = require('path')
const iconPath = path.join(__static, 'icon-desk.png')
const events = require('events')
let tray: Tray
/**
 * 系统托盘
 */
class TrayBox extends events {
  constructor (mp: any) {
    super()
    // 创建托盘
    tray = new Tray(iconPath)
    tray.setToolTip(APP_TITLE)
    tray.on('click', () => {
      mp && mp.show()
    })
    // 右键点击图标时，出现的菜单
    tray.on('right-click', () => {
      const menuConfig = Menu.buildFromTemplate([
        {
          label: '退出',
          click: () => {
            this.closeAllWindows()
          }
        }
      ])
      tray.popUpContextMenu(menuConfig)
    })
  }

  // 关闭所有窗口
  closeAllWindows (): void {
    const allwindow = BrowserWindow.getAllWindows()
    // console.log('allwindow :>> ', allwindow)
    //  扫描并关闭除了主窗口外的所有窗口
    try {
      if (allwindow.length) {
        for (let i = 0; i < allwindow.length; i++) {
          if (allwindow[i] && allwindow[i].isVisible()) {
            allwindow[i].close()
          }
        }
        app.quit()
      } else {
        app.quit()
      }
    } catch (error) {
      throw new Error('close all windows error!')
    }
  }
}

export default TrayBox
