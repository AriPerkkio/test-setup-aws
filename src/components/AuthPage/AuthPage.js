import React, { Component } from 'react';

import { withContext } from '../../context';
import { withAuthentication } from '../../authentication';
import SubmitButton from '../common/SubmitButton';
import TestApi from '../../api/TestApi';

class AuthPage extends Component {
    state = {
        response: null,
        isLoading: false,
        error: null
    }

    setLoading = isLoading => this.setState({ isLoading })
    api = TestApi({ authToken: this.props.authToken })

    callApi = () => {
        this.setLoading(true);

        this.api.getOne()
            .then(this.setApiResponse)
            .then(() => this.setLoading(false))
            .catch(this.error);
    }

    setApiResponse = apiResponse => this.setState({ apiResponse })
    setError = error => this.setState({ error })

    render() {
        const { error, apiResponse, isLoading } = this.state;

        return (
            <div id='auth-page' className={isLoading ? 'loading' : ''}>
                <h2>Auth page</h2>

                {error && <p>Error : {error.toString()}</p>}

                {apiResponse &&
                    <pre style={{ color: 'red' }}>Api response : {JSON.stringify(apiResponse, null, 4)}</pre>}

                <SubmitButton
                    onClick={this.callApi}
                    isLoading={isLoading}
                    value='Call API' />
            </div>
        );
    }
}

export default withContext(withAuthentication(AuthPage));