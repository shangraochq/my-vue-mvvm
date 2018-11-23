import Mvvm from '../../src/index.js';

new Mvvm({
    el: "mvvm-app",
    data: {
        inputValue: "inputValue",
        inner: {
            innerInputValue: "innerInputValue"
        },
        value: "hello World!"
    }
});
