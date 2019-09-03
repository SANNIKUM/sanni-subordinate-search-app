import React, { useState } from 'react';

import Subordinates from './subordinates';
import History from './history';

function SearchSubordinates(props){

    const [employeeName, changeName] = useState(null);
    const [isTyping, changeTyping]  = useState(false);
    const [isSearched, setSearch] = useState(false);
    const [history, setHistory] = useState([]);
    console.log("SearchSubordinates",props);

    function  handleChange(event){
        const employeeName = event.target.value;
        const isTyping =true;
        changeName(employeeName);
        changeTyping(isTyping);
        GetHistoryData();
    }

    const GetHistoryData = ()=>{
        let history = localStorage.getItem('history');
        if(history)
        setHistory(JSON.parse(history));
    }

    const SetHistoryData = (employeeName)=>{
        let history = localStorage.getItem('history');
        let isPersent =false;
      
        if(history){
            history = JSON.parse(history);
            history.forEach((name)=>{
                if(name==employeeName){
                    isPersent=true;
                }
            })
            if(!isPersent){
                history.push(employeeName);
            }
        } else{
            history=[];
            history.push(employeeName);
        }
        localStorage.setItem('history',JSON.stringify(history));
    }

    const RecursiveFecth =  (employees,level)=>{
        SetHistoryData(employees[0]);
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
                 setSearch(true);
             })
        });
       
    }
    function handleClick(){       
        const employees = [employeeName]  
        setSearch(true);
        RecursiveFecth(employees,1);
    }

    function handleBlur(){
        const isTyping =false; 
        setTimeout(()=>changeTyping(isTyping),500);
    }

    return (
        <>
            <div className="row content" >
                <div className="row" style={{width:"100%", border:"none"}} >
                    <div className="col-sm-6 hft">
                      <input 
                        type="text" 
                        name="employeeName"  
                        className="form-control pdl20" 
                        value={employeeName? employeeName:''} 
                        placeholder="enter employee name" 
                        onChange={handleChange} 
                        onBlur = {handleBlur}
                        autoComplete="off"
                        />
                      {history&& history.length>0&& isTyping&&<History history={history}  changeName ={changeName}  />}
                    </div> 
                    <div className="col-sm-6 hft">
                      <input type="button"  className="form-control" value="Search" onClick={handleClick} />
                     </div>
                     <Subordinates 
                     {...props.data}
                      RecursiveFecth ={RecursiveFecth} 
                      isSearched={isSearched} 
                      employeeName={employeeName} />
                 </div>
                
            </div>
        </>
    );
}

export default SearchSubordinates;