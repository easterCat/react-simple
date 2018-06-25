/**
 * Created by easterCat on 2018/5/30.
 */
import {setAttribute} from './dom/dom';
import {
    createComponent,
    setComponentProps
} from './vdom/component';

export {
    renderDom,
}

/**
 * 将虚拟dom渲染为真实dom
 * @param vnode 接受的createElement返回的虚拟dom
 * @param container 需要挂载的dom
 * @returns {*|XML|Node}
 */
function renderDom(vnode, container) {
    return container.appendChild(_renderDom(vnode));
}

function _renderDom(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    // 当vnode为数字时，渲染结果是一段文本
    if (typeof vnode === 'number') vnode = String(vnode);

    // 当vnode为字符串时，渲染结果是一段文本
    if (typeof vnode === 'string') {
        let textNode = document.createTextNode(vnode);
        return textNode;
    }

    if (typeof vnode.tag === 'function') {
        const component = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }

    const dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        });
    }

    if (vnode.children) {
        vnode.children.forEach(child => render(child, dom));
    }

    return dom;
}



