import React, { createContext, useReducer, useMemo } from 'react';

const DataContext = createContext();

const DataContextProvider = ({
    reducer,
    initialState,
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const thunkDispatch = useMemo(() => createThunkDispatcher(dispatch), [dispatch]);

    const context = {
        state,
        dispatch: thunkDispatch,
    };

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
};

const createThunkDispatcher = dispatch => (action, state) => {
    if (typeof action === 'function') {
        return action(dispatch, state);
    }

    dispatch(action, state);
};

export {
    DataContext,
    DataContextProvider,
};