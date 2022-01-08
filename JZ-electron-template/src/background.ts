'use strict'

import { app, protocol, BrowserWindow, screen, remote, Tray, Menu } from 'electron'
import getFlashPlugin from './plugins/flash'
import { httpServer } from './plugins/server'
import './plugins/logs'
import {
  DESIGN_WIDTH,
  DESIGN_HEIGHT,
  BASE_WIN_WIDTH,
  BASE_WIN_HEIGHT,
  DESIGN_WIDTH_SMALL,
  DESIGN_HEIGHT_SMALL,
  APP_TITLE
} from '@/utils/constant'
// win
import Launch from './wins/launch'
import Main from './wins/main'
import TrayBox from './plugins/tray'

const path = require('path')
const iconPath = path.join(__static, 'icon-desk.png')
// const isDevelopment = process.env.NODE_ENV !== 'production'
const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块
const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
const flashPlugin = getFlashPlugin()
const Store = require('electron-store')
const store = new Store()
let MainPage: Main | null = null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
store.set('dataRoot', STORE_PATH)
console.log('STORE_PATH===', STORE_PATH)

// flash支持
if (flashPlugin) {
  const { pluginPath, version } = flashPlugin
  // 生产处理
  const flashPath = __dirname.includes('.asar')
    ? path.join(process.resourcesPath, '/public/flash', pluginPath)
    : path.join(__static, './flash', pluginPath)
  app.commandLine.appendSwitch('ppapi-flash-path', flashPath)
  app.commandLine.appendSwitch('ppapi-flash-version', version)
}

// 本地服务器
httpServer(STORE_PATH, () => {
  console.log('local server success!')
})

// 创建主窗口
async function createWindow () {
  const bounds = screen.getPrimaryDisplay().bounds
  const winW = Math.floor((bounds.width / BASE_WIN_WIDTH) * DESIGN_WIDTH)
  const winH = Math.ceil((bounds.height / BASE_WIN_HEIGHT) * DESIGN_HEIGHT)
  const winWSm = Math.floor((bounds.width / BASE_WIN_WIDTH) * DESIGN_WIDTH_SMALL)
  const winHSm = Math.ceil((bounds.height / BASE_WIN_HEIGHT) * DESIGN_HEIGHT_SMALL)

  const LaunchPage = new Launch({
    width: winWSm,
    height: winHSm
  })

  LaunchPage.on('show', function () {
    MainPage = new Main({
      width: winW,
      height: winH,
      title: APP_TITLE,
      icon: iconPath,
      webPreferences: {
        plugins: true,
        webSecurity: false,
        webviewTag: true,
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    MainPage.on('show', function () {
      LaunchPage.close()
    })
    // 托盘
    // eslint-disable-next-line no-new
    new TrayBox(MainPage)
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 限制只可以打开一个应用
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (MainPage) {
      if (MainPage.getWindowInstance().isMinimized()) MainPage.getWindowInstance().restore()
      MainPage.getWindowInstance().focus()
    }
  })
}
// ready
app.on('ready', async () => {
  // 主窗口
  createWindow()
})
