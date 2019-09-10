import {get} from '../../utility/http-util';
import * as types from './actionTypes';
import {handleError} from '../../utility/error-util';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import Constants from '../../constant/';
import "isomorphic-fetch";
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



export function fetchEmployeeDetail(employeeName) {
    return function (dispatch) {
        dispatch(beginAjaxCall());        
        get(Constants.endpoints.employees+employeeName, null, false).then((data) => {
            if(data.length){
                let subordinates =data[1]?data[1]['direct-subordinates']:[];
                let empDetail=[];
                empDetail.push({name:employeeName, role: data[0], subordinates,level:1 });
                if(subordinates.length)
                 get(Constants.endpoints.employees, null, false,subordinates).then((data2) => {
                     
                    if(data2.length)
                    data2.forEach(sub => {
                        
                        if(sub.length){
                            subordinates =sub[1]?sub[1]['direct-subordinates']:[];
                            empDetail.push({name:employeeName, role: sub[0],subordinates, level:2 });
                        }
                       
                    });
                    dispatch(getEmployeeDetail(empDetail))
                })
                else
                dispatch(getEmployeeDetail(empDetail))
            }
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