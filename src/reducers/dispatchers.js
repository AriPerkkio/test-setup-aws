import DataApi from '../api/DataApi';
import {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
    postDataStart,
    postDataSuccess,
    postDataFailure,
} from './actions';

export const getDataDispatcher = (dispatch, authToken) => () => {
    dispatch(fetchDataStart());

    return DataApi(authToken)
        .get()
        .then(payload => dispatch(fetchDataSuccess(payload)))
        .catch(error => dispatch(fetchDataFailure(error)));
};

export const postDataDispatcher = (dispatch, authToken) => body => {
    dispatch(postDataStart());

    return DataApi(authToken)
        .post(body)
        .then(data => dispatch(postDataSuccess(data)))
        .catch(error => dispatch(postDataFailure(error)));
};
