
import Layout from "../components/Layout";
import Container from "../components/Container";
import AdsContainer from "../components/AdsContainer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slide, Zoom } from "react-slideshow-image";
import React , { Component, useEffect } from "react";
import 'react-slideshow-image/dist/styles.css';
import useSWR from "swr";
import ContainerSeminars from "../components/ContainerSeminars";
import { URL } from ".";
import Slider ,{currentSlide} from "../components/Slider";
import Link from "next/link";





//const URL =  "http://localhost:1337" //"https://backend-l3ahb.ondigitalocean.app"

const slideImages=[""]
export {slideImages}
slideImages.length=0




function findContentURL(data, idToLookFor) {
  var categoryArray = data;
  for (var i = 0; i < categoryArray.length; i++) {
      if (categoryArray[i].id == idToLookFor) {
          return(URL+categoryArray[i].attributes.ExhibitorAnimationOrGraphic.data.attributes.url);
      }
  }
}


export default function ScreensDisplay({ initialScreensData,initialImgDataADS }) {

  React.useEffect(() => {
    document.title = "Planex ScreensView"
 }, [])
  //initialScreensData.id

  

    //FULLSCREEN
  const handle = useFullScreenHandle();
  //RESET ARRAY OF SLIDES
  slideImages.length=0
// IF ONLY ONE SLIDE OR NONE DONT SCROLL
var condSlide= false



switch(slideImages) {
  case 0:
    condSlide = false
    break;
  case 1:
    condSlide = false
    break;
  default:
    condSlide = true
}

  /* const {data,error} = useSWR("/api/screens/"+initialScreensData.id+"?populate=*",fetcher,{revalidateOnMount:true,refreshInterval: 5 })
      if(error) return "an error has occured "+{error}
      if(!data) return "loading..." */
      const id = initialScreensData.id
     
      const {imgDataADS} = GetAdvertisementData()
      const { screensData, isLoading, isError } = GetScreensData(id)
      if (isError) isError
      if(!screensData) return "loading..."    
      if (screensData) {
        console.log(initialScreensData)

        
       
    //ARRAYS DEFINITION
    let seminarsData= screensData.attributes.stage_timetables.data;
    let halldescriptorsData= screensData.attributes.hall_descriptors.data;
    //let advertisementsData= screensData.attributes.advertisementsToAdd.data;
    let advertisementsData= screensData.attributes.advertisements.data;
  
      console.log(screensData.attributes.FooterImge.data.attributes.url)
      
  //ADD SEMINARS
  
  if(seminarsData!=0){

  slideImages.push(    
    
    <Layout
    timeSlide = {screensData.attributes.SeminarsDurationSlide}
    ContentType="Seminar" 
    EventName={screensData.attributes.EventName} 
    EventStart={screensData.attributes.EventStart} 
    EventEnd={screensData.attributes.EventEnd} 
    FooterImage={screensData.attributes.FooterImge.data.attributes.url} 
    TheatreName={screensData.attributes.TheatreName} 
    TopicOrSubtitle={screensData.attributes.TopicOrSubtitle} 
    SponsoredByImg={screensData.attributes.SponsoredBy.data[0].attributes.url}
    >
    {seminarsData && seminarsData.map((seminarsData) => (
     
     <ContainerSeminars 
     key={seminarsData.id} 
     title={seminarsData.attributes.title} 
     subtitle={seminarsData.attributes.subtitle} 
     description={seminarsData.attributes.description} 
     timeStart={seminarsData.attributes.TimeStart} 
     timeEnd={seminarsData.attributes.TimeEnd}/>
    
    ))}

    </Layout>)}
   

   //ADD HALL DESCRIPTORS
  //  if(halldescriptorsData!=0){

  //  slideImages.push(
    
  //   <Layout
  //   timeSlide = {theatreInfo.attributes.HalldescriptorDurationSlide}
  //   ContentType="Seminarr" 
  //   EventName={theatreInfo.attributes.EventName} 
  //   EventStart={theatreInfo.attributes.EventStart} 
  //   EventEnd={theatreInfo.attributes.EventEnd} 
  //   FooterImage={theatreInfo.attributes.FooterImage.data.attributes.url} 
  //   TheatreName={theatreInfo.attributes.TheatreName} 
  //   TopicOrSubtitle={theatreInfo.attributes.TopicOrSubtitle} 
  //   SponsoredByImg={theatreInfo.attributes.SponsoredBy.data.attributes.url}>

  //   {halldescriptorsData && halldescriptorsData.map((halldescriptorsData) => (
     
  //    <Container 
  //    key={halldescriptorsData.id} 
  //    title={halldescriptorsData.attributes.Title} 
  //    subtitle={halldescriptorsData.attributes.Subtitle} 
  //    description={halldescriptorsData.attributes.Description} 
  //    left1={halldescriptorsData.attributes.HallName} />
    
  //   ))}

  //   </Layout>)}

    
    //ADD ADVERTISEMENTS
    
    if(advertisementsData!=0){
    imgDataADS && advertisementsData.map((advertisementsData,index) =>(
        
      
          
          slideImages.push( 
            <Layout
            timeSlide = {screensData.attributes.SeminarsDurationSlide}
            ContentType="Advertisement" 
            EventName={screensData.attributes.EventName} 
            EventStart={screensData.attributes.EventStart} 
            EventEnd={screensData.attributes.EventEnd} 
            FooterImage={screensData.attributes.FooterImge.data.attributes.url} 
            TheatreName={screensData.attributes.TheatreName} 
            TopicOrSubtitle={screensData.attributes.TopicOrSubtitle} 
            SponsoredByImg={screensData.attributes.SponsoredBy.data[0].attributes.url}
            >
        
              <AdsContainer
              timeSlide = {advertisementsData.attributes.Duration}
              key={advertisementsData.id}
              IndexNumber={index}
              CurrIndexSlider={currentSlide}
              Type={advertisementsData.attributes.Type}
              FullScreen={advertisementsData.attributes.FullScreen} 
              Img={findContentURL(imgDataADS,advertisementsData.id)} 
              CallToAction={advertisementsData.attributes.CallToAction}
              Time={advertisementsData.attributes.Time} 
              Title={advertisementsData.attributes.Title}  
              Location={advertisementsData.attributes.Location}
              Description={advertisementsData.attributes.Description}
              DescriptionSecondParagraph={advertisementsData.attributes.DescriptionSecondParagraph}/>
                
          </Layout>
        
        )))}
//               {findContentURL(imgDataADS,advertisementsData.id)} {isVideo(imgDataADS,advertisementsData.id)} 

        switch(slideImages.length) {
          case 0:
            condSlide = false
            break;
          case 1:
            condSlide = false
            break;
          default:
            condSlide = true
        }
        
     
  
       
       
       const zoomOutProperties = {
        indicators: true,
        scale: 0.4
      }
      
    return (
      <div >
        <header style={{background:"#294b79",display:"flex", flexDirection:"column",position:"relative", left:"0",right:"0", width:"100%", height:"10%", zIndex:"1"}}>
        <div className="btn-group" role="group" style={{display:"flex",height:"150%"}} >
          <Link href={`/`}>
            <button type="button" className="btn btn-primary" style={{width:"100%", background:"#2d173d", borderColor:"#7c6a86", fontSize:"150%"}} >GoBack</button>
          </Link>
          <button type="button" className="btn btn-primary" onClick={handle.enter} style={{width:"100%", background:"#2d173d", borderColor:"#7c6a86"}}>Enter FullScreen</button>
          
        </div>
        <h4 style={{ alignSelf:"center",color:"white",backgroundColor:"#294b79"}}>
          Press esc to exit FullScreen mode
        </h4>
        </header>
      <FullScreen handle={handle}>
        
      <Slider></Slider>
      </FullScreen>

    <div >


    </div>
  
    
    <div>
      
    </div>
   
    
      </div>
    )}
  }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






  //       NEW SLIDER
  

  // const Slider = ({ slides }) => {
  //   // Create a curr state indicating what's the current slide's index
  //   const [curr, setCurr] = React.useState(0);
  //   const effectSlider = ["Ease" , "Slide"]
    
    
  //   const { length } = slides;
  //   const delay = [2000,7000,3000]
  //   const goToNext = () => {
  //     // Check if we've reached the final slide in the array
  //     // If so, go back to 0, else curr + 1
  //     setCurr(curr === length - 1 ? 0 : curr + 1);
  //   }
    
  //   // useEffect will run at every re-render
  //   React.useEffect(() => {
  //     // At every render, set a new timeout to go to the next slide
      
  //     setTimeout(goToNext, slideImages[curr].props.timeSlide*1000);
  //     console.log(curr)
  //     // And, when unmounting <Slider />, clear the timeout
  //     // See the reactjs.org docs on hooks for more info
  //     return function() {
  //       clearTimeout(goToNext);
  //     }
  //   })
  //   // setInterval(() => {
      
  //   //   console.log(slideImages[100000])
  //   // }, 1000);
  //   //slideImages[100000]=curr
  //   if (!Array.isArray(slides) || length <= 0) {
  //     return null;
  //   }
    
  //   if(effectSlider[0]=="Ease"){
  //     return (
  //     <section className="slider">
     
  //     {slides.map((each, index) => (
  //       <div
  //         // if active slide, include the "active" class
  //         className={index === curr ? "slide active" : "slide"}
  //         key={index}
  //         // if not active, hide from screen readers for accessibility
  //         aria-hidden={index !== curr}
  //       >
  //         <div>
  //         <div>{each}</div>
  //         </div>
          
  //       </div>
  //     ))}
        
  //     </section>
  //   )}  
  // }
  

  
  

// END OF NEW SLIDER





  
  class Slideshoww extends Component  {

  


    constructor() {
      super();
      this.slideRef = React.createRef()
      this.back = this.back.bind(this)
      this.next = this.next.bind(this)
      this.state = {current: 0}
    }
    
  
  
    back() {
      this.slideRef.current.goBack()
    }
  
    next() {
      this.slideRef.current.goNext()
    }
    
  
   
  
   
   
    render() {
      const properties = {
        duration: this.props.duration,
        autoplay: this.props.autoplay,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <div className="indicator">{i + 1}</div>
      }
      
      // while(true){
      //   console.log("hola")
      //   setTimeout(,1000)
      // }
      
      return (
        <div className={this.props.className}  >
        
         
          <div className="slide-container">
            <Slide ref={this.slideRef} {...properties}>
              {slideImages.map((each, index) => (
                <div key={index} className="each-slide"><div>{each}</div>
                 
                  {}
                </div>
              ))}
            </Slide>
          </div>
  
          <div className="btn-group" style={{position:"relative", right:"-25vh", top:"-13vh"}}>
            <button className="btn btn-success" onClick={this.back} type="button">
              Go Back
            </button>
            <button className="btn btn-warning" onClick={this.next} type="button">
            Play
            </button>
            <button className="btn btn-success" onClick={this.next} type="button">
              Go Next
            </button>
          </div>
        </div>
      );
    }
  }
  


  
  
  export async function getStaticPaths() {
    try {
      const resScreens = await fetch(URL+"/api/screens")
      const data = await resScreens.json()
      const paths = data.data.map(({ id }) => ({ params: { id: id.toString() } }))
     
      return {
        paths,
        fallback: 'blocking',
      };
    } catch (error) {
      console.log(error)
    }
  }

 


  export async function getStaticProps({ params }) {
    try {
       
        const resTheatreInfo = await fetch(URL+"/api/theatre-info?populate=*")
        const resImagesAds = await fetch(URL+"/api/advertisements?populate=*")
        const resScreens = await fetch(URL+"/api/screens/"+params.id+"?populate=*")
        
        const theatreInfo = await resTheatreInfo.json()
        const imgAdsData = await resImagesAds.json()
        const dataScreens = await resScreens.json()
        
        const initialTheatreInfo = theatreInfo.data
        const initialScreensData = dataScreens.data
        const initialImgDataADS = imgAdsData.data
        console.log(initialScreensData,"esto es initialScreensdata")
      
      return {
        props: {
            initialScreensData,initialImgDataADS, initialTheatreInfo
        },revalidate:1
      }
    } catch (error) {
      console.log(error)
    }
  }


  
  async function fetcher(url){

    const res = await fetch(URL+url)
    const {data} = await res.json()
    
    return data
  }





  function GetScreensData(id, initialScreensData) {
  
    const {data,error} = useSWR(
      "/api/screens/"+id+"?populate=*",
      fetcher,{fallbackData:initialScreensData,
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




  function GetAdvertisementData(initialImgDataADS) {
    const urlimg = "/api/advertisements?populate=*"
    const {data,error} = useSWR(
      urlimg,
      fetcher,
      {fallbackData:initialImgDataADS,
        revalidateOnMount:true,
        refreshInterval: 5 })
    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
    
    return {
        imgDataADS: data,
        isLoading: !error && !data,
        isError: error
    }
  }
  