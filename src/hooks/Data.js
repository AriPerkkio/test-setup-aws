import { useContext, useEffect, useMemo } from 'react';

import { getDataDispatcher } from '../reducers';
import { DataContext, AuthContext } from '../context';

export const useData = () => {
    const { authToken } = useContext(AuthContext);
    const { state, dispatch } = useContext(DataContext);

    const getData = useMemo(() => getDataDispatcher(dispatch, authToken), [dispatch, authToken]);

    useEffect(getData, []);

    return state;
};
