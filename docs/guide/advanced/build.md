# Pack on Demand

## Based on Umi Development

#### Install `babel-plugin-import`

```shell
npm install babel-plugin-import --save-dev
```

or

```shell
yarn add babel-plugin-import --dev
```

#### Plugin Configuration

Modify `.umirc.js` or `.umirc.ts`

```js
export default {
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
    ],
    [
      'babel-plugin-import',
      { libraryName: '@formily/antd', libraryDirectory: 'esm', style: true },
    ],
  ],
}
```

## Based on Create-react-app Development

First, we need to customize the default configuration of `create-react-app`, here we use [react-app-rewired](https://github.com/timarney/react-app-rewired) （A community solution for custom configuration of `create-react-app`)
Introduce `react-app-rewired` and modify the startup configuration in `package.json`. Due to the new [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) version, you also need to install [customize-cra](https://github.com/arackaf/customize-cra).

```shell
$ npm install react-app-rewired customize-cra  --save-dev
```

or

```shell
$ yarn add react-app-rewired customize-cra --dev
```

modify `package.json`

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

Then create a `config-overrides.js` in the project root directory to modify the default configuration.

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config
}
```

#### Install babel-plugin-import

```shell
npm install babel-plugin-import --save-dev
```

or

```shell
yarn add babel-plugin-import --dev
```

modify `config-overrides.js`

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
+     style: true
+   }),
+   fixBabelImports('import', {
+     libraryName: '@formily/antd',
+     libraryDirectory: 'esm',
+     style: true
+   }),
+ );
```

## Use in Webpack

#### Install babel-plugin-import

```shell
npm install babel-plugin-import --save-dev
```

or

```shell
yarn add babel-plugin-import --dev
```

Modify `.babelrc` or babel-loader

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ],
    [
      "import",
      {
        "libraryName": "@formily/antd",
        "libraryDirectory": "esm",
        "style": true
      }
    ]
  ]
}
```

For more configuration, please refer to [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
