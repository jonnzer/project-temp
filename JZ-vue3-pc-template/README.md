# Vue3+Vite+ElementPlus模板

## Project setup
```
yarn 
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for test
```
yarn run build:test
```

### Compiles and minifies for production
```
yarn run build
```
### project preview

```
yarn run preview
```

### 项目结构
```
├── .env.development			// 开发环境配置
├── .env.production			  // 生产环境配置
├── .env.test			        // 测试环境配置
├── package.json			  	// npm包配置文件，依赖信息
├── public					     	// 入口文件目录
│   └── favicon.ico
├── README.md				       // 项目描述说明文件
├── src						         // 项目代码主目录
│   ├── api					      // 接口请求，统一管理
│   │   └── index.ts			// 接口请求，统一封装axios文件
│   ├── App.vue				    // 根组件
│   ├── assets				    // 资源放置目录
│   │   ├── images			  // 图片资源
│   │   ├── js					
│   │   └── styles			   // 样式目录，reset.scss、iconfont.scss等
│   ├── components			  // 组件目录，根据功能分子目录
│   ├── main.ts				    // 入口js文件
│   ├── router				    // 统一配置路由规则
│   │   └── index.ts
│   ├── store				    // 统一状态管理目录，vuex
│   │   └── index.ts
│   ├── types				    // 类型目录，ts类型
│   ├── utils 			    // 公共js目录
│   └── views				    // 单页面应用页面文件
├── static						  // 静态资源，未引用不会被打包
├── index.html			  	// 项目模板页
├── tsconfig.json				// 统一配置ts目录
└── vite.config.ts			// vite配置文件
```
