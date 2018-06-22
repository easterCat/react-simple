/**
 * Created by fuhuo on 2018/5/26.
 */
import {createElement} from './createElement';
import Component from './component';
import {renderDom} from './render';

const React = {
    createElement,
    Component,
    render: (vnode, container) => {
        container.innerHTML = '';
        return renderDom(vnode, container);
    }
};

export default React;