import React from 'react';
import SearchSubordinates from './component/searchSubordinates';
import * as employeeActions from './data-store-redux/actions/employeeActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



function App(props) {
  console.log(props);
    return (
      
      <>
        <header className="App-header">
                <h2>   Welcome To Employees Portal   </h2>              
        </header>
        {props.loading ? <div className="loading" > <span>Please wait...</span>  </div> : null}
       <SearchSubordinates  {...props} />    
      </>
    );
  }

  function mapToProps(state){
    return{
      data:state.EmployeeData,
      loading:state.ajaxStatus.ajaxCallsInProgress > 0
    }
  }
  
  function mapToDispatch(dispatch){
    return {
      actions: bindActionCreators(employeeActions,dispatch)
     }
  }
  export default connect(mapToProps,mapToDispatch)(App);