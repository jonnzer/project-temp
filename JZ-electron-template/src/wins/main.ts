import { BrowserWindow, ipcMain, WebContents } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import initUpdater from '../plugins/update'
const events = require('events')
const winConfig = {
  show: false,
  frame: false,
  center: true,
  focusable: true,
  alwaysOnTop: false,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
}

type configObj = Record<string, unknown>

class Main extends events {
  constructor (confInfo: configObj) {
    super()
    this.confInfo = confInfo
    this.state = Object.assign({}, winConfig, confInfo)
    this.windowInstance = new BrowserWindow(this.state)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/dashboard`)
      this.windowInstance.webContents.openDevTools()
    } else {
      createProtocol('app')
      this.windowInstance.loadURL('app://./index.html/#/dashboard')
      this.windowInstance.removeMenu() // 去掉菜单栏,防止通过快捷键唤起
    }

    this.init()
  }

  private init () {
    this.windowInstance.once('ready-to-show', () => {
      this.windowInstance.show()
    })

    this.windowInstance.on('show', () => {
      this.emit('show')
    })

    this.listenIpc()
    // 每次启动程序，就检查更新
    // eslint-disable-next-line no-new
    new initUpdater(this.windowInstance)
  }

  listenIpc (): void {
    const { width, height } = this.confInfo
    ipcMain.on('move-main', (event: any, pos: configObj) => {
      this.windowInstance && this.windowInstance.setBounds({ width, height })
      this.windowInstance && this.windowInstance.setPosition(pos.baseX, pos.baseY)
    })
    // 全屏
    ipcMain.on('mainWin:max', () => {
      this.windowInstance.setFullScreen(true)
      this.windowInstance.webContents.send('setScreen', true)
    })
    // 还原
    ipcMain.on('mainWin:min', () => {
      this.windowInstance.setFullScreen(false)
      this.windowInstance.webContents.send('setScreen', false)
    })
    // 隐藏主窗口
    ipcMain.on('mainWin:hide', () => {
      this.windowInstance.hide()
    })
    // 关闭主窗口
    ipcMain.on('mainWin:close', () => {
      this.windowInstance.close()
    })
    // 最大化
    ipcMain.on('mainWin:maximize', () => {
      this.windowInstance.maximize()
    })
    // 最大化恢复
    ipcMain.on('mainWin:restore', () => {
      this.windowInstance.restore()
    })
    // 最小化
    ipcMain.on('mainWin:minimize', () => {
      this.windowInstance.minimize()
    })
  }

  getWebContents (): WebContents {
    return this.windowInstance.webContents
  }

  getWindowInstance (): BrowserWindow {
    return this.windowInstance
  }

  show (): void {
    this.windowInstance && this.windowInstance.show()
  }

  close (): void {
    this.windowInstance && this.windowInstance.close()
  }
}

export default Main
