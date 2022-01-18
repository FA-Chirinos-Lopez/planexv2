import FooterSL from "./FooterSL";
import HeaderSL from "./HeaderSL";
import Layout from "./Layout";
import SpacerSL from "./SpacerSL";


export default function AdsContainer(props) {

    
   if (props.Time){
    const time = props.Time.split("");
    //["0", "0", ":", "0", "0", ":", ......]

    const time1 = time.slice(0, 5);
    // ["0", "0", ":", "0", "0"]

    
    //"00:00"
    const ftime =  time1.join("")}
    
    return (
        <div >
        <header className="header">
		<h1 className="header__h1">Call to action</h1>
	    </header>
        <main className="main">
         
            
            <div className="main__image" ><img src={props.img} /></div>
            
            
            <div className="main__cta"><h1 className="main__cta_h1">{props.CallToAction}</h1></div> 
            <main className="main__time">
            <div className="main__time__container">
            <div className="main__time__container__h1"><h1>{ftime}</h1></div>
            <div className="main__time__container__h2"><h2>{props.Title}</h2></div>
            <div className="main__time__container__h3"><h3>{props.Location}</h3></div>
            </div>
            </main>
           
        </main>
        
        </div>

    )
}
