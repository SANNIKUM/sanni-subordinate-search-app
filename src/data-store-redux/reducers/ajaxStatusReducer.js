import * as types from '../actions/actionTypes';
import initialState from '../initialState';


export default function ajaxStatusReducer(state = initialState, action) {
    if (action.type == types.BEGIN_AJAX_CALL){
        let newState =Object.assign({}, state, {ajaxCallsInProgress: state.ajaxCallsInProgress+1});
        return newState;
    }
    else if (action.type == types.AJAX_CALL_ERROR 
        || action.type == types.FETCH_SUCCESS) {
            if(state.ajaxCallsInProgress>0)
        return Object.assign({}, state, {ajaxCallsInProgress: state.ajaxCallsInProgress-1}) ;
        else
        return Object.assign({}, state, {ajaxCallsInProgress:0});
    }    
    return state;
}