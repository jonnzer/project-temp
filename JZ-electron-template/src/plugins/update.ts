import { BrowserWindow, ipcMain } from 'electron'
const fs = require('fs-extra')
const path = require('path')
const events = require('events')
const { autoUpdater } = require('electron-updater')
const serverUrl = process.env.VUE_APP_PACKAGE // 安装包服务器地址
// 清理安装目录，避免检测无效
const updatePendingPath = path.join(autoUpdater.app.baseCachePath, 'ai-gold-class/pending')
fs.emptyDir(updatePendingPath)

class Updater extends events {
  constructor (mainWin: BrowserWindow) {
    super()
    this.win = mainWin
    this.init()
  }

  // 检测系统更新
  private init () {
    // 设置是否自动下载，默认是true,当点击检测到新版本时，会自动下载安装包，所以设置为false
    autoUpdater.autoDownload = false
    // 安装默认退出
    autoUpdater.autoInstallOnAppQuit = true
    // 设置要检测更新的路径，配置线上服务器地址
    if (process.platform === 'darwin') {
      autoUpdater.setFeedURL(`${serverUrl}/darwin`)
    } else {
      autoUpdater.setFeedURL(`${serverUrl}/win32`)
    }
    // 主进程监听检查更新事件
    ipcMain.on('checkForUpdate', () => {
      autoUpdater.checkForUpdates()
    })

    // 主进程监听开始下载事件
    ipcMain.on('downloadUpdate', () => {
      autoUpdater.downloadUpdate()
    })

    // 主进程监听退出并安装事件
    ipcMain.on('quitAndInstall', () => {
      autoUpdater.quitAndInstall()
      this.win.destroy()
    })

    // 开始检测是否有更新
    autoUpdater.on('checking-for-update', () => {
      this.win.webContents.send('checking-for-update')
    })

    // 检测到有可用的更新
    autoUpdater.on('update-available', info => {
      this.win.webContents.send('update-available', info)
    })

    // 没有检测到有可用的更新
    autoUpdater.on('update-not-available', info => {
      this.win.webContents.send('update-not-available', info)
    })

    // 更新出错
    autoUpdater.on('update-error', err => {
      this.win.webContents.send('update-error', err)
    })

    // 下载更新进度
    autoUpdater.on('download-progress', progressObj => {
      this.win.webContents.send('download-progress', progressObj)
    })

    // 下载完成
    autoUpdater.on('update-downloaded', info => {
      this.win.webContents.send('update-downloaded', info)
    })
  }
}
export default Updater
