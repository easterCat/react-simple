/**
 * Created by easterCat on 2018/5/31.
 */
import {renderComponent} from './render';

class Component {
    constructor(props = {}) {
        this.isReactComponent = true;

        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}

export default Component;



