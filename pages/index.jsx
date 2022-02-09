import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import React from 'react';
import useSWR from "swr"
import ContainerSeminars from "../components/ContainerSeminars";
import { Logged } from "../utils/uc";
import { useRouter } from 'next/router'

const URL = "http://localhost:1337"//process.env.NEXT_PUBLIC_DBURL 

export {URL}


export default function Home({initialScreensData}) {
  const {theatreInfo} = GetTheatreInfo()
  const {screensData,isLoading,isError} = GetScreensData(initialScreensData)
  const router = useRouter()

  React.useEffect(() => {
    document.title = "Planex ScreensView"
 }, [])


 React.useEffect(() => {
  if (!(Logged)) {
    router.push('/login')
  }
}, [Logged])
  if(isError) return "an error has occured "+{error}
  if(isLoading) return "loading..."
  if(!screensData) return "loading..."
  
  
  if (screensData) {
      
      
    return (
    <div>
    <Layout 
    ContentType="Index"
    >
    <div className="mainIndexContainer"  >
    
    <h1  className="textIndex">Event name placeHolder </h1>  
    <br/><br/>

   
    
    <div className="cardsContainer" >
    
    {screensData.map((screensData) => (
        <div  key={screensData.id}  style={{ paddingBottom:"5%"}} className="mainCards" >
        <div className="indexCard">
        <h3 className="titleScreens" style={{textAlign: "center"}}> {screensData.attributes.screenName}</h3>
      
        <Link href={`/${screensData.id}`}>
        <div className="cardBtn" style={{textAlign: "center"}} >
                <h1 className=" btn btn-primary"  >Go to screen</h1>
                
        </div>
        
        </Link>
        </div>
        </div>
    ))}

    </div>
    <Link href={`https://admin.viewplanex.uk/admin`}>
    <div>
            <h1 className="btn btn-primary adminBtn">Admin Panel</h1>
            
    </div>
    </Link> 
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