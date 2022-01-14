import SpacerSL from "./SpacerSL"

export default function Container(props) {
    
    /* const date = new Date();
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    console.log(hour, minutes, seconds)
    
 */

    //Thu Jan 13 2022 14:20:47 GMT+0000 (Greenwich Mean Time)
    const date = new Date()
    console.log(date)
    const date1 = date.toString()
    const date2 = date1.split(" ")[4]
    console.log(date2)
    console.log(date2.slice(0,5))


   const ftime=""

   if(props.left2){
       console.log(props.left2)

       const time = props.left2.split("");
        //["0", "0", ":", "0", "0", ":", ......]

        const time1 = time.slice(0, 5);
        // ["0", "0", ":", "0", "0"]

        
        //"00:00"
        ftime =  time1.join("")
        console.log(ftime)
    
   }
    


    return (
        <div>
            <div style={{paddingTop:"0.5rem"}}>
            <div className='container'>
            <div className="row">
            <div className="col-3" style={{ paddingTop:"1rem", position:"relative", left:"-2.5rem"}}>
            <h1>{props.left1}</h1>
            {props.left2?(
            <h3 >{ftime}</h3>):(null)
            }
            </div>
            
            <div className="col" style={{ position:"relative", left:"-2.5rem"}} >
                 <h1 >{props.title}</h1>
                 <h2></h2>
                 <h3>{props.subtitle}</h3>
          {/*<h3>{seminarsData.attributes.time}</h3>*/}
                 
                 <p>{props.description}</p>
                 </div>
                 </div>
                 </div>
                 
                 </div>
                 <SpacerSL/>
        </div>
    )
}
