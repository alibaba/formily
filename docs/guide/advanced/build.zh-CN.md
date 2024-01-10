# 按需打包

## 基于 Umi 开发

#### 安装 `babel-plugin-import`

```shell
npm install babel-plugin-import --save-dev
```

或者

```shell
yarn add babel-plugin-import --dev
```

#### 插件配置

修改 `.umirc.js`或 `.umirc.ts`

```js
export default {
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
    [
      'babel-plugin-import',
      { libraryName: '@formily/antd', libraryDirectory: 'esm', style: true },
      '@formily/antd',
    ],
  ],
}
```

## 基于 create-react-app 开发

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
  return config
}
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
+   fixBabelImports('antd', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: true
+   }),
+   fixBabelImports('@formily/antd', {
+     libraryName: '@formily/antd',
+     libraryDirectory: 'esm',
+     style: true
+   }),
+ );
```

## 在 Webpack 中使用

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
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      },
      "antd"
    ],
    [
      "import",
      {
        "libraryName": "@formily/antd",
        "libraryDirectory": "esm",
        "style": true
      },
      "@formily/antd"
    ]
  ]
}
```

更多配置请参考 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
