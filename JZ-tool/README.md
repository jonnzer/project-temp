# JZ-tool
```
JZ-tool：轻量级的通用工具库，包括日期转换、类型判断、常用方法等，类似lodash.js、moment.js、day.js。
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build:esm 编译出符合 esm 规范的可执行文件，供 Vue、React 等采用 esmodule 规范进行模块化打包的项目使用
npm run build:umd 编译出符合 umd 规范的可执行文件，供 Vue、NodeJS 等项目使用
npm run build:min 编译出符合 umd 规范的压缩的可执行文件
npm run build
```

### Run your unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### use the tool
```
npm i -D JZ-tool
example: import { dateFormat } from 'JZ-tool'
```

### 项目结构
```
├── .babelrc				    // babel配置文件
├── package.json				// npm包配置文件，依赖信息
├── rollup.config.js			// rollup打包配置
├── tsconfig.json			    // ts配置文件

```
## 方法函数说明
<details>
<summary>dateFormat  时间、日期格式化</summary>
<pre><code>
@param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
@param {Date} date 日期对象
@return {string} fmt 指定时间格式字符串
</code></pre>
</details>

<details>
<summary>dateStringFormat  时间、日期格式化，修复iOS日期转换上的bug, 处理带T的时间格式</summary>
<pre><code>
@param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
@param {string} date 日期字符串
@return {string} fmt 指定时间格式字符串
</code></pre>
</details>

<details>
<summary>timestampFormat  时间、日期格式化</summary>
<pre><code>
@param {string} fmt 时间格式，示例 'YY-mm-dd HH:MM:SS'
@param {number} timestamp 时间戳
@return {string} fmt 指定时间格式字符串
</code></pre>
</details>

<details>
<summary>hasOwn  判断对象是否存在属性</summary>
<pre><code>
@param {object} val 对象
@param {string | symbol} key 属性
@return {boolean} 对象是否存在该属性
</code></pre>
</details>

<details>
<summary>toNumber 转换成数字</summary>
<pre><code>
@param {any} val 一般是字符串或数字
@return {number} 数字
</code></pre>
</details>

<details>
<summary>remove 删除数组内元素(元素可以是number、string，非object)</summary>
<pre><code>
@param {T[]} arr 数组对象
@param {T} el 数组内元素
@return without 直接修改arr
</code></pre>
</details>

<details>
<summary>throttle 节流函数</summary>
<pre><code>
@param {Function} fn 函数方法
@param {number} duration 节流间隔时长
</code></pre>
</details>

<details>
<summary>debounce 防抖函数</summary>
<pre><code>
@param {Function} fn 函数方法
@param {number} delay 防抖间隔时长
</code></pre>
</details>

<details>
<summary>formatSize 格式化文件大小</summary>
<pre><code>
@param {any} value 文件大小
@return {string} size 格式化后的文件大小字符串
</code></pre>
</details>

<details>
<summary>padZero 数字或字符串补0</summary>
<pre><code>
@param {number | string} num 数字或字符串
@param {number = 2} targetLength 补0长度
@return {string} str 补0后的字符串
</code></pre>
</details>

<details>
<summary>getUuid 获取UUID，用于文件上传生成随机文件名等</summary>
<pre><code>
@return {string} str 生成后的36位字符串
</code></pre>
</details>

<details>
<summary>downLoadFile 下载(避免浏览器拦截)，打开新窗口</summary>
<pre><code>
@param {string} url 下载链接
@param {string} name 下载保存的文件名称
</code></pre>
</details>

<details>
<summary>downLoadFileFrame 下载(避免浏览器拦截)，不打开新窗口下载</summary>
<pre><code>
@param {string} url 下载链接
@param {string} name 下载保存的文件名称
</code></pre>
</details>

<details>
<summary>filterInput 输入安全过滤</summary>
<pre><code>
@param {string} s 需要过滤的输入字符串
@param {string} s 过滤后的字符串
</code></pre>
</details>

<details>
<summary>deepAssign 合并两个对象，相同属性，后面的会覆盖前面的</summary>
<pre><code>
@param {ObjectIndex} to 需要合并的对象
@param {ObjectIndex} from 需要合并的对象
@return {ObjectIndex} to 合并后的对象
</code></pre>
</details>

<details>
<summary>deepClone 深拷贝</summary>
<pre><code>
@param {Record<string, any>} obj 需要拷贝的对象
@return {Record<string, any>} obj 拷贝出来的对象
</code></pre>
</details>

<details>
<summary>validate 类型判断或转换系列函数，包括（isDate、isArray、isiOS、isWx等）</summary>
<pre><code>
objectToString 原型toString方法
toTypeString 转换成字符串
isArray 判断是否数组
isNumeric 判断是否数字
isMap 判断是否Map
isSet 判断是否Set
isFunction 判断是否是函数
isString 判断是否字符串
isSymbol 判断是否原始数据类型
isObject 判断是否对象
isPromise 判断是否Promise函数
isDef 判断对象是否定义
isDate 判断是否是日期
isEmail 判断是否是邮箱
isMobile 判断是否手机号
isNaN 判断是否NaN
isiOS 判断是否iOS系统
isAndroid 判断是否Android系统
isWx 判断是否微信环境
isPC 判断是否PC环境
rules {
    digits,     // 纯数字
    letters,    // 纯字母
    date,       // 请填写有效的日期，格式:yyyy-mm-dd
    time,       // 请填写有效的时间，00:00到23:59之间
    email,      // 请填写有效的邮箱  
    url,        // 请填写有效的网址
    qq,         // 请填写有效的QQ号
    IDcard,     // 请填写正确的身份证号码
    tel,        // 办公或家庭电话,请填写有效的电话号码
    mobile,     // 移动电话
    zipstatus,  // 请检查邮政编码格式
    chinese,    // 请填写中文字符
    username,   // 请填写3-12位数字、字母、下划线, 用户名
    password,   // 请填写6-16位字符，不能包含空格, 密码
    strongPwd,  // 请填写8-16位字符，必须包含数字，字母
    code,       // 请填写6-10验证码
    code4,      // 请填写4-10验证码
}
</code></pre>
</details>

<details>
<summary>addUnit 添加px单位</summary>
<pre><code>
@param {string | number} value 添加单位的字符串或数字
@return {string | undefined} str 返回带px的字符串
</code></pre>
</details>

<details>
<summary>unitToPx 计算转换适配的单位to px</summary>
<pre><code>
@param {string | number} value 带rem、vm、vh的单位数字或字符串
@return {string | undefined} int 返回转换后的数字
</code></pre>
</details>