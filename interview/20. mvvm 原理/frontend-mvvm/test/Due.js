const arrayProto = Array.prototype // 获取Array的原型

function defArrayFunc (obj, func, prop) {
    var vueObj = this;
    Object.defineProperty(obj, func, {
        enumerable: true,
        configurable: true,
        value: function(...args) {
            let original = arrayProto[func];
            const result = original.apply(this, args);
            var virtualDomList = vueObj.templateMapping["{{" + prop + "}}"];
            if (virtualDomList) {
                for (var virtualDom of virtualDomList) {
                    renderDom.call(vueObj, virtualDom);
                }
            }
            return result;
        }
    });
}

function proxyArr(arr, prop) {
    let obj = {
        eleType: "Array",
        toString: function() {
            var result = "";
            for (var i = 0 ; i < arr.length ; i ++) {
                result += arr[i] + ", "
            }
            return result.substring(0, result.length - 2);
        },
        push() {},
        pop() {},
        shift() {},
        unshift() {}
    }
    defArrayFunc.call(this, obj, 'push', prop);
    defArrayFunc.call(this, obj, 'pop', prop);
    defArrayFunc.call(this, obj, 'shift', prop);
    defArrayFunc.call(this, obj, 'unshift', prop);
    arr.__proto__ = obj;
    return arr;
}

function constructProxy(obj) {
    let vueObj = this;
    var proxyObj = {};
    for(let prop in obj) {
        if (obj[prop] instanceof Array) {
            proxyObj[prop] = proxyArr.call(vueObj, obj[prop], prop);
        }
        Object.defineProperty(proxyObj, prop, {
            configurable: true,
            get: function () {
                return obj[prop];
            },
            set: function (value) {
                obj[prop] = value;
                var virtualDomList = vueObj.templateMapping["{{" + prop + "}}"];
                if (virtualDomList) {
                    for (var virtualDom of virtualDomList) {
                        renderDom.call(vueObj, virtualDom);
                    }
                }
            }
        });
    };
    return proxyObj;
}

function VirtualDom(dom, childs, vueObj) {
    this.realDom = dom;
    this.childs = childs;
    this.nodeType = dom.nodeType;
    this.contentStr = "";
    this.templates = [];
    if (this.nodeType == 3) {
        this.contentStr = dom.nodeValue;
    }
    if (this.nodeType == 1 && dom.getAttribute("v-model")) {
        if (dom.localName == "input") {
            dom.oninput = function () {
                console.log(vueObj,dom.value);
                vueObj.data[dom.getAttribute("v-model")] = dom.value;
            }
        }
    }
}

function analysisVirtualDomTree(dom) {
    var childs = [];
    for (var node of dom.childNodes){
        let tempChild = analysisVirtualDomTree.call(this, node);
        childs.push(tempChild);
    }
    var result = new VirtualDom(dom, childs, this);
    return result;
}

function analysisTemplate(virtualDom, templateMapping) {
    if (virtualDom.nodeType == 3) {
        var templates = virtualDom.realDom.nodeValue.match(/{{[a-zA-Z0-9_]+}}/g);
        if (templates && templates.length > 0) {
            virtualDom.templates = templates;
            for (var temp of templates) {
                if (!templateMapping[temp]) {
                    templateMapping[temp] = [];
                }
                templateMapping[temp].push(virtualDom);
            }
        }
    }
    for (var vDom of virtualDom.childs) {
        analysisTemplate(vDom, templateMapping);
    }
}

function renderDom(virtualDom) {
    if (virtualDom.nodeType == 3) {
        var result = virtualDom.contentStr;
        for (var template of virtualDom.templates) {
            var data = this.data[template.substring(2, template.length - 2)];
            if (data != null) {
                result = result.replace(template, data);
            }
        }
        virtualDom.realDom.nodeValue = result;
    } else {
        for (var vDom of virtualDom.childs) {
            renderDom.call(this, vDom);
        }
    }
}

function render() {
    renderDom.call(this, this.virtualDomRoot);
}

function Due(options) {
    this.el = document.getElementById(options.el);
    this.virtualDomRoot = analysisVirtualDomTree.call(this, this.el);
    this.templateMapping = {};
    analysisTemplate(this.virtualDomRoot, this.templateMapping);
    this.data = constructProxy.call(this, options.data, renderDom);
    render.call(this);
}
