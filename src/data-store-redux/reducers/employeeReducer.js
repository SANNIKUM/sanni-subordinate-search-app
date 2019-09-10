import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function employeeReducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_EMPLOYEE_DETAIL:
            
                let newState = {...state};
                    let employees = []
                    action.data.forEach(emp=>{
                            emp.subordinates.forEach(e=>{
                                employees.push({name:e, level:emp.level})
                            })                      
                    })
                    newState.employees = [...employees]
               newState.employee = {...action.data[0]}
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