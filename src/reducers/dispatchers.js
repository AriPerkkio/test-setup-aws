import TestApi from '../api/TestApi';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from './actions';

export const getDataDispatcher = (dispatch, authToken) => () => {
    dispatch(fetchDataStart);

    TestApi(authToken).get()
        .then(payload => dispatch(fetchDataSuccess(payload)))
        .catch(error => dispatch(fetchDataFailure(error)));
};
