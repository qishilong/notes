function getStyle (obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj,false)[attr];
    }
}
        
function startMove (obj, json, callblack) {
    clearInterval(obj.timer);
    var iSpeed;
    var iCur;
    var name;
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {                            
            if (attr === 'opacity') {                                
                name = attr;
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            }else {
                iCur = parseInt(getStyle(obj, attr));
            }                            
            iSpeed = (json[attr] - iCur) / 7;
            if (iSpeed > 0) {
                iSpeed = Math.ceil(iSpeed);
            }else {
                iSpeed = Math.floor(iSpeed);
            }
            if (attr === 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (json[attr] - iCur !== 0) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            callblack();
        }
    }, 30);
}   