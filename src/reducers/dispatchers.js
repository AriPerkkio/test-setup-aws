import TestApi from '../api/TestApi';
import {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
    postDataStart,
    postDataSuccess,
    postDataFailure
} from './actions';

export const getDataDispatcher = (dispatch, authToken) => () => {
    dispatch(fetchDataStart);

    TestApi(authToken)
        .get()
        .then(payload => dispatch(fetchDataSuccess(payload)))
        .catch(error => dispatch(fetchDataFailure(error)));
};

export const postDataDispatcher = (dispatch, authToken) => body => {
    dispatch(postDataStart);

    TestApi(authToken)
        .post(body)
        .then(payload => dispatch(postDataSuccess(payload)))
        .catch(error => dispatch(postDataFailure(error)));
};
