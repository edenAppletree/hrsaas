// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到DOM中时
  inserted: function (el, {value}) {
    // 聚焦元素
    //  监听img标签的错误事件  因为图片加载失败 会触发  onerror事件
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },

  // 指令所绑定的元素更新时触发
  update(el,{value}) {
    if (!el.src) {
      el.src= value
    }
  }
}
