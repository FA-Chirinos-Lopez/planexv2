import Head from "next/head"
import Image from "next/image"
import FooterSL from "./FooterSL"
import HeaderSL from "./HeaderSL"
import { useState } from "react"

export default function Layout({children,ads}) {
  
  const [time,setTime] = useState("00:00")
      // initial
    let d = new Date();
    //setTime(d.toString().slice(16, 24))

    // update
    setInterval(() => {
      d = new Date();
      setTime( d.toString().slice(16, 24))
    }, 1000);


    return (
        <div style={{backgroundColor:"#B9B7BD"}} >
        {ads?(null):(<HeaderSL time={time}/>)}
        
        <Head>
        <link
        href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
        rel="stylesheet"
      />
        </Head>
 
        <main>
        
        {children}
       
        </main>
    <FooterSL/>
    </div>
    )
}
