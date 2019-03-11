import React, { createContext, useReducer, useMemo } from 'react';

const DataContext = createContext();

const DataContextProvider = ({ reducer, initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const thunkDispatch = useMemo(() => createThunkDispatcher(dispatch), [
        dispatch,
    ]);

    const context = {
        state,
        dispatch: thunkDispatch,
    };

    return (
        <DataContext.Provider value={context}>{children}</DataContext.Provider>
    );
};

const createThunkDispatcher = dispatch => action => {
    if (typeof action === 'function') {
        return action(dispatch);
    }

    dispatch(action);
};

export { DataContext, DataContextProvider };
