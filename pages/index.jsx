import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import React from 'react';
import useSWR from "swr"
import ContainerSeminars from "../components/ContainerSeminars";
import { InfoUser, isLogged, Token, checkLogs } from "../utils/logs";
import Router from 'next/router';
import { c1, c2 } from '../styles/colors.module.scss';






const URL = "http://localhost:1337"//"https://admin.viewplanex.uk"//process.env.NEXT_PUBLIC_DBURL 

export {URL}
const router = Router

export default function Home() {
  
  
  //const {theatreInfo} = GetTheatreInfo()
  checkLogs()
  const color1ref = React.useRef(null) 
  const color2ref = React.useRef(null) 

  const colorCambiar = React.useRef(null) 

  const {screensData,isLoading,isError} = GetScreensData()
  //console.log(screensData)
  const {screensID,issLoading,issError} = GetScreensID()
  React.useEffect(() => {
    document.title = "Planex ScreensView"
    
    if(!isLogged) Router.push('/login')
    console.log(sessionStorage.getItem("ViewPlanexFrontendToken"))
    console.log(sessionStorage.getItem("ViewPlanexFrontendUserInfoName"))
 }, [])
  
 
 const [colorc1, setColorc1] = React.useState("")
/*  console.log(c1,c2,"COLOR VARIABLES FROM SASS")
 *///  console.log(screensID)
  
  if(isError) return "an error has occured "+{error}
  if(isLoading) return "loading..."
  if(!screensData) return "loading..."
  
  if(isLogged){

  if (screensID) {
    const firstNameActualUser = sessionStorage.getItem("ViewPlanexFrontendUserInfoName")
    

    const logout = () =>{
      sessionStorage.clear()
      Router.push('/login')


      
      setColorc1(c1)
      React.useEffect(() => {

        colorc1 = color1ref.current.value

   }, [])
      
  }
    console.log(colorc1)

    return (
    <div   ref={colorCambiar} className="mainStyle">


    <Layout 
    ContentType="Index"
    >
    
    <input ref={color1ref} type="color" onChange={(evt) => {colorCambiar.current.style.setProperty("--color1", evt.target.value)}}/>
    <input ref={color2ref} type="color" onChange={(evt) => {colorCambiar.current.style.setProperty("--color2", evt.target.value)}}/>
    
    <div  className="mainIndexContainer" style={{background:{colorc1}}} >
    <div   className="topInfo">
    <div  className="userInfo">
    <h3>{firstNameActualUser}</h3>
    <button className="btn btn-primary logoutButton"  onClick={logout}>Logout</button>
    </div>
    
    <h1  className="textIndex">Event name placeHolder </h1>  
    <div>
    
    
    </div>
    </div>
    <br/><br/>

   
    
    <div className="cardsContainer" >
    
    {screensID.map((screensID) => (
        <div  key={screensID.id}  style={{ paddingBottom:"5%" }} className="mainCards" >
        <div className="indexCard">
        <h3 className="titleScreens" style={{textAlign: "center"}}> {screensID.ScreenName}{console.log(screensID.Color1)}</h3>
      
        <Link href={`/${screensID.id}`}>
        <div className="cardBtn" style={{textAlign: "center"}} >
                <h1 className=" btn btn-primary"  >Go to screen</h1>
                
        </div>
        
        </Link>
        </div>
        </div>
    ))}

    </div>
    
    <Link href={`https://admin.viewplanex.uk/admin`}>
    <div className="adminBtn">
            <h1 className="btn btn-primary">Admin Panel</h1>
            
    </div>
    </Link> 
    </div>

    </Layout>
    </div>
  )}else{return <h1>Reload the page</h1>} } else{
    return (
      
      <Layout ContentType="Index">
      <h1 style={{ color:"white"}}>Please log in</h1>
      </Layout>
      )
  }
}



export async function getStaticProps() {
  
  try {
 const resScreens = await fetch(URL+"/api/screens?populate=%2A");
 //const resTheatreInfo = await fetch(URL+"/api/theatre-info?populate=*");
 
 
 const dataScreens = await resScreens.json();
 //const theatreInfo = await resTheatreInfo.json();

 //console.log(dataScreens)
 const initialScreensData = dataScreens.data
 //const initialTheatreInfo = theatreInfo.data

 
 //console.log(initialScreensData)
 
   return {
     props: {
      initialScreensData
     }, revalidate:1
   };
 } catch (error) {
   console.log(error);
 }
}
// async function screenIdFetcher(){
        
//   const res = await fetch("http://localhost:1337/content-manager/collection-types/api::screen.screen", {
//           method: 'GET',
//           headers: myHeaders,
//       })
  
//   const {data} = await res.json()
  
//   return data
// }


const GetScreensID = () => {
  
  const {data,error} = useSWR(
    "/content-manager/collection-types/api::screen.screen",
    fetcherWithToken,
    {revalidateOnMount:true,
      refreshInterval: 5 })
  if(error) return "an error has occured "+{error}
  if(!data) return "loading..."
 

  return {
      screensID: data,
      isLoading: !error && !data,
      isError: error
  }
}


async function fetcherWithToken(url){

  const res = await fetch(URL+"/content-manager/collection-types/api::screen.screen", {
              method: 'GET',
              headers: new Headers({
                "Authorization": "Bearer " + sessionStorage.getItem("ViewPlanexFrontendToken")
              })
            })


  const {results} = await res.json();
  
  return results
}

async function fetcher(url){
    const res = await fetch(URL+url)
    const {data} = await res.json();
    //console.log(data, URL,url)
    return data
  }






  const GetScreensData = () => {
  
  const {data,error} = useSWR(
    "/api/screens?populate=%2A",
    fetcher,
    {
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

/* function GetTheatreInfo(initialTheatreInfo) {
  
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
} */