/**
 * Created by easterCat on 2018/5/31.
 */
import {enqueueSetState} from './enqueueSetState';

class Component {
    constructor(props = {}, context) {
        this.context = context;
        this.isReactComponent = true;
        this.state = this.state || {};
        this.props = props;
    }

    setState(stateChange, callback) {
        //将state更新放进一个队列中去
        enqueueSetState(stateChange, this, callback);
    }

    render() {
    }
}

export default Component;
