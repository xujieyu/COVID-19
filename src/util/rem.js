// rem等比适配配置文件
// 基准大小
const baseSize = 16
function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
};
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
    document.documentElement.style.fontSize = (deviceWidth / 50) + 'px';
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
    document.documentElement.style.fontSize = (deviceWidth / 30) + 'px';
  }


}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}