
import { useState, useEffect } from "react"
import SeminarsHeader from "./SeminarsHeader"
import SeminarsFooter from "./SeminarsFooter"
import { months,days } from "../utils/daysandmonths"
import AdsContainer from "./AdsContainer";
import { FullScreen } from "react-full-screen";











export default function Layout(props) {
  const contentType = props.ContentType;
  const fullScreen = props.FullScreen
  
  
      // initial
    let d = new Date();
    //setTime(d.toString().slice(16, 24))
    // update
    const [time,setTime] = useState(d.toString().slice(16, 24))    
    setInterval(() => {
      d = new Date();
      setTime( d.toString().slice(16, 24))
    }, 1000);
    



    // function HeaderByFullScreen(){
    //   if(fullScreen)
    // }
    if(contentType=="1")
    {
      return(
      <div className="layout">
      <div className="ads__screen">
        <div className="ads__date">{days[d.getDay()]} {time}</div>

        <ul className="mainSeminars">{props.children}</ul>
        
      
      </div>
    </div>

      )}
        
    else if(contentType=="Seminar")
    {
      return (//RENDER SEMINARS
        <div className="layout"  >

          <div className="screenSeminars" >
          <div className="dateSeminars" >{days[d.getDay()]} {time}</div>
          {contentType ?(<SeminarsHeader 
                            TheatreName={props.TheatreName} 
                            TopicOrSubtitle={props.TopicOrSubtitle} 
                            SponsoredByImg={props.SponsoredByImg} />):(null)}
  
          {contentType ? <ul className="mainSeminars">{props.children}</ul>
          :(null)}
  
          {contentType?(<SeminarsFooter 
                          EventName={props.EventName} 
                          EventStart={props.EventStart} 
                          EventEnd={props.EventEnd} 
                          FooterImage={props.FooterImage} />):(null)}
        </div>
        </div>
      )
  }else if(contentType=="Advertisement" && !fullScreen){
    return(//RENDER NORMAL ADVERTS
      <div className="layout">
      
      <div className="ads__screen">
      <div className="dateSeminars" >{days[d.getDay()]} {time}</div>

        <SeminarsHeader 
        TheatreName={props.TheatreName} 
        TopicOrSubtitle={props.TopicOrSubtitle} 
        SponsoredByImg={props.SponsoredByImg} />

        {props.children}
        
        <SeminarsFooter 
        EventName={props.EventName} 
        EventStart={props.EventStart} 
        EventEnd={props.EventEnd} 
        FooterImage={props.FooterImage} />
      </div>
    </div>
      )
  }else if(contentType=="Advertisement" && fullScreen){
    return(
      <div className="layout">
        <div className="adsFullScreen__screen">
        <div className="dateSeminars" >{days[d.getDay()]} {time}</div>
            <main className="adsFullScreen__main">
                {props.children}
            </main>
            <SeminarsFooter 
            EventName={props.EventName} 
            EventStart={props.EventStart} 
            EventEnd={props.EventEnd} 
            FooterImage={props.FooterImage} />
        </div>
    </div>
   
    )
  }
}
