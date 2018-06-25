/**
 * Created by easterCat on 2018/6/25.
 */

import Component from './component';
import {setAttribute} from '../dom/dom';
import {diffNode} from './diff';

export {
    renderComponent,
    createComponent,
    unmountComponent,
    setComponentProps,
    diffComponent,
}

function unmountComponent(component) {
    if (component.componentWillUnmount) component.componentWillUnmount();
    removeNode(component.base);
}

function renderComponent(component) {

    let base;

    const renderer = component.render();

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    base = diffNode(component.base, renderer);

    component.base = base;
    base._component = component;

    if (component.base) {
        if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }

    component.base = base;
    base._component = component;
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

function setComponentProps(component, props) {

    if (!component.base) {
        if (component.componentWillMount) component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }
    component.props = props;
    renderComponent(component);
}

function removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom);
    }
}

function diffComponent(dom, vnode) {

    let c = dom && dom._component;
    let oldDom = dom;

    // 如果组件类型没有变化，则重新set props
    if (c && c.constructor === vnode.tag) {
        setComponentProps(c, vnode.attrs);
        dom = c.base;
        // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
    } else {

        if (c) {
            unmountComponent(c);
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