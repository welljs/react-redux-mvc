import React, { Component, PropTypes, Children } from 'react';
import {warning} from './helpers';


let didWarnAboutReceivingStore = false
function warnAboutReceivingStore() {
    if (didWarnAboutReceivingStore) {
        return
    }
    didWarnAboutReceivingStore = true

    warning(
        '<ReactReduxMvc> does not support changing `store` on the fly. ' +
        'It is most likely that you see this error because you updated to ' +
        'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
        'automatically. See https://github.com/reactjs/react-redux/releases/' +
        'tag/v2.0.0 for the migration instructions.'
    )
}



export default class ReactReduxMvc extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        store: PropTypes.object.isRequired
    };

    static childContextTypes = {
        store: PropTypes.object.isRequired
    };

    getChildContext() {
        return { store: this.store }
    }

    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }

    render () {
        return Children.only(this.props.children);
    }
}

if (process.env.NODE_ENV !== 'production') {
    ReactReduxMvc.prototype.componentWillReceiveProps = function (nextProps) {
        const { store } = this
        const { store: nextStore } = nextProps

        if (store !== nextStore) {
            warnAboutReceivingStore()
        }
    }
}