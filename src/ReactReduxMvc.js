import React, { Component, Children } from 'react';
import { object, element } from 'prop-types';

export default class ReactReduxMvc extends Component {
    static propTypes = {
        children: element.isRequired,
        store: object.isRequired
    };

    static childContextTypes = {
        store: object.isRequired
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
