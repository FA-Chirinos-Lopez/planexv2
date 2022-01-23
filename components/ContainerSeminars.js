import { useState } from "react";

export default function ContainerSeminars({title, subtitle, description,timeStart,timeEnd, left2}) {
    
    /* const date = new Date();
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    console.log(hour, minutes, seconds)
    
 */

    //Thu Jan 13 2022 14:20:47 GMT+0000 (Greenwich Mean Time)


    const [time,setTime] = useState("")
    // initial
  let d = new Date();
  //setTime(d.toString().slice(16, 24))

  // update
  setInterval(() => {
    d = new Date();
    setTime( d.toString().slice(16, 24))
  }, 1000);



    const date = new Date()
    const date1 = date.toString()
    const date2 = date1.split(" ")[4]
    
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
            getValueInMinutes(time)<getValueInMinutes(timeEnd)){
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
    

 if(getValueInMinutes(time)<getValueInMinutes(timeEnd)){
    return (
      
            <li className="mainSeminars__item">
              
                <div className="mainSeminars__item__grid">
                
                    <h1 className="mainSeminars__item__grid__h1">{title}</h1>
                    <h2 className="mainSeminars__item__grid__h2">{subtitle}</h2>
                    <p className="mainSeminars__item__grid__description">{description}</p>
                
                    <p className="mainSeminars__item__grid__time">{timeStartDisplay} to {timeEndDisplay}</p>
                    <p className="mainSeminars__item__grid__notify">{isNow()}</p>
                </div>
            </li>
        
    
    )}else{return null}
    
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




