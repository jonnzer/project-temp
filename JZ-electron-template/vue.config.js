// 引入等比适配插件
const px2rem = require('postcss-px2rem')
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  assetsDir: './',
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        // 预处理器 loader import 样式
        prependData: '@import "~@/assets/style/variables.scss";'
      },
      postcss: {
        plugins: [
          px2rem({
            remUnit: 128
          })
        ]
      }
    }
  },
  devServer: {
    hot: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://192.168.11.44:9811', // 要访问的跨域的域名
        secure: true, // 使用的是http协议则设置为false，https协议则设置为true
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  chainWebpack: config => {
    // // 配置路径别名
    // config.resolve.alias
    // .set('@', resolve('/src'))
    // 压缩响应的app.json返回的代码压缩
    config.optimization.minimize(true)
    const analyer = false
    if (process.env.NODE_ENV === 'production' && analyer) {
      // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: 'com.aiGoldClass',
        productName: 'AI-Gold-Class',
        // eslint-disable-next-line no-template-curly-in-string
        artifactName: 'AI-Gold-Class-${version}.${ext}',
        copyright: 'Copyright © 2021 KingSun',
        publish: [
          {
            provider: 'generic',
            // 安装包服务器地址
            url: process.env.VUE_APP_PACKAGE,
            repo: 'AI-Gold-Class'
          }
        ],
        extraResources: './public/flash/',
        mac: {
          icon: 'build/icons/icon.icns',
          target: ['dmg']
        },
        win: {
          icon: 'build/icons/icon.ico',
          target: [
            {
              target: 'nsis',
              arch: ['x64']
            }
          ]
        },
        asar: true,
        nsis: {
          oneClick: false,
          language: '2052',
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
          installerIcon: 'build/icons/icon.ico',
          uninstallerIcon: 'build/icons/icon.ico',
          installerHeaderIcon: 'build/icons/icon.ico',
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          deleteAppDataOnUninstall: true
          // perMachine: true,
        }
      }
    }
  }
}
