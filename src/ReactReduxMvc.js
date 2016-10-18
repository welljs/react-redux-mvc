import React, { Component, PropTypes, Children } from 'react';

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