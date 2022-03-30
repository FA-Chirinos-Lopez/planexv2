import React, { useState } from "react";

export default function ContainerSeminars({title, subtitle, description,seminarDate,timeStart,timeEnd, left2}) {

  const [time,setTime] = useState("")

  let d = new Date();


  // update and clean when unmount

  React.useEffect(()=>{

    let timeUpdateInterval = setInterval(() => {
      d = new Date();
      setTime( d.toString().slice(16, 24))
      //console.log(time)
    }, 5000)

    return ()=>{
      clearInterval(timeUpdateInterval)
    }
    },[])


    //console.log(timeStart, " ", timeEnd)

    const date = new Date()
    const date1 = date.toString()
    const date2 = date1.split(" ")[4]
    let dayOfTheMonth = date.getDate()
    let actualMonth = date.getMonth()+1
    
    function getDayNumber(DateToCut){
      
      if(DateToCut){
        const cuttedDate = DateToCut.split("-")
        const t1 = cuttedDate[2]+"-"+cuttedDate[1]
        
        if(cuttedDate[2].slice(0,1)<=0)
        {
          return cuttedDate[2].slice(1,2)
        }else{
          return cuttedDate[2]
        }
        
        
      }}


      function getMonthNumber(DateToCut){
        if(DateToCut){
          const cuttedDate = DateToCut.split("-")
          
          const t1 = cuttedDate[2]+"-"+cuttedDate[1]
          
          if(cuttedDate[1].slice(0,1)<=0)
          {
            return cuttedDate[1].slice(1,2)
          }else{
            return cuttedDate[1]
          }
          
          
        }}
      


      const checkDateForSeminar =()=>{
        if(dayOfTheMonth == getDayNumber(seminarDate) && actualMonth == getMonthNumber(seminarDate)){
        return true
      }else{
        return false
      }}

    //console.log(checkDateForSeminar())


    function getValueInMinutes(timeToTransform){
        const t1 = timeToTransform.split(":")
        const hoursToMinutes = t1[0]*60
        const a = parseInt(t1[1])
        const timeInMinutes = a+hoursToMinutes
        return timeInMinutes
    }
    // console.log(getValueInMinutes(timeStart),"start")
    // console.log(getValueInMinutes(timeEnd),"end")
    // console.log(getValueInMinutes(time),"time")
    function isNow(){
        if(
            getValueInMinutes(timeStart)<getValueInMinutes(time) 
            && 
            getValueInMinutes(time) < getValueInMinutes(timeEnd)) {
            
           return "ON NOW"
        }else{
            return 
        }
    }
    const timeStartDisplay=""

   if(timeStart){
       const time = timeStart.split("")
        const time1 = time.slice(0, 5)
        timeStartDisplay =  time1.join("")
    
   }

   const timeEndDisplay=""

   if(timeStart){
       const time = timeEnd.split("")
        const time1 = time.slice(0, 5)
        timeEndDisplay =  time1.join("")
    
   }
   //console.log(getValueInMinutes(time))
    //let seminarsCounter = 0
    //seminarsCounter = seminarsCounter +1
 if(getValueInMinutes(time)<getValueInMinutes(timeEnd) && checkDateForSeminar()){
  
  //console.log(seminarsCounter)
    return (
      
            <li className="mainSeminars__item">
              <div className="mainSeminars__item2">
                <div className="mainSeminars__item__gridLeft">                          
                            <h1 className="mainSeminars__item__gridLeft__h1">{title}</h1>
                            <h2 className="mainSeminars__item__gridLeft__h2">{subtitle}</h2>
                            <p className="mainSeminars__item__gridLeft__description">{description}</p>
                    </div>
                </div>

                    <div className="mainSeminars__item__gridRight">
                    <p className="mainSeminars__item__gridRight__time">{timeStartDisplay} to <br/>{timeEndDisplay}</p>
                            <p className="mainSeminars__item__gridRight__notify">{isNow()}</p>
                    </div>
              
            </li>
        
    
    )}else{return false}
    
}



//         <div>
//             <div style={{paddingTop:"0.5rem"}}>
//             <div classNameName='container'>
//             <div classNameName="row">
//             <div classNameName="col-3" style={{ paddingTop:"1rem", position:"relative", left:"-2.5rem"}}>
//             <h1>{props.left1}</h1>
//             {props.left2?(
//             <h3 >{timeStart}</h3>):(null)
//             }
//             </div>
            
//             <div classNameName="col" style={{ position:"relative", left:"-2.5rem"}} >
//                  <h1 >{props.title}</h1>
//                  <h2></h2>
//                  <h3>{props.subtitle}</h3>
//           {/*<h3>{seminarsData.attributes.time}</h3>*/}
                 
//           <p>{props.description}</p>
//           </div>
//           </div>
//           </div>
          
//           </div>
//           <SpacerSL/>
//  </div>




