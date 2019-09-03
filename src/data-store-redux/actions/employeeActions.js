import {get} from '../../utility/http-util';
import * as types from './actionTypes';
import {handleError} from '../../utility/error-util';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import Constants from '../../constant/';

const getEmployeeDetail = (data) => {
    return { 
        type: types.FETCH_EMPLOYEE_DETAIL,
        data 
        };
};

const getEmployees = (employees) => {
    return { 
        type: types.FETCH_EMPLOYEES,
        employees 
        };
};

const ajaxCallSuccess = ()=>{
    return { 
        type: types.FETCH_SUCCESS,
        data:true 
        };
}
export function fetchEmployeeDetail(employeeName,level,callback ) {
    return function (dispatch) {
        dispatch(beginAjaxCall());        
        return get(Constants.endpoints.employees+"/"+employeeName, null, false).then((data) => {
            if(data.length){
                let subordinates =data[1]?data[1]['direct-subordinates']:[];
                dispatch(getEmployeeDetail({name:employeeName, role: data[0], subordinates,level }));
                setTimeout(callback(subordinates,++level),0);
            }
            dispatch(ajaxCallSuccess());
        }).catch(err => {
            dispatch(ajaxCallError());
            handleError(dispatch, err, types.HANDLE_ERROR);
            throw (err);
        });
    };
}

export function fetchEmployees() {
    return function (dispatch) {
        dispatch(beginAjaxCall());        
        return get(Constants.endpoints.employees, null, false).then((data) => {
            dispatch(getEmployees(data));
            dispatch(ajaxCallSuccess());
        }).catch(err => {
            dispatch(ajaxCallError());
            handleError(dispatch, err, types.HANDLE_ERROR);
            throw (err);
        });
    };
}

export function clearEmployee(){
    return function(dispatch){
        let employees = [];
        dispatch(getEmployees(employees));
    }
  }