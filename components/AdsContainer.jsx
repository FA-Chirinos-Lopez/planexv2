import FooterSL from "./FooterSL";
import HeaderSL from "./HeaderSL";
import Layout from "./Layout";
import SpacerSL from "./SpacerSL";


export default function AdsContainer(props) {
    return (
        <div style={{height:"100vh"}}>
        <Layout>
        <div style={{display:"table", margin:"auto"}}>
         
            
            <div style={{height:"40vh"}}><img src={props.img} height="500vh"/></div>
            <div style={{height:"50vh"}}>
            
            <div style={{position:"relative", top:"20vh"}}><SpacerSL/> <h1>{props.CallToAction}</h1><SpacerSL/> </div> 
            
            <div style={{position:"relative", top:"20vh"}}><h2>{props.Time}</h2></div>
            <div style={{position:"relative", top:"20vh"}}><h3>{props.Title}</h3></div>
            <div style={{position:"relative", top:"20vh"}}><p>{props.Location}</p></div>
            </div>
           
        </div>
        </Layout>
        
        </div>

    )
}
