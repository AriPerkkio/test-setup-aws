import { useContext, useMemo } from 'react';

import { getDataDispatcher, postDataDispatcher } from '../reducers';
import { DataContext, AuthContext } from '../context';

/**
 * Provides simple way to access data store and methods for updating it.
 * Hides implementation of useReducer and useContext
 */
const useDataAccess = () => {
    const { authToken } = useContext(AuthContext);
    const { state, dispatch } = useContext(DataContext);

    const getData = useMemo(() => getDataDispatcher(dispatch, authToken), [dispatch, authToken]);
    const postData = useMemo(() => postDataDispatcher(dispatch, authToken), [dispatch, authToken]);

    return {
        state,
        getData,
        postData,
    };
};

export default useDataAccess;