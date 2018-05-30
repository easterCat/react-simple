/**
 * Created by easterCat on 2018/5/30.
 */

import {render} from './render';

const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = '';
        return render(vnode, container);
    }
};

export default ReactDOM;