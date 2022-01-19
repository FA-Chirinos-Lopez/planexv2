import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import React from 'react';
import useSWR from "swr"
import ContainerSeminars from "../components/ContainerSeminars";


const URL = "http://localhost:1337" //"https://backend-l3ahb.ondigitalocean.app"

export {URL}


export default function Home({initialScreensData}) {
  const {theatreInfo} = GetTheatreInfo()
  const {screensData,isLoading,isError} = GetScreensData(initialScreensData)
  if(isError) return "an error has occured "+{error}
  if(isLoading) return "loading..."
  if(!screensData) return "loading..."    
  if (screensData) {
      
      
    return (
    <div>
    <Layout 
    contentType="Seminar" 
    EventName={theatreInfo.attributes.EventName} 
    EventStart={theatreInfo.attributes.EventStart} 
    EventEnd={theatreInfo.attributes.EventEnd} 
    FooterImage={theatreInfo.attributes.FooterImage.data.attributes.url} 
    theatreName={theatreInfo.attributes.TheatreName} 
    topicOrSubtitle={theatreInfo.attributes.TopicOrSubtitle} 
    sponsoredByImg={theatreInfo.attributes.SponsoredBy.data.attributes.url}>
    <div className="container" >
    
    <h1 className="display-5" style={{color:"white"}}>Screens Main View </h1>
    <div className="row g-2" >
    
    {screensData.map((screensData) => (
        <div  key={screensData.id} className="col-6 card " style={{width: "18rem", height:"13rem"}}>
        <h3 className="card-title" style={{textAlign: "center"}}>{screensData.attributes.ScreenName} ID:{screensData.id}</h3>
        <Link href={`/${screensData.id}`}>
        <div style={{textAlign: "center"}} >
                <h1 className="display-6 btn btn-primary card-title"  >Go to screen</h1>
                
        </div>
        
        </Link>       
        </div>
    ))}

    </div>
    </div>
    </Layout>
    </div>
  )}
}



export async function getStaticProps() {
  
  try {
 const resScreens = await fetch(URL+"/api/screens?populate=%2A");
 const resTheatreInfo = await fetch(URL+"/api/theatre-info?populate=*");
 
 
 const dataScreens = await resScreens.json();
 const theatreInfo = await resTheatreInfo.json();

 
 const initialScreensData = dataScreens.data
 const initialTheatreInfo = theatreInfo.data

 
 
 
   return {
     props: {
      initialScreensData,initialTheatreInfo
     }, revalidate:1
   };
 } catch (error) {
   console.log(error);
 }
}



async function fetcher(url){
  const res = await fetch(URL+url)
  const {data} = await res.json();
  
  return data
}


  function GetScreensData({initialScreensData}) {
  
  const {data,error} = useSWR(
    "/api/screens?populate=*",
    fetcher,
    {fallbackData:initialScreensData,
      revalidateOnMount:true,
      refreshInterval: 5 })
  if(error) return "an error has occured "+{error}
  if(!data) return "loading..."
  console.log(data)
  return {
      screensData: data,
      isLoading: !error && !data,
      isError: error
  }
}

function GetTheatreInfo(initialTheatreInfo) {
  
  const {data,error} = useSWR(
    "/api/theatre-info?populate=*",
    fetcher,
    {fallbackData:initialTheatreInfo,
      revalidateOnMount:true,refreshInterval: 5 })
  if(error) return "an error has occured "+{error}
  if(!data) return "loading..."
  
  return {
      theatreInfo: data,
      isLoading: !error && !data,
      isError: error
  }
}