import {combineReducers} from 'redux';
import EmployeeData from './employeeReducer';
import ajaxStatus from './ajaxStatusReducer';

const rootReducer = combineReducers({
    EmployeeData,
    ajaxStatus
});
export default rootReducer;