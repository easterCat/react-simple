/**
 * Created by easterCat on 2018/5/30.
 */
import Component from './component';
import {setAttribute} from './dom';

function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    if (typeof vnode === 'number') vnode = String(vnode);

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

function createComponent(component, props) {
    let instance;

    if (component.prototype && component.prototype.render) {
        instance = new component(props);
    } else {
        instance = new component(props);
        instance.constructor = component;
        instance.render = function () {
            return this.constructor(props);
        }
    }

    return instance;
}

function unmountComponent(component) {
    if (component.componentWillUnmount) component.componentWillUnmount();
    removeNode(component.base);
}


function setComponentProps(component, props) {

    if (!component.base) {
        if (component.componentWillMount) component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }

    component.props = props;

    renderComponent(component);
}

function renderComponent(component) {

    let base;

    const renderer = component.render();

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    base = _render(renderer);

    if (component.base) {
        if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }

    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }

    component.base = base;
    base._component = component;
}


function render(vnode, container) {
    return container.appendChild(_render(vnode));
}

export {
    render,
    renderComponent,
}