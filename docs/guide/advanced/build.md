# 按需打包

## 基于Umi开发

在 Umi@3 中，当插件使用`@umijs` 或者 `umi-plugin` 开头，只要安装就会被默认使用

#### 安装插件
```shell
npm install @umijs/plugin-antd --save-dev
```
或者
```shell
yarn add @umijs/plugin-antd --dev
```

#### 插件配置
```js
export default {
  //antd插件配置
  antd:{ 
    dark: true, //开启暗色主题。
    compact: true,  //开启紧凑主题。
  }
};
```

## 基于create-react-app开发

  首先我们需要对`create-react-app`的默认配置进行自定义，这里我们使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) （一个对 `create-react-app` 进行自定义配置的社区解决方案）。
引入 `react-app-rewired` 并修改 `package.json` 里的启动配置。由于新的 [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) 版本的关系，你还需要安装 [customize-cra](https://github.com/arackaf/customize-cra)。

```shell
$ npm install react-app-rewired customize-cra  --save-dev
```
或者
```shell
$ yarn add react-app-rewired customize-cra --dev
```

修改 `package.json`
```diff
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```
然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```
#### 安装 babel-plugin-import

```shell
npm install babel-plugin-import --save-dev
```
或者
```shell
yarn add babel-plugin-import --dev
```

修改`config-overrides.js`

```diff
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```


## 在Webpack中使用

#### 安装 babel-plugin-import

```shell
npm install babel-plugin-import --save-dev
```
或者
```shell
yarn add babel-plugin-import --dev
```

修改 `.babelrc` 或者 babel-loader

```json
{
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "lib"}]
  ]
}
```

更多配置请参考 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
