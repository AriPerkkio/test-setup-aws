export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const POST_DATA_START = 'POST_DATA_START';
export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILURE = 'POST_DATA_FAILURE';

export const fetchDataStart = () => ({
    type: FETCH_DATA_START,
});

export const fetchDataSuccess = payload => ({
    type: FETCH_DATA_SUCCESS,
    payload,
});

export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: { error },
});

export const postDataStart = () => ({
    type: POST_DATA_START,
});

export const postDataSuccess = payload => ({
    type: POST_DATA_SUCCESS,
    payload,
});

export const postDataFailure = error => ({
    type: POST_DATA_FAILURE,
    payload: { error },
});
