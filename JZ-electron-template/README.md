# ai-xxxx-client

## 依赖包安装
```
yarn install
```

### 开发环境
```
yarn electron:serve
```

### 测试环境
```
yarn electron:build-test
```

### 生产环境
```
yarn electron:build
```

### 语法修复
```
yarn lint
```

### icon生成
```
yarn electron:build-icon
```

### 目录结构
```
├─build    //icon目录
├─patches  //插件修复包
├─public   //入口模板文件
|─src
│   ├─api    //api
│   ├─assets   //资源文件
│   │  ├─images
│   │  ├─js
│   │  └─style
│   │      ├─font
│   │      └─iconfont
│   ├─components   //组件
│   │  └─play
│   ├─directives   //自定义指令
│   ├─pages       //页面
│   │  └─LaunchPage
│   ├─plugins   //自定义插件
│   ├─router    //路由
│   ├─store     //vuex
│   ├─types     //ts类型
│   ├─utils     //工具包
│   ├─views     //业务页面
│   ├─wins      //窗口
│   ├─background.ts  //electron主入口
│   └─main.ts   //vue入口
|─tsconfig.json   //ts配置文件
└─vue.config.js  //配置文件
```