import { BrowserWindow, WebContents, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const events = require('events')

const winConfig = {
  show: false,
  frame: false,
  focusable: true,
  alwaysOnTop: false,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
}

type configObj = Record<string, unknown>

class Launch extends events {
  constructor (confInfo: configObj) {
    super()
    this.confInfo = confInfo
    this.state = Object.assign({}, winConfig, confInfo)
    this.windowInstance = new BrowserWindow(this.state)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/launchPage`)
    } else {
      createProtocol('app')
      this.windowInstance.loadURL('app://./index.html/#/launchPage')
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
  }

  listenIpc (): void {
    const { width, height } = this.confInfo
    ipcMain.on('move-launch', (event: any, pos: configObj) => {
      this.windowInstance && this.windowInstance.setBounds({ width, height })
      this.windowInstance && this.windowInstance.setPosition(pos.baseX, pos.baseY)
    })
  }

  getWebContents (): WebContents {
    return this.windowInstance.webContents
  }

  getWindowInstance (): BrowserWindow {
    return this.windowInstance
  }

  hide (): void {
    this.windowInstance && this.windowInstance.hide()
  }

  close (): void {
    if (this.windowInstance && this.windowInstance.isVisible()) {
      this.windowInstance.close()
      this.windowInstance = null
    }
  }
}

export default Launch
