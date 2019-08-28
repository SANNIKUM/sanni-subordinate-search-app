import React, { useState } from 'react';

import Subordinates from './subordinates';

function SearchSubordinates(props){

    const [employeeName, changeName] = useState(null);
    const [isTyping, changeTyping]  = useState(true);
    console.log("SearchSubordinates",props);
    function  handleChange(event){
        const employeeName = event.target.value;
        const isTyping =true;
        changeName(employeeName);
        changeTyping(isTyping);
    }

    const RecursiveFecth =  (employees,level)=>{
        const isTyping =false;    
        if(level==1){
            let employeeName = employees[0];
            changeName(employeeName);
            props.actions.clearEmployee();
            
        }
        employees.forEach(emp => {            
            props.actions.fetchEmployeeDetail(emp,level,RecursiveFecth).then(()=>{
                console.log('Success');
             }).catch((err)=>{
                 console.log("error",err);
                 changeTyping(isTyping);
             })
        });
       
    }
    function handleClick(){
       
        const employees = [employeeName]   
        RecursiveFecth(employees,1);
    }

    return (
        <>
            <div className="row content" >
                <div className="row" style={{width:"100%", border:"none"}} >
                    <div className="col-sm-6 hft">
                      <input type="text" name="employeeName"  className="form-control" value={employeeName? employeeName:''} placeholder="enter employee name" onChange={handleChange} />
                    </div>
                    <div className="col-sm-6 hft">
                      <input type="button"  className="form-control" value="Search" onClick={handleClick} />
                     </div>
                     <Subordinates 
                     {...props.data}
                      RecursiveFecth ={RecursiveFecth} 
                      isTyping={isTyping} 
                      employeeName={employeeName} />
                 </div>
                
            </div>
        </>
    );
}

export default SearchSubordinates;