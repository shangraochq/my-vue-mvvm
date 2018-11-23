export function isElementNode(node) {
    return node.nodeType === 1;
}

export function isTextNode(node) {
    return node.nodeType === 3;
}

export function getInnerText(element) {
    return (typeof element.textContent == "string") ?
        element.textContent : element.innerText;
}

export function setInnerText(element, text) {
    text = typeof text === 'undefined' ? '' : text;
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}
