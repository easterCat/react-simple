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

    queue.push({stateChange, component});

    //渲染组件只会渲染一次
    if (!renderQueue.some(item => item === component)) {
        renderQueue.push(component);
    }
}

function flush() {
    let item;
    let component;

    while ((item = queue.shift())) {
        const {stateChange, component} = item;

        //如果组件没有prevState，则将当前state作为初始prevState
        if (!component.prevState) {
            component.prevState = Object.assign({}, component.state);
        }

        //如果第一个参数是一个函数，使用prevState来得到函数的返回值，然后再合并state
        //如果是一个对象，就直接合并
        Object.assign(component.state, typeof stateChange === 'function' ?
            stateChange(component.prevState, component.props) :
            stateChange
        )
    }

    while (component = renderQueue.shift()) {
        renderComponent(component);
    }
}

function defer(f) {
    if (typeof Promise === 'function') {
        Promise.resolve().then(f);
    } else {
        setTimeout(f, 0);
    }
}