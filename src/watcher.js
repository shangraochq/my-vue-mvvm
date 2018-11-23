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
