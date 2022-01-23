import React from 'react'
import ReactPlayer from 'react-player'
import { CurrentTimeDisplay, Player } from 'video-react';
import {currentSlide} from "../components/Slider";



export default function AdsContainer({timeSlide,CallToAction,Location,Title,Description,FullScreen,Img,DescriptionSecondParagraph,Type,IndexNumber,CurrIndexSlider}) {
  
    const Image="Image"
    const Video="Video"
   
    




//    if (props.Time){
//     const time = props.Time.split("");
//     //["0", "0", ":", "0", "0", ":", ......]

//     const time1 = time.slice(0, 5);
//     // ["0", "0", ":", "0", "0"]

    
//     //"00:00"
//     const ftime =  time1.join("")}
const playBycurr = "autoPlay"
const img = null




    if(FullScreen && Type=="Video"){
    
     
        return (
            <video  className="videoFullScreen" autoPlay muted loop >
                <source src={Img} type="video/mp4" />
            </video>)

                
            
       
    }else if(FullScreen && Type=="Image"){
        return(
            <img src={Img} alt="" className="adsFullScreen__main__img"/>
        )
    }else if(!FullScreen && Type=="Video"){
        return(
            <main className="adsConainer__main">
                <video className="video" autoPlay muted loop>
                    <source src={Img} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            <div className="adsConainer__main__info">
                    <h1 className="adsConainer__main__info__h1">{CallToAction}</h1>
                    <h2 className="adsConainer__main__info__h2">{Location}</h2>
                    <p className="adsConainer__main__info__p" style={{whiteSpace: "pre-wrap"}}>{Description}</p>
                    <p className="adsConainer__main__info__p" style={{whiteSpace: "pre-wrap"}}>{DescriptionSecondParagraph}</p>
                </div>
            </main>
        )
    }else if(!FullScreen && Type=="Image"){
        return(
            <main className="adsConainer__main">
                <img src={Img} alt="" className="adsConainer__main__img"/>
                <div className="adsConainer__main__info">
                    <h1 className="adsConainer__main__info__h1">{CallToAction}</h1>
                    <h2 className="adsConainer__main__info__h2">{Location}</h2>
                    <p className="adsConainer__main__info__p" style={{whiteSpace: "pre-wrap"}}>{Description}</p>
                    <p className="adsConainer__main__info__p" style={{whiteSpace: "pre-wrap"}}>{DescriptionSecondParagraph}</p>
                </div>
            </main>
        )
        }else{
            return <h1> not working</h1>
        }

   
}








// else if(Type=="Video"){
//     return <h1>Es video</h1>
// }else{
// return (

// )
// }









// <img src={Img} alt="" className="adsFullScreen__main__img"/>

// <div className="ads__screen">
           
// <main className="ads__main">
//     <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2301&q=80" alt="" className="ads__main__img"/>
//     <div className="ads__main__info">
//         <h1 className="ads__main__info__h1">{CallToAction}{Img}Come and see us</h1>
//         <h2 className="ads__main__info__h2">{Location}{FullScreen}</h2>
//         <p className="ads__main__info__p">{Title}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor dignissim convallis aenean et tortor at risus viverra. Nunc aliquet bibendum enim facilisis gravida neque convallis. Curabitur gravida arcu ac tortor.</p>
//         <p className="ads__main__info__p">{Description}Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</p>
//     </div>
// </main>

// </div>





// <header classNameName="header">
// 		<h1 classNameName="header__h1">Call to action</h1>
// 	    </header>
//         <main classNameName="main">
         
            
//             <div classNameName="main__image" ><img src={props.img} /></div>
            
            
//             <div classNameName="main__cta"><h1 classNameName="main__cta_h1">{props.CallToAction}</h1></div> 
//             <main classNameName="main__time">
//             <div classNameName="main__time__container">
//             <div classNameName="main__time__container__h1"><h1>{ftime}</h1></div>
//             <div classNameName="main__time__container__h2"><h2>{props.Title}</h2></div>
//             <div classNameName="main__time__container__h3"><h3>{props.Location}</h3></div>
//             </div>
//             </main>
           
//         </main>




// <div >
//             <main className="ads__main">
//                 <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2301&q=80" alt="" className="main__img"/>
//                 <div className="ads__main__info">
//                     <h1 className="ads__main__info__h1">{CallToAction}{Img}Come and see us</h1>
//                     <h2 className="ads__main__info__h2">{Location}{FullScreen}</h2>
//                     <p className="ads__main__info__p">{Title}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor dignissim convallis aenean et tortor at risus viverra. Nunc aliquet bibendum enim facilisis gravida neque convallis. Curabitur gravida arcu ac tortor.</p>
//                     <p className="ads__main__info__p">{Description}Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.</p>
//                 </div>
//             </main>
//         </div>