# my-vue-mvvm
本文实现一个简单的mvvm，实现数据的绑定和双向绑定
## 整体思路
流程图如下所示：
![image][https://shangraochq.github.io/my-vue-mvvm/mvvm.png]

思路：
- 实现一个observer：通过Object.defineProperty对data的属性进行劫持，从而监听数据的变化。当数据发生变化时，通知dep；
- 实现一个compile：对元素节点进行遍历，取出节点中的指令和事件，以及文本节点中的插值。根据指令和插值完成初始化渲染，将对应的数据渲染到对应节点中，同时为元素绑定事件。此外，将对应节点的更新函数绑定到watcher中；
- 实现一个watcher：在Watcher的构造函数中触发对应绑定的响应值的getter函数，将该watcher加入到对应的dep当中。当dep通知watcher数据发生变化时，触发传入的更新函数，更新视图；
- 实现一个dep：当接到observer通知，有数据发生改变时，通知在sub中注册的watcher。

### Observer
遍历data对象，为所有属性和子属性添加get和set。
```js
import Dep from './dep';

export class Observer {
    constructor(data) {
        this.data = data;
        this.convert(this.data);
    }
    convert(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }
    defineReactive(data, key, value) {
        const dep = new Dep();
        // 如果value是对象，监听它的属性
        observer(value);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    // 将对应的watcher加入到dep里面
                    dep.addSub(Dep.target);
                }
                return value;
            },
            set(newValue) {
                if (value === newValue) {
                    return;
                }
                value = newValue;
                // 新值时obj,监听它的属性
                observer(newValue);
                // 属性发生变化，通知watcher调用更新函数更新
                dep.notify();
            }
        })
    }
}

export function observer(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    new Observer(data);
}

```

### Compile

```js
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
            // node如果还存在子节点，继续compile其子节点
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
        // 实现view -> data的响应
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
        // 初始化视图
        updaterFn && updaterFn(node, getValOfObj(vm, responseKey));
        // 绑定更新函数到watcher
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
```

### Watcher

```js
import Dep from "./dep.js";
export default class Watcher {
    constructor(vm, responseKey, callback) {
        this.vm = vm;
        this.callback = callback;
        this.responseKey = responseKey;
        this.value = this.get();
    }
    // 出个被监听data属性的getter方法，将watcher加入到dep中；
    get() {
        Dep.target = this;
        const value = this.getter();
        Dep.target = null;
        return value;
    }
    // 获取responseKey对应的值,过程中触发该属性的getter方法
    getter() {
        let value = this.vm;
        const keyArray = this.responseKey.split('.');
        keyArray.forEach(key => {
            value = value[key];
        });
        return value;
    }
    // dep通知watcher更新，更新函数
    update() {
        const oldValue = this.value;
        this.value = this.getter();
        if (oldValue !== this.value) {
            this.callback.call(this.vm, this.value, oldValue);
        }
    }
}
```

### Dep

```js
export default class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}
Dep.target = null;

```

