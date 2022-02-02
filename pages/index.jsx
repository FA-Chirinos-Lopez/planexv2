import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import React from 'react';
import useSWR from "swr"
import ContainerSeminars from "../components/ContainerSeminars";


const URL = "https://admin.viewplanex.uk"//process.env.NEXT_PUBLIC_DBURL 

export {URL}


export default function Home({initialScreensData}) {
  const {theatreInfo} = GetTheatreInfo()
  const {screensData,isLoading,isError} = GetScreensData(initialScreensData)


  React.useEffect(() => {
    document.title = "Planex ScreensView"
 }, [])



  if(isError) return "an error has occured "+{error}
  if(isLoading) return "loading..."
  if(!screensData) return "loading..."
  
  
  if (screensData) {
      
      
    return (
    <div>
    <Layout 
    ContentType="Seminar" 
    EventName={theatreInfo.attributes.EventName} 
    EventStart={theatreInfo.attributes.EventStart} 
    EventEnd={theatreInfo.attributes.EventEnd} 
    FooterImage={theatreInfo.attributes.FooterImage.data.attributes.url} 
    TheatreName={theatreInfo.attributes.TheatreName} 
    TopicOrSubtitle={theatreInfo.attributes.TopicOrSubtitle} 
    SponsoredByImg={theatreInfo.attributes.SponsoredBy.data.attributes.url}>
    <div className="container" style={{display:"flex", flexDirection:"column" }} >
    <div style={{ display:"flex",flexDirection:"column", justifyContent:"space-between", paddingBottom:"10vh"}}>
    <h1 className="display-5" style={{color:"white", position:"relative", left:"20%"}} >Screens Main View </h1>  
    <br/><br/>
    <Link href={`https://admin.viewplanex.uk/admin`}>
    
    <div>
            <h1 className="display-6 btn btn-primary card-title" style={{position:"relative", left:"20%"}}  >Admin Panel</h1>
            
    </div>
    
    </Link> 
    </div>
    
    <div style={{display:"flex", flexDirection:"row" , justifyContent:"space-around", flexWrap:"wrap"}} >
    
    {screensData.map((screensData) => (
        <div  key={screensData.id} className="card " style={{width: "18rem", height:"13rem",marginTop:"5vh"}}>
        <h3 className="card-title" style={{textAlign: "center", paddingTop:"5vh"}}> {screensData.attributes.screenName}</h3>
      
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