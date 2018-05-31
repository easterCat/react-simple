/**
 * Created by fuhuo on 2018/5/26.
 */
import {createElement as createEle, render} from './createElement';
import Component from './component';

const React = {
    createElement: createEle,
    Component
};

export const createElement = createEle;

export default React;