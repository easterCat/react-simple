'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Created by fuhuo on 2018/5/25.
 */

/**
 * 该方法在写jsx的时候会自动调用
 * argument(tag,attr,child1,child2,...child(n))
 */
function createElement(tag, attrs) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return {
        tag: tag,
        attrs: attrs,
        children: children
    };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by easterCat on 2018/5/31.
 */

function setAttribute(dom, name, value) {
    // 如果属性名是class，则改回className
    if (name === 'className') name = 'class';

    // 如果属性名是onXXX，则是一个时间监听方法
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || '';
        // 如果属性名是style，则更新style对象
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            node.style.cssText = value || '';
        } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            for (var _name in value) {
                // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
                dom.style[_name] = typeof value[_name] === 'number' ? value[_name] + 'px' : value[_name];
            }
        }
        // 普通属性则直接更新属性
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function diffNode(dom, vnode) {

    var out = dom;

    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    if (typeof vnode === 'number') vnode = String(vnode);

    // diff text node
    if (typeof vnode === 'string') {

        // 如果当前的DOM就是文本节点，则直接更新内容
        if (dom && dom.nodeType === 3) {
            // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
            if (dom.textContent !== vnode) {
                dom.textContent = vnode;
            }
            // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的
        } else {
            out = document.createTextNode(vnode);
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom);
            }
        }

        return out;
    }

    if (typeof vnode.tag === 'function') {
        return diffComponent(dom, vnode);
    }

    if (!dom || !isSameNodeType(dom, vnode)) {
        out = document.createElement(vnode.tag);

        if (dom) {
            [].concat(_toConsumableArray(dom.childNodes)).map(out.appendChild); // 将原来的子节点移到新节点下

            if (dom.parentNode) {
                dom.parentNode.replaceChild(out, dom); // 移除掉原来的DOM对象
            }
        }
    }

    if (vnode.children && vnode.children.length > 0 || out.childNodes && out.childNodes.length > 0) {
        diffChildren(out, vnode.children);
    }

    diffAttributes(out, vnode);

    return out;
}

function diffChildren(dom, vchildren) {

    var domChildren = dom.childNodes;
    var children = [];

    var keyed = {};

    if (domChildren.length > 0) {
        for (var i = 0; i < domChildren.length; i++) {
            var child = domChildren[i];
            var key = child.key;
            if (key) {
                keyedLen++;
                keyed[key] = child;
            } else {
                children.push(child);
            }
        }
    }

    if (vchildren && vchildren.length > 0) {

        var min = 0;
        var childrenLen = children.length;

        for (var _i = 0; _i < vchildren.length; _i++) {

            var vchild = vchildren[_i];
            var _key = vchild.key;
            var _child = void 0;

            if (_key) {

                if (keyed[_key]) {
                    _child = keyed[_key];
                    keyed[_key] = undefined;
                }
            } else if (min < childrenLen) {

                for (var j = min; j < childrenLen; j++) {

                    var c = children[j];

                    if (c && isSameNodeType(c, vchild)) {

                        _child = c;
                        children[j] = undefined;

                        if (j === childrenLen - 1) childrenLen--;
                        if (j === min) min++;
                        break;
                    }
                }
            }

            _child = diffNode(_child, vchild);

            var f = domChildren[_i];
            if (_child && _child !== dom && _child !== f) {
                if (!f) {
                    dom.appendChild(_child);
                } else if (_child === f.nextSibling) {
                    removeNode(f);
                } else {
                    dom.insertBefore(_child, f);
                }
            }
        }
    }
}

function diffComponent(dom, vnode) {

    var c = dom && dom._component;
    var oldDom = dom;

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

function setComponentProps(component, props) {

    if (!component.base) {
        if (component.componentWillMount) component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }

    component.props = props;
    renderComponent(component);
}

function isSameNodeType(dom, vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return dom.nodeType === 3;
    }

    if (typeof vnode.tag === 'string') {
        return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
    }

    return dom && dom._component && dom._component.constructor === vnode.tag;
}

function diffAttributes(dom, vnode) {

    var old = {}; // 当前DOM的属性
    var attrs = vnode.attrs; // 虚拟DOM的属性

    for (var i = 0; i < dom.attributes.length; i++) {
        var attr = dom.attributes[i];
        old[attr.name] = attr.value;
    }

    // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
    for (var name in old) {

        if (!(name in attrs)) {
            setAttribute(dom, name, undefined);
        }
    }

    // 更新新的属性值
    for (var _name in attrs) {

        if (old[_name] !== attrs[_name]) {
            setAttribute(dom, _name, attrs[_name]);
        }
    }
}

/**
 * Created by easterCat on 2018/5/30.
 */

function createComponent(component, props) {
    var instance = void 0;

    if (component.prototype && component.prototype.render) {
        instance = new component(props);
    } else {
        instance = new component(props);
        instance.constructor = component;
        instance.render = function () {
            return this.constructor(props);
        };
    }

    return instance;
}

function unmountComponent(component) {
    if (component.componentWillUnmount) component.componentWillUnmount();
    removeNode$1(component.base);
}

function removeNode$1(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom);
    }
}

function renderComponent(component) {

    var base = void 0;

    var renderer = component.render();

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

/**
 * Created by easterCat on 2018/6/5.
 */

var queue = [];
var renderQueue = [];

function enqueueSetState(stateChange, component, callback) {
    if (queue.length === 0) {
        defer(flush);
        setTimeout(callback, 0);
    }

    queue.push({
        stateChange: stateChange,
        component: component
    });

    if (!renderQueue.some(function (item) {
        return item === component;
    })) {
        renderQueue.push(component);
    }
}

function flush() {
    var item = void 0;
    var component = void 0;

    while (item = queue.shift()) {
        var _item = item,
            stateChange = _item.stateChange,
            _component = _item.component;

        //如果组件没有prevState，则将当前state作为初始prevState

        if (!_component.prevState) {
            _component.prevState = Object.assign({}, _component.state);
        }

        if (typeof stateChange === 'function') {
            //如果第一个参数是一个函数，使用prevState来得到函数的返回值，然后再合并state
            Object.assign(_component.state, stateChange(_component.prevState, _component.props));
        } else {
            Object.assign(_component.state, stateChange);
        }
    }

    while (component = renderQueue.shift()) {
        renderComponent(component);
    }
}

function defer(f) {
    Promise.resolve().then(f);
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
    function Component() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Component);

        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }

    _createClass(Component, [{
        key: 'setState',
        value: function setState(stateChange, callback) {
            // Object.assign(this.state, stateChange);
            // renderComponent(this)
            //将state更新放进一个队列中去
            enqueueSetState(stateChange, this, callback);
        }
    }]);

    return Component;
}();

/**
 * Created by fuhuo on 2018/5/26.
 */

var React = {
  createElement: createElement,
  Component: Component
};

var createElement$1 = createElement;

exports.createElement = createElement$1;
exports.default = React;
