import React, { Component } from 'react';

export default class App extends Component {
    state = {
        one: null,
        two: null
    }

    componentDidMount() {
        ['one', 'two'].forEach(resource =>
            fetch('/api/endpoint-' + resource)
                .then(response => response.json())
                .then(json => this.setState({ [resource]: json }))
                .catch(error => this.setState({ [resource]: error }))
        );
    }

    render() {
        const { one, two } = this.state;

        return (
            <div>
                Hello world
                {one && 
                    <pre>{JSON.stringify(one, null, 4)}</pre>}
                {two && 
                    <pre>{JSON.stringify(two, null, 4)}</pre>}
            </div>
        );
    }
}