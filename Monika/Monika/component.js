/**
 * Created by easterCat on 2018/5/31.
 */
import {enqueueSetState} from './enqueueSetState';

class Component {
    constructor(props = {}) {
        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }

    setState(stateChange, callback) {
        // Object.assign(this.state, stateChange);
        // renderComponent(this)
        //将state更新放进一个队列中去
        enqueueSetState(stateChange, this, callback);
    }
}

export default Component;
