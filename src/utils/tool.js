export function getValOfObj(obj, key) {
    let value = obj;
    const keyArray = key.split('.');
    keyArray.forEach(key => {
        value = value[key];
    });
    return value;
}

export function setValOfObj(obj, key, newValue) {
    const keyArray = key.split('.');
    keyArray.forEach((key, index) => {
        if (index < keyArray.length - 1) {
            obj = obj[key];
        } else {
            obj[key] = newValue;
        }
    });
}
