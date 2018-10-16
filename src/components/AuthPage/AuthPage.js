import React, { Component } from 'react';

import { withContext } from '../../context';
import { withAuthentication } from '../../authentication';
import TestApi from '../../api/TestApi';

class AuthPage extends Component {
    state = {
        response: null,
        error: null
    }

    api = TestApi({ authToken: this.props.authToken })

    getOne = () => this.api.getOne()
        .then(this.setApiResponse)
        .catch(this.error)

    setApiResponse = apiResponse => this.setState({ apiResponse })
    setError = error => this.setState({ error })

    render() {
        const { error, apiResponse } = this.state;

        return (
            <div>
                <h2>Auth page</h2>

                {error && <p>Error : {error.toString()}</p>}

                {apiResponse &&
                    <pre style={{ color: 'red' }}>Api response : {JSON.stringify(apiResponse, null, 4)}</pre>}

                <button onClick={this.getOne}>
                    Call API
                </button>
            </div>
        );
    }
}

export default withContext(withAuthentication(AuthPage));