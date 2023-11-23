import VNode from "../vdom/vnode.js";
import {prepareRender, getVNodeByTemplate, renderNode, clearMap} from "./render.js";
import {vforInit, vmodel, checkVBind} from "./grammer/index.js";
import {mergeAttr} from "../util/ObjectUtil.js";
import {checkVOn} from "./grammer/index.js";

export function initMount(Due) {
    
    Due.prototype.$mount = function (el) {
        let vm = this;
        let rootDom = document.getElementById(el);
        mount(this, rootDom);
    }
    
}

export function mount(vm, el) {
    vm._vnode = constructVNode(vm, el, null);
    prepareRender(vm, vm._vnode);
}

function constructVNode(vm, elm, parent) {
    let vnode = analysisAttr(vm, elm, parent);//解决行间属性对内容的影响
    if (vnode == null) {
        let children = [];
        let text = getNodeText(elm);
        let data = null;
        let nodeType = elm.nodeType;
        let tag = elm.nodeName;
        let key = null;
        vnode = new VNode(tag, elm, children, text, data, parent, nodeType, key);//elm, children, text, data, vnode
        if (elm.nodeType == 1 && elm.getAttribute("env")) {
            vnode.env = mergeAttr(vnode.env, JSON.parse(elm.getAttribute("env")));
        } else {
            vnode.env = mergeAttr(vnode.env, parent ? parent.env : {});
        }
    }
    checkVBind(vm, vnode);
    checkVOn(vm, vnode);
    let childs = vnode.nodeType == 0 ? vnode.parent.elm.childNodes : vnode.elm.childNodes;
    let len = vnode.nodeType == 0 ? vnode.parent.elm.childNodes.length : vnode.elm.childNodes.length;
    for (let i = 0 ; i < len ; i ++) {
        let childNodes = constructVNode(vm, childs[i], vnode);
        if (childNodes instanceof VNode) {
            vnode.children.push(childNodes);
        } else {
            vnode.children = vnode.children.concat(childNodes);
        }
    }
    return vnode;
}

function getNodeText(elm) {
    if (elm.nodeType == 3) {
        return elm.nodeValue;
    } else {
        return "";
    }
}

function analysisAttr(vm, elm, parent) {
    if (elm.nodeType == 1) {
        let attrNames = elm.getAttributeNames();
        if (attrNames.indexOf("v-for") > -1) {
            return vforInit(vm, elm.getAttribute("v-for"), elm, parent);
        }
        if (attrNames.indexOf("v-model") > -1) {
            return vmodel(vm, elm, elm.getAttribute("v-model"));
        }
    }
}

export function rebuild(vm, template) {
    let virtualNode = getVNodeByTemplate(template);
    for (let i = 0 ; i < virtualNode.length ; i ++) {
        virtualNode[i].parent.elm.innerHTML = "";
        virtualNode[i].parent.elm.appendChild(virtualNode[i].elm);
        let result = constructVNode(vm, virtualNode[i].elm, virtualNode[i].parent);
        virtualNode[i].parent.children = [result];
        clearMap();
        prepareRender(vm, vm._vnode);
        renderNode(vm, vm._vnode);
    }

}
