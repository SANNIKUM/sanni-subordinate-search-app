import React, { useState} from 'react';

export default function History({changeName, history}){
    
        return(
            <div className="aajZCb">
                <ul className="erkvQe" >
                { 
                   history&& history.map((item, index) => 
                    <li key={index} className="sbct" onClick={()=> changeName(item)} >
                        <div className="suggestions-inner-container">
                            <div className="sbtc">
                                <div className="sbl1">
                                    <span>{item}</span>
                                </div>
                             </div>
                       </div>
                    </li>
                    )
                }
                </ul>
            </div>
        );

}