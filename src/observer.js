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
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
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
