import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    POST_DATA_START,
    POST_DATA_SUCCESS,
    POST_DATA_FAILURE,
} from './actions';

export const initialState = {
    loading: false,
    sending: false,
    error: null,
    data: null,
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    const { data, error } = payload || {};

    switch (type) {
        case FETCH_DATA_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data,
            };

        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error,
            };

        case POST_DATA_START:
            return {
                ...state,
                sending: true,
                error: null,
            };

        case POST_DATA_SUCCESS:
            return {
                ...state,
                sending: false,
                data: [].concat(state.data, data),
            };

        case POST_DATA_FAILURE:
            return {
                ...state,
                sending: false,
                error,
            };

        default:
            return state;
    }
};
