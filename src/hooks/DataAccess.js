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
    // TODO shallowCompare with useMemo. HOC with shouldComponentUpdate not wanted

    return {
        state: mappedState,
        getData,
        postData,
    };
};

export default useDataAccess;