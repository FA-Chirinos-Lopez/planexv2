import useSWR, { mutate } from "swr"
import Link from "next/link";
import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';



const URL = "https://backend-l3ahb.ondigitalocean.app"



export default function dashboardSWR({}) {
  
      const {data,error} = useSWR("/api/screens?populate=*",fetcher,{revalidateOnMount:true,refreshInterval: 5 })
      if(error) return "an error has occured "+{error}
      if(!data) return "loading..."
      if(data) {let screensData = data}
      if(!screensData) return "loading..."    
      if (screensData) {
        
        console.log("HAY DATOS")
        console.log(screensData,"yehe")
        let halldescriptorsData = screensData[0].attributes
        console.log(halldescriptorsData)
        return (
        <div>
        <Layout>
        <div className="container" >
    <h1>{screensData[0].attributes.ScreenName}</h1>
    <div className="row g-2" ></div>
        <div>
        {screensData.map((screensData) => (
            <div  key={screensData.id} className="col-6 card " style={{width: "18rem", height:"13rem"}}>
            <h3 className="card-title" style={{textAlign: "center"}}>{screensData.attributes.ScreenName} IID:{screensData.id}</h3>
            <Link href={`/${screensData.id}`}>
            <div style={{textAlign: "center"}} >
                    <h1 className="display-6 btn btn-primary card-title"  >Go to screen</h1>
                    
            </div>
            
            </Link>       
            </div>
        ))}
        </div>
        <Layout>
        
        
        </Layout>
        </div>
        </Layout>
        </div>
        
    )}
}


  /* 
    const {data,error} = useSWR("/api/screens?populate=*",fetcher,{initialData: initialScreensData, revalidateOnMount:true,refreshInterval: 5 })
    if(error) return "an error has occured "+{error}
    
    if(!data) return "loading..."
    console.log(data,"DATA") */

/*       {screensData.map((screensData) => (
            <div  key={screensData.id} className="col-6 card " style={{width: "18rem", height:"13rem"}}>
            <h3 className="card-title" style={{textAlign: "center"}}>{screensData.attributes.ScreenName} IID:{screensData.id}</h3>
            <Link href={`/${screensData.id}`}>
            <div style={{textAlign: "center"}} >
                    <h1 className="display-6 btn btn-primary card-title"  >Go to screen</h1>
                    
            </div>
            
            </Link>       
            </div>
        ))}
       */


export async function getStaticProps() {
  
    try {
   const resScreens = await fetch(URL+"/api/screens?populate=%2A");
 
   const dataScreens = await resScreens.json();
   const initialScreensData = dataScreens.data
   console.log(initialScreensData,"datos de getstaticsprops")
     return {
       props: {
        initialScreensData,
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


    function getScreensData({initialScreensData}) {
    
    const {data,error} = useSWR("/api/screens?populate=*",fetcher,{ initialData:initialScreensData,revalidateOnMount:true,refreshInterval: 5 })
    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
  
    return {
        screensData: data,
        isLoading: !error && !data,
        isError: error
    }
  }