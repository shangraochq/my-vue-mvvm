import Watcher from './watcher.js';
import {isElementNode, isTextNode, setInnerText, getInnerText } from "./utils/dom.js";
import { getValOfObj, setValOfObj } from "./utils/tool.js";
import { isDirective, isEventDirective } from "./utils/directive.js";
export class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = isElementNode(el) ? el : document.getElementById(el);
        if (this.$el) {
            // 将节点插入到文文档碎片中
            this.$fragment = this.nodeToFragment();
            // 处理节点的指令和插值
            this.compileElement(this.$fragment);
            // 将文档碎片重新插入文档中
            this.$el.appendChild(this.$fragment);
        }
    }
    nodeToFragment() {
        let fragment = document.createDocumentFragment();
        let child = null;
        for (; true;) {
            child = this.$el.firstChild;
            if (child) {
                fragment.appendChild(child);
            } else {
                break;
            }
        }
        return fragment;
    }
    compileElement(node) {
        const childNodes = node.childNodes;
        const reg = /\{\{(.*)\}\}/;
        childNodes.forEach(node => {
            const text = getInnerText(node);
            if (isElementNode(node)) {
                // 处理指令
                this.compile(node);
            } else if (isTextNode(node) && reg.test(text)) {
                // 处理插值
                this.compileText(node, RegExp.$1);
            }
            // node如果还存在子节点，继续copile其子节点
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        });
    }
    compile(node) {
        const nodeAttrs = node.attributes;
        // Array.prototype.forEach.call(this) 写法可以让没有forEach的类数组对象使用forEach方法，
        // 类数组指的是拥有length属性，和一些数字属性的对象
        Array.prototype.forEach.call(nodeAttrs, (attr) => {
            const attrName = attr.name;
            if (isDirective(attrName)) {
                const dirValue = attr.value;
                const dir = attrName.substring(2);
                // 事件指令
                if (isEventDirective(attrName)) {
                    compileUtils.eventHandler(node, dir, dirValue, this.$vm);
                } else {
                    compileUtils[dir] && compileUtils[dir](node, dirValue, this.$vm);
                }
            }
        })
    }
    /**
     * 编译插值
     * @param {Element} node
     * @param {string} responseKey 插值
     */
    compileText(node, responseKey) {
        compileUtils.text(node, responseKey, this.$vm);
    }
}

export function compile(el, vm) {
    new Compile(el, vm);
}

// 指令或插值的集合
const compileUtils = {
    text: (node, responseKey, vm) => {
        compileUtils.bind(node, responseKey, vm, 'text');
    },
    model: (node, responseKey, vm) => {
        compileUtils.bind(node, responseKey, vm, 'model');
        node.addEventListener('input', (e) => {
            const newValue = e.target.value;
            if (newValue === getValOfObj(vm, responseKey)) {
                return;
            }
            setValOfObj(vm, responseKey, newValue);
        })
    },
    class: (node, responseKey, vm) => {
        compileUtils.bind(node, responseKey, vm, 'text');
    },
    bind: (node, responseKey, vm, directive) => {
        const updaterFn = updater[directive + 'Updater'];
        updaterFn && updaterFn(node, getValOfObj(vm, responseKey));
        new Watcher(vm, responseKey, (newValue, oldValue) => {
            updaterFn && updaterFn(node, newValue, oldValue);
        });
    },
    eventHandler: (node, dir, dirValue, vm) => {
        const eventType = dir.split(':')[1];
        const fn = vm.$options.methods && vm.$options.methods[dirValue];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
}

// 更新函数集合
const updater = {
    textUpdater: (node, value) => {
        setInnerText(node, value);
    },
    modelUpdater: (node, value) => {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    classUpdater: (node, value, oldValue) => {
        let className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        const space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    }
}




