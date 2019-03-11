export { initialState, reducer } from './reducers';

export {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
    postDataStart,
    postDataSuccess,
    postDataFailure,
} from './actions';

export { getDataDispatcher, postDataDispatcher } from './dispatchers';
