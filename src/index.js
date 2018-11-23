import { observer} from "./observer.js";
import { compile } from "./compile.js";
export default class Mvvm {
    constructor(options) {
        this.$options = options;
        this._data = this.$options.data;
        // 实现 vm.xxx -> vm._data.xxx
        Object.keys(this._data).forEach(key => {
            this.proxyData(key);
        })
        observer(options.data);
        compile(options.el || document.body, this);
    }
    proxyData(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => {
                return this._data[key];
            },
            set: (value) => {
                this._data[key] = value;
            }
        })
    }
}
