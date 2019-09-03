import React from 'react';

const Subordinates =({employees, RecursiveFecth, employeeName, isSearched})=>{
    return(
        employees.length?
        employees.map((emp, index)=>{
           return  <div className="row" key={index}>
               <div className="col-sm-4">  <a onClick={()=>RecursiveFecth([emp.name],1)} >{emp.name} </a></div>
          
               <div className="col-sm-4">    <span> {emp.level==2? "Direct":"Indirect"}</span></div>
           </div>
        }) :  isSearched? <div className="row notfound">No Subordinate found for {employeeName}!</div>:null
    )
}

export default Subordinates;