import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function employeeReducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_EMPLOYEE_DETAIL:
                let newState = {...state};
                if(newState.employee.name!=null){                   
                    let isAlreadyExist=false;
                    newState.employees.forEach((emp)=>{
                        if(emp.name == action.data.name && emp.role == action.data.role ){
                            isAlreadyExist =true;                            
                        }
                    })
                    if(!isAlreadyExist){
                        newState.employees.push({...action.data})
                    }
                }                
               newState.employee = {...action.data}
               return newState;
            case types.FETCH_EMPLOYEES:
                if(action.employees.length)
                return Object.assign({},state,{employees:[...action.employees]})
                else
                return Object.assign({},state,{employees:[], employee:{name:null, role:'',  level:1}})
            default:
                return state;
    }
}