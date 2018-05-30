/**
 * Created by easterCat on 2018/5/30.
 */

function render(vnode, container) {
    //当vnode是一段字符串，渲染的是一段文本
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return container.appendChild(textNode);
    }

    const dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        })
    }

    vnode.children.forEach(child => {
        render(child, dom);
    });

    return container.appendChild(dom);
}


function setAttribute(dom, name, value) {
    //修改className=>class
    if (name === 'className') name = 'class';

    //on + xxx，这是一个事件监听方法
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || '';
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
            }
        }
    } else {
        if (name in dom) {
            dom[name] = value || '';
        }
        if (value) {
            dom.setAttribute(name, value);
        } else {
            dom.removeAttribute(name, value);
        }
    }
}

export {
    render,
}