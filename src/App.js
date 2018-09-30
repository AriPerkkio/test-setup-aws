import React, { Component } from 'react';

export default class App extends Component {
    componentDidMount() {
        fetch('/api/hello-world')
            .then(response => response.json())
            .then(json => console.log(JSON.stringify(json)))
            .catch(error => console.log({ error }));
    }

    render() {
        return (
            <div>
                Hello world
            </div>
        );
    }
}