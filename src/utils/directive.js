export function isDirective(attr) {
    return attr.indexOf('v-') === 0 || attr.indexOf(':') === 0 || attr.indexOf('@') === 0;
}
export function isEventDirective(dir) {
    return dir.indexOf('v-on') === 0 || dir.indexOf('@') === 0;
}
