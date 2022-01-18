
import { useState } from "react"
import SeminarsHeader from "./SeminarsHeader"
import SeminarsFooter from "./SeminarsFooter"
import { months,days } from "../utils/daysandmonths"

export default function Layout(props) {
  const contentType = true;
  

  const [time,setTime] = useState("")
      // initial
    let d = new Date();
    //setTime(d.toString().slice(16, 24))

    // update
    setInterval(() => {
      d = new Date();
      setTime( d.toString().slice(16, 24))
    }, 1000);



    return (
      <div className="layout">
      
        <div className="screenSeminars">
        <div className="dateSeminars">{days[d.getDay()]} {time}</div>
        {contentType ?(<SeminarsHeader theatreName={props.theatreName} topicOrSubtitle={props.topicOrSubtitle} sponsoredByImg={props.sponsoredByImg} />):(null)}

        {contentType ? <ul className="mainSeminars">{props.children}</ul>
        :(null)}
        
        
        
        

        {contentType?(<SeminarsFooter EventName={props.EventName} EventStart={props.EventStart} EventEnd={props.EventEnd} FooterImage={props.FooterImage} />):(null)}
      </div>
      </div>
    )
}
