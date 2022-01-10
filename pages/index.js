import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";




const URL = "https://backend-l3ahb.ondigitalocean.app"

export default function Home({screensData}) {




  return (
    <div>
    <Layout>
    <div className="container" >
    ww
    <h1 className="display-5">Screens Main View</h1>
    <div className="row g-2" >
    
    {screensData.map((screensData) => (
        <div  key={screensData.id} className="col-6 card " style={{width: "18rem", height:"13rem"}}>
        <h3 className="card-title" style={{textAlign: "center"}}>ID:{screensData.id}</h3>
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
  )
}


export async function getStaticProps() {
  console.log(process.env.DB_URL)
   try {
  const resScreens = await fetch(URL+"/api/screens?populate=%2A");

  const dataScreens = await resScreens.json();
  const screensData = dataScreens.data
  console.log(screensData)
  
    return {
      props: {
        screensData,
      },revalidate:1
    };
  } catch (error) {
    console.log(error);
  }

}
