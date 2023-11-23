import {getValue} from "../util/ObjectUtil.js";

let template2Vnode = new Map();
let vnode2Template = new Map();

export function renderMixin(Due) {
    Due.prototype._render = function () {
        renderNode(this, this._vnode);
    }
}

export function renderData(vm, data) {
    let vnodes = template2Vnode.get(data);
    if (vnodes != null) {
        for (let i = 0 ; i < vnodes.length ; i ++) {
            renderNode(vm, vnodes[i]);
        }
    }
}

export function renderNode(vm, vnode) {
    if (vnode.nodeType == 3) {
        let templates = vnode2Template.get(vnode);
        if (templates) {
            let result = vnode.text;
            for (let i = 0 ; i < templates.length ; i ++) {
                let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
                if (templateValue) {
                    result = result.replace("{{" + templates[i] + "}}", templateValue);
                }
            }
            vnode.elm.nodeValue = result;
        }
    } else if (vnode.nodeType == 1 && vnode.tag == "INPUT") {
        let templates = vnode2Template.get(vnode);
        if (templates) {
            for (let i = 0 ; i < templates.length ; i ++) {
                let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
                if (templateValue) {
                    vnode.elm.value = templateValue;
                }
            }
        }
    } else {
        for (let i = 0 ; i < vnode.children.length ; i ++) {
            renderNode(vm, vnode.children[i]);
        }
    }
}

export function prepareRender(vm, vnode) {
    if (vnode == null) {
        return;
    }
    if (vnode.nodeType == 3) {//如果当前是文本，则解析是否存在模板
        analysisTemplateString(vnode);
    }
    if (vnode.nodeType == 0) {
        setTemplate2Vnode("{{" + vnode.data + "}}", vnode);
        setVnode2Template("{{" + vnode.data + "}}", vnode);
    }

    analysisAttr(vm, vnode);

    for (let i = 0 ; i < vnode.children.length ; i ++) {
        prepareRender(vm, vnode.children[i]);
    }
}

function analysisTemplateString(vnode) {
    let templateStrList = vnode.text.match(/{{[a-zA-Z0-9_.]+}}/g);
    for (let i = 0 ; templateStrList && i < templateStrList.length ; i ++) {
        setTemplate2Vnode(templateStrList[i], vnode);
        setVnode2Template(templateStrList[i], vnode);
    }
}

function setTemplate2Vnode(template, vnode) {
    let templateSet = template2Vnode.get(getTemplateName(template));
    if (templateSet) {
        templateSet.push(vnode);
    } else {
        template2Vnode.set(getTemplateName(template), [vnode]);
    }
}

function setVnode2Template(template, vnode) {
    let vnodeSet = vnode2Template.get(vnode);
    if (vnodeSet) {
        vnodeSet.push(getTemplateName(template));
    } else {
        vnode2Template.set(vnode, [getTemplateName(template)]);
    }
}

function getTemplateName(text) {
    return text.substring(2, text.length - 2);
}

function getTemplateValue(objs, templateName) {
    for (let i = 0 ; i < objs.length ; i ++) {
        let temp = getValue(objs[i], templateName);
        if (temp != null) {
            return temp;
        }
    }
    return null;
}

export function getVNodeByTemplate(template) {
    return template2Vnode.get(template);
}

export function clearMap() {
    template2Vnode.clear();
    vnode2Template.clear();
}

function analysisAttr(vm, vnode) {
    if (vnode.nodeType != 1) {
        return;
    }
    let attrNames = vnode.elm.getAttributeNames();
    if (attrNames.indexOf("v-model") > -1) {
        setTemplate2Vnode("{{" + vnode.elm.getAttribute("v-model") + "}}", vnode);
        setVnode2Template("{{" + vnode.elm.getAttribute("v-model") + "}}", vnode);
    }
}