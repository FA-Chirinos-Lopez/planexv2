
import React, { useState, useEffect } from "react"
import SeminarsHeader from "./SeminarsHeader"
import SeminarsFooter from "./SeminarsFooter"
import { months,days } from "../utils/daysandmonths"
import AdsContainer from "./AdsContainer";
import { FullScreen } from "react-full-screen";
import Head from "next/head";










export default function Layout(props) {
  const contentType = props.ContentType;
  const fullScreen = props.FullScreen
  
  let d = new Date();
  const [time,setTime] = useState(d.toString().slice(16, 21))


    React.useEffect(()=>{

    let timeUpdateInterval = setInterval(() => {
      d = new Date();
      setTime( d.toString().slice(16, 21))
    }, 10000)

    return ()=>{
      clearInterval(timeUpdateInterval)
    }
    },[])



    // function HeaderByFullScreen(){
    //   if(fullScreen)
    // }
    if(contentType=="Index")
    {
      return(
      <div className="layout">
      <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="screenSeminars" >
      <div className="dateSeminars" >{days[d.getDay()]} {time}</div>

        <ul className="mainSeminars">{props.children}</ul>
        
      
      </div>
    </div>

      )}
        
    else if(contentType=="Seminar")
    {
      return (//RENDER SEMINARS
        <div className="layout"  >
        <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        </Head>
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
      <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      </Head>
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
      <Head>
      <link rel="shortcut icon" href="/favicon.png" />
      </Head>
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
