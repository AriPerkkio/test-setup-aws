import React, { Component } from 'react';

import AuthPage from './AuthPage';
import { withContext } from '../../context';
import { withAuthentication } from '../../authentication';
import TestApi from '../../api/TestApi';

class AuthPageContainer extends Component {
    state = {
        response: null,
        isLoading: false,
        isSending: false,
        queryError: null,
        postError: null
    }

    setLoading = isLoading => this.setState({ isLoading })
    setSending = isSending => this.setState({ isSending })
    setResponse = response => this.setState({ response })
    setQueryError = queryError => this.setState({ queryError })
    setPostError = postError => this.setState({ postError })

    api = TestApi({ authToken: this.props.authToken })

    getData = () => {
        this.setLoading(true);

        this.api.get()
            .then(this.setResponse)
            .then(() => this.setLoading(false))
            .catch(this.setQueryError);
    }

    postData = data => {
        this.setSending(true);

        this.api.post(data)
            .then(console.log)
            .then(() => this.setSending(false))
            .catch(this.setPostError);
    }


    render() {
        const { getData, postData } = this;

        return (
            <AuthPage {...{
                getData,
                postData,
                ...this.state
            }} />
        );
    }
}

export default withContext(withAuthentication(AuthPageContainer));