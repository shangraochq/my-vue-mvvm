!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.subs=[]}return r(e,[{key:"addSub",value:function(e){this.subs.push(e)}},{key:"notify",value:function(){this.subs.foreach(function(e){e.update()})}}]),e}();t.default=o,o.target=null},function(e,t,n){"use strict";new(function(e){return e&&e.__esModule?e:{default:e}}(n(2)).default)({el:"mvvm-app",data:{inputValue:"inputValue",inner:{innerInputValue:"innerInputValue"},value:"hello Mvvm"}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o=n(4);t.default=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(0,r.observer)(t.data),(0,o.compile)(t.el||document.body,this)}},function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0}),t.Observer=void 0;var o="function"==typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return void 0===e?"undefined":r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":r(e)},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.observer=c;var u=function(e){return e&&e.__esModule?e:{default:e}}(n(0));var a=t.Observer=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this.convert(this.data)}return i(e,[{key:"convert",value:function(e){var t=this;Object.keys(e).forEach(function(n){t.defineReactive(e,n,e[n])})}},{key:"defineReactive",value:function(e,t,n){var r=new u.default;c(n),Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get:function(){return u.default.target&&r.addSub(u.default.target),n},set:function(e){n!==e&&(n=e,c(e),r.notify())}})}}]),e}();function c(e){e&&"object"===("undefined"==typeof value?"undefined":o(value))&&new a(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Compile=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.compile=function(e,t){new c(e,t)};var o=function(e){return e&&e.__esModule?e:{default:e}}(n(5)),i=n(6),u=n(7),a=n(8);var c=t.Compile=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$vm=n,this.$el=(0,i.isElementNode)(t)?t:document.querySelector(t),this.$fragment=this.nodeToFragment(),this.compileElement(),this.$el.appendChild(this.$fragment)}return r(e,[{key:"nodeToFragment",value:function(){for(var e=document.createDocumentFragment(),t=null;;){if(t=this.$el.firstChild)return void e.appendChild(t);break}return e}},{key:"compileElement",value:function(){var e=this,t=this.$fragment.childNodes,n=/\{\{(.*)\}\}/,r=(0,i.getInnerText)(node);t.foreach(function(t){(0,i.isElementNode)(t)?e.compile(t):me.isTextNode(t)&&n.test(r)&&me.compileText(t,RegExp.$1),t.childNodes&&t.childNodes.length&&e.compileElement(t)})}},{key:"compile",value:function(e){var t=this;e.attributes.foreach(function(n){var r=arrt.name;if((0,a.isDirective)(arrtName)){var o=n.value,i=r.substring(2);(0,a.isEventDirective)(r)?f.eventHandler(e,i,o,t):f[i]&&f[i](e,o,t)}})}},{key:"compileText",value:function(e,t){f.text(e,t,this.$vm)}}]),e}();var f={text:function(e,t,n){f.bind(e,t,n,"text")},model:function(e,t,n){f.bind(e,t,n,"modal"),e.addEventListener("input",function(e){var r=e.taget.value;r!==(0,u.getValOfObj)(n,t)&&setValOfObj(n,t,r)})},class:function(e,t,n){f.bind(e,t,n,"text")},bind:function(e,t,n,r){var i=l[r+"Updater"];i&&i(e,(0,u.getValOfObj)(n,r)),new o.default(n,t,function(t,n){i&&i(e,t,n)})},eventHandler:function(e,t,n,r){var o=t.split(":")[1],i=r.$options.methods&&r.$options.methods[n];o&&i&&e.addEventListener(o,i.bind(r),!1)}},l={textUpdater:function(e,t){(0,i.setInnerText)(e,t)},model:function(e,t){e.value=void 0===t?"":t},classUpdater:function(e,t,n){var r=e.className,o=(r=r.replace(n,"").replace(/\s$/,""))&&String(t)?" ":"";e.className=r+o+t}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e){return e&&e.__esModule?e:{default:e}}(n(0));var i=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.vm=t,this.callback=r,this.responseKey=n,this.vaule=this.get()}return r(e,[{key:"get",value:function(){o.default.target=this;var e=this.getter();return o.default.target=null,e}},{key:"getter",value:function(){var e=this.vm;return this.responseKey.split(".").forEach(function(t){e=e[t]}),e}},{key:"update",value:function(){var e=this.value;this.value=this.get(),e!==this.value&&this.callback.call(this.vm,this.value,e)}}]),e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isElementNode=function(e){return 1===e.nodeType},t.isTextNode=function(e){return 3===e.nodeType},t.getInnerText=function(e){return"string"==typeof e.textContent?e.textContent:e.innerText},t.setInnerText=function(e,t){t=void 0===t?"":t,"string"==typeof e.textContent?e.textContent=t:e.innerText=t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getValOfObj=function(e,t){var n=e;return t.split(".").forEach(function(e){n=n[e]}),n},t.setValOfObj=function(e,t,n){var r=t.split(".");r.forEach(function(t,o){o<r.length-1?e=e[t]:e[t]=n})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDirective=function(e){return 0===e.indexOf("v-")||0===e.indexOf(":")||0===e.indexOf("@")},t.isEventDirective=function(e){return 0===attr.indexOf("v-on")||0===attr.indexOf("@")}}]);
//# sourceMappingURL=index.c1075725.js.map