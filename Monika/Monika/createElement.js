/**
 * Created by easterCat on 2018/5/25.
 */

function Vnode(tag, attrs, children, key) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.key = key;
}

/**
 * 该方法在写jsx的时候会自动调用
 * 介绍了什么是jsx https://jasonformat.com/wtf-is-jsx/
 * argument(tag,attr,child1,child2,...child(n))
 */
function createElement(tag, attributes, ...children) {
    let newChildren = [];
    let attrs = {};
    let attrName;
    let key;

    if (children.length === 1) {
        newChildren = children[0] ? children[0] : [];
    } else if (children.length >= 1) {
        newChildren = children;
    }

    if (attributes) {
        if (attributes.hasOwnProperty('children') && attributes['children'] !== null) {
            newChildren.push(attributes['children']);
            delete attributes['children'];
        }

        key = attributes['key'] === null ? undefined : attributes['key'];

        for (attrName in attributes) {
            if (attributes.hasOwnProperty(attrName)) {
                attrs[attrName] = attributes[attrName];
            }
        }
    }

    return new Vnode(tag, attrs, newChildren, key);
}

export {
    createElement,
}