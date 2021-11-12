function print(str) {
    str = JSON.stringify(str)
    var dom = document.createElement('div')
    dom.innerHTML = document.innerHTML || '' + ` ${str}`
    document.body.appendChild(dom)
    console.log(str);
}

// 图片是反着的
function Utils() {

}
Utils.prototype.shakeHead = function (data) {

}
Utils.prototype.isShakeHead = function (resData) {
    var { rightEye, leftEye } = eyeUtils.getEye(resData)
}
Utils.prototype.render = function (event, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var resData = event.data
    if (resData.length != 2) { return }
    if (this.isRenderEye(resData)) {
        print(resData);
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

    // 纵向是否有问题
    if (Math.abs(rightEye.y - leftEye.y) > eyeUtils.MAX_Y_OFFSET) {
        return false
    }
    return true
}
Utils.prototype.style = function (data) {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var windowWidth = window.innerWidth
    var finalWidth = windowWidth * .7
    video.setAttribute('width', finalWidth)
    setTimeout(() => {
        var finalHeight = finalWidth * 3 / 4
        // var video = document.getElementById('video');
        // var finalHeight = parseFloat(window.getComputedStyle(video).height)
      
        canvas.setAttribute('width', finalWidth)
        canvas.setAttribute('height', finalHeight)
        canvas.style.left = -(finalWidth - finalHeight) / 2 + 'px'
        video.style.left = -(finalWidth - finalHeight) / 2 + 'px'

        var content = document.querySelector('.demo-container')
        content.style.width = finalHeight + 'px'
        content.style.height = finalHeight + 'px'
    }, 1000);
}
function EyeUtils() {
    this.MAX_Y_OFFSET = 15
}
EyeUtils.prototype.getEye = function (data) {
    var rightEye = data[0]
    var leftEye = data[1]
    if (rightEye.x > leftEye.x) {
        a = rightEye
        rightEye = leftEye
        leftEye = a
    }
    return { rightEye, leftEye }
}
var eyeUtils = new EyeUtils()
var utils = new Utils()