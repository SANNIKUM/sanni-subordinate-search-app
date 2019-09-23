import React, { useState } from 'react';

import Subordinates from './subordinates';
import History from './history';

function SearchSubordinates(props){

    const [employeeName, changeName] = useState(null);
    const [isTyping, changeTyping]  = useState(false);
    const [isSearched, setSearch] = useState(false);
    const [history, setHistory] = useState([]);
    const [isSearchedDD, setDD] = useState(false);
    const [myList, ChangeList] = useState({list:[{id:1,name:"A", isSelected:false},{id:2,name:"B",isSelected:false},{id:3,name:"C",isSelected:false}]});
    const [selectedValue, setSelectedValue] = useState('');

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

    const FetchSubordinatesAPI =  (empName)=>{
            SetHistoryData(empName);
            changeName(empName);
            props.actions.fetchEmployeeDetail(empName);
        
       
    }
    function handleClick(){       
        setSearch(true);
        FetchSubordinatesAPI(employeeName,1);
    }

    function showDD(){
        const searchedDD = !isSearchedDD;
        console.log("myList.list",myList.list)
        setDD(searchedDD);
    }

    function handleBlur(){
        const isTyping =false; 
        setTimeout(()=>changeTyping(isTyping),500);
    }

    function addItem(item){
        debugger
        const mylist = myList;
        let value = '';
        mylist.list.forEach(i=>{
            if(item.id == i.id)
            i.isSelected = !item.isSelected;
            if(i.isSelected){
                value+=i.name;
            }
        })

        setSelectedValue(value);
       
    }

    return (
        <>
            <div className="row content" >
            <div className="row" style={{width:"100%", border:"none"}} >
            <div className="col-sm-6 hft">
                <input onChange={()=>{}} type="text" value={selectedValue} height="50px" ></input><span onClick={showDD} className="downarrow">V</span>
                <ul className={isSearchedDD? "ms show":"ms hide" }>
                {myList.list.map((item,index)=>  
                     <li onClick={()=>addItem(item)} key={"ll"+index}> <input onChange={()=>{}} checked={item.isSelected} type="checkbox" key={"cb"+index} />{item.name}</li>
                
                )}
                </ul>
                </div>
                </div>
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
                      FetchSubordinatesAPI ={FetchSubordinatesAPI} 
                      isSearched={isSearched} 
                      employeeName={employeeName} />
                 </div>
                
            </div>
        </>
    );
}

export default SearchSubordinates;