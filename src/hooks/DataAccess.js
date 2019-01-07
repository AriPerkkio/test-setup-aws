import { useContext, useMemo } from 'react';

import { getDataDispatcher, postDataDispatcher } from '../reducers';
import { DataContext, AuthContext } from '../context';

/**
 * Provides simple way to access data store and methods for updating it.
 * Hides implementation of useReducer and useContext
 */
const useDataAccess = (
    mapPropsToState = state => state
) => {
    const { authToken } = useContext(AuthContext);
    const { state, dispatch } = useContext(DataContext);

    const getData = useMemo(() => getDataDispatcher(dispatch, authToken), [dispatch, authToken]);
    const postData = useMemo(() => postDataDispatcher(dispatch, authToken), [dispatch, authToken]);

    const mappedState = mapPropsToState(state);

    setDispatchDebugging(dispatch);

    return {
        state: mappedState,
        getData,
        postData,
    };
};

// For debugging + performance optimization
const setDispatchDebugging = dispatch => { window.__DISPATCH__ = dispatch; };

export default useDataAccess;