
export default class VNode {
    constructor(tag,//标签类型
                elm,//对应的真实节点
                children,//当前虚拟节点的子节点
                text,//当前虚拟节点中的文本
                data,//VNodeData类型的
                parent,//父级VNode节点
                nodeType,//节点类型
                key,
    ) {
        this.tag = tag;
        this.elm = elm;
        this.children = children;
        this.text = text;
        this.data = data;
        this.parent = parent;
        this.nodeType = nodeType;
        this.key = key;
        this.env = {};
        this.instructions = null;
        this.template = [];
    }
}