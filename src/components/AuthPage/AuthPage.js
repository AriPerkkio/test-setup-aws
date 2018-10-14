import React, { Component } from 'react';

import { withContext } from '../../context';
import { withAuthentication } from '../../api/UserApi';

class AuthPage extends Component {

    state = {
        apiResponse: null,
        error: null
    }

    setApiResponse = apiResponse => this.setState({ apiResponse })
    setError = error => this.setState({ error })

    callApi = () => {
        const config = {
            headers: {
                'X-Authorization': this.props.authToken
            }
        };

        fetch('/api/endpoint-one', config)
            .then(resp => resp.json())
            .then(this.setApiResponse)
            .catch(this.setError);
    }

    render() {
        const { error, apiResponse } = this.state;

        return (
            <div>
                <h2>Auth page</h2>

                {error && <p>Error : {error.toString()}</p>}

                {apiResponse &&
                    <pre style={{ color: 'red' }}>Api response : {JSON.stringify(apiResponse, null, 4)}</pre>}

                <button onClick={this.callApi}>
                    Call API
                </button>
            </div>
        );
    }
}

export default withAuthentication(withContext(AuthPage));