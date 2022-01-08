# 小程序通用模板

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### 项目结构
```
├── package.json			  	// npm包配置文件，依赖信息
├── public					     	// 入口文件目录
│   ├── index.html			  	// 项目模板页	
│   └── favicon.ico
├── README.md				       // 项目描述说明文件
├── src						         // 项目代码主目录
│   ├── api					      // 接口请求，统一管理
│   │   └── index.ts			// 接口请求，统一封装axios文件
│   ├── App.vue				    // 根组件
│   ├── static				    // 资源放置目录
│   │   ├── images			  // 图片资源
│   │   ├── icons					
│   │   └── styles			   // 样式目录
│   ├── components			  // 组件目录，根据功能分子目录
│   ├── main.ts				    // 入口js文件
│   ├── store				    // 统一状态管理目录，vuex
│   │   └── index.ts
│   ├── types				    // 类型目录，ts类型
│   ├── utils 			    // 公共js目录
│   └── pages				    // 单页面应用页面文件
├── tsconfig.json				// 统一配置ts目录
└── vue.config.ts			  // vue配置文件
```
