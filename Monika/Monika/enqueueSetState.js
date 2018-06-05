/**
 * Created by easterCat on 2018/6/5.
 */
import {renderComponent} from './render';

let queue = [];
let renderQueue = [];

export function enqueueSetState(stateChange, component, callback) {
    if (queue.length === 0) {
        defer(flush);
        setTimeout(callback, 0);
    }

    queue.push({
        stateChange,
        component
    });

    if (!renderQueue.some(item => item === component)) {
        renderQueue.push(component);
    }
}

function flush() {
    let item;
    let component;

    while (item = queue.shift()) {
        const {stateChange, component} = item;

        //如果组件没有prevState，则将当前state作为初始prevState
        if (!component.prevState) {
            component.prevState = Object.assign({}, component.state);
        }

        if (typeof stateChange === 'function') {
            //如果第一个参数是一个函数，使用prevState来得到函数的返回值，然后再合并state
            Object.assign(component.state, stateChange(component.prevState, component.props));
        } else {
            Object.assign(component.state, stateChange);
        }
    }

    while (component = renderQueue.shift()) {
        renderComponent(component);
    }
}

function defer(f) {
    Promise.resolve().then(f);
}