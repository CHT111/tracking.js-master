// 图片是反着的
function Utils() {

}
Utils.prototype.shakeHead = function (data) {

}
Utils.prototype.isShakeHead = function (resData) {
    var { rightEye, leftEye } = eyeUtils.getEye(resData)
    console.log(leftEye.x,rightEye.x);
}
Utils.prototype.render = function (event, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var resData = event.data
    if (resData.length != 2) { return }
    if (this.isRenderEye(resData)) {
        this.isShakeHead(resData)
        event.data.forEach(function (rect) {
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
    }
}
Utils.prototype.isRenderEye = function (resData) {
    var { rightEye, leftEye } = eyeUtils.getEye(resData)
    document.body.appendChild(`<div>${rightEye.y - leftEye.y}</div>`)
    // 纵向是否有问题
    if (Math.abs(rightEye.y - leftEye.y) > eyeUtils.MAX_Y_OFFSET) {
        return true
    }
    return true
}

function EyeUtils() {
    this.MAX_Y_OFFSET = 15
}
EyeUtils.prototype.getEye = function (data) {
    var rightEye = data[0]
    var leftEye = data[1]
    return { rightEye, leftEye }
}
var eyeUtils = new EyeUtils()
var utils = new Utils()