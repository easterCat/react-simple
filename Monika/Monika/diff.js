import {setAttribute} from "./dom";
import {Componet} from './component'

export function diff(dom, vnode, container) {

    const ret = diffNode(dom, vnode);

    if (container && ret.parentNode !== container) {
        container.appendChild(ret);
    }

    return ret;

}

function diffNode(dom, vnode) {

    let out = dom;

    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    if (typeof vnode === 'number') vnode = String(vnode);


    if (typeof vnode === 'string') {
        // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
        if (dom && dom.nodeType === 3) {
            if (dom.textContent !== vnode) {
                dom.textContent = vnode;
            }
        } else {
            out = document.createTextNode('vnode');

            if (dom && dom.parentNode) {
                dom.parentNode.replace(out, dom);
            }
        }

        return out;
    }

    //对比非文本节点
    if (!dom || dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
        out = document.createElement(vnode.tag);
        if (dom) {
            [...dom.children].map(out.appendChild);

            if (dom.parentNode) {
                dom.parentNode.replace(out, dom);
            }
        }
    }
}



function diffChildren(dom, vchildren) {
    const domChildren = dom.children;
    const children = [];

    const keyed = [];

    if (domChildren.length > 0) {
        for (let i = 0; i < domChildren.length; i++) {
            const child = domChildren[i];
            const key = child.key;
            if (key) {
                keyed[key] = child;
            } else {
                children.push(child);
            }
        }
    }

    if (vchildren && vchildren.length > 0) {
        let min = 0;
        let childrenLen = children.length;

        for (let i = 0; i < vchildren.length; i++) {
            const vchild = vchildren[i];
            const key = vchild.key;

            let child;

            if (key) {
                if (keyed[key]) {
                    child = keyed[key];
                    keyed[key] = undefined;
                }
            } else if (min < childrenLen) {
                for (let j = min; j < childrenLen; j++) {
                    let c = children[j];
                    if (c && isSameNodeType(c, vchild)) {
                        child = c;
                        children[j] = undefined;
                        if (j === childrenLen - 1) childrenLen++;
                        if (j === min) min++;
                        break;
                    }
                }
            }

            child = diff(child, vchild);

            const f = domChildren[i];

            if (child && child !== dom && child !== f) {
                if (!f) {
                    dom.appendChild(child);
                } else if (child === f.nextSibling) {
                    removeNode(f);
                } else {
                    dom.insertBefore(child, f);
                }
            }
        }
    }
}

function diffComponent(dom, vnode) {
    let c = dom && dom._component;
    let oldDom = dom;

    if (c && c.constructor === vnode.tag) {
        setComponentProps(c, vnode.attrs);
        dom = c.base;
    } else {
        if (c) {
            unmountComponent(f);
            oldDom = null;
        }
        c = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(c, vnode.attrs);

        dom = c.base;

        if (oldDom && dom !== oldDom) {
            oldDom._component = null;
            removeNode(oldDom);
        }
    }
    return dom;
}

function removeNode( dom ) {

    if ( dom && dom.parentNode ) {
        dom.parentNode.removeChild( dom );
    }

}