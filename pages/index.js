import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";




const URL = "https://backend-l3ahb.ondigitalocean.app"

export default function Home({screensData}) {
  return (
    <div>
    <Layout>
    <div className="container" >
    
    <h1 className="display-5">Screens Main View</h1>
    <div className="row g-2" >
    
    {screensData.map((screensData,id) => (
        <div  key={id} className="col-6 card " style={{width: "18rem", height:"13rem"}}>
        <h3 className="card-title" style={{textAlign: "center"}}>{screensData.attributes.screenName}</h3>
        <Link href={`/${id+1}`}>
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


export async function getServerSideProps() {
  console.log(process.env.DB_URL)
   try {
  const resScreens = await fetch(URL+"/api/screens?populate=%2A");

  const dataScreens = await resScreens.json();
  const screensData = dataScreens.data
    return {
      props: {
        screensData,
      },
    };
  } catch (error) {
    console.log(error);
  }
}