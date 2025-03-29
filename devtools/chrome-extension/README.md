# Formily DevTools

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## 🚀 Getting Started

### Development Setup

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start the development server**:
   ```bash
   yarn run dev
   ```

3. **Load the extension in your browser**:
   • For Chrome (Manifest V3):
     Navigate to `build/chrome-mv3-dev` using your browser's extension developer mode


Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

### 🔥 Hot Reload Notes

**Special Case for webAccessibleResources/backend.ts**:
```bash
# After modifying webAccessibleResources/backend.ts
# 1. Stop the dev server (Ctrl+C)
# 2. Rerun the dev command to pick up changes:
yarn run dev
```

This is due to Plasmo's limitations.

## Making production build

Run the following:

```bash
# Build the extension for production
yarn run build

# Package the extension into zip file for distribution
yarn run package
```

This should create a production bundle for your extension, ready to be published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
