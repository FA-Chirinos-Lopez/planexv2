import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import Datetime from 'react-datetime';



export default function HeaderSL(props) {
  /*   let date1
    let date2=["00","00"]
    let day 
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    let date 
    let dayN
    let actualDay
    setInterval(() => {
    date = new Date()
    dayN = date.getDay()
    //console.log(date)
    date1 = date.toString()
    date2 = date1.split(" ")[4]
    day = date1.split(" ")[0]
    //console.log(date2)
    //console.log(date2.slice(0,5))
    actualDay = days[dayN-1]
    //console.log(actualDay) */
    
    
   // }, 1000);

    
    return (
        <div style={{height:"10vh", width:"100%", backgroundColor:"black" }}>
            
            <div className="row" style={{paddingTop:"1rem"}}>
            <div className="col title" style={{border:"solid red", marginLeft:"4rem"}}>
            <h1 style={{color:"white"}}></h1>
            
            <h2 style={{color:"white", width:"300px" , margin:0}}>{props.time}</h2>
            
            </div>
            <div className="col" style={{position:"relative", right:"8rem", border:"solid red"}}>
            <h1 style={{color:"white"}}>Theatre Name Topic</h1>
            </div>
            
            </div>
            
        </div>
    )
}
