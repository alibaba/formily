// background.ts - Manifest V3版本
const connections = {}

// 处理扩展程序的连接请求
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === '@formily-devtools-panel-script') {
    const extensionListener = function (message) {
      // 原始的连接事件不包含开发者工具网页的标签页标识符，
      // 所以我们需要显式发送它。
      if (message.name == 'init') {
        connections[message.tabId] = port
        return
      }
      // 其他消息的处理
    }

    // 监听开发者工具网页发来的消息
    port.onMessage.addListener(extensionListener)

    port.onDisconnect.addListener(function (disconnectedPort) {
      port.onMessage.removeListener(extensionListener)
      const tabs = Object.keys(connections)
      for (let i = 0, len = tabs.length; i < len; i++) {
        if (connections[tabs[i]] == port) {
          delete connections[tabs[i]]
          break
        }
      }
    })
  }
})

// 从内容脚本接收消息，并转发至当前标签页对应的开发者工具网页
chrome.runtime.onMessage.addListener(function (request, sender) {
  // 来自内容脚本的消息应该已经设置 sender.tab
  if (sender.tab) {
    const tabId = sender.tab.id
    if (tabId && tabId in connections) {
      connections[tabId].postMessage(request)
    }
  }
  return true
})
