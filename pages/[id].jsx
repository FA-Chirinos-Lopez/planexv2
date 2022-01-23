
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
      const id= initialScreensData.id
      const {theatreInfo} = GetTheatreInfo()
     
      const {imgDataADS} = GetAdvertisementData()
      const { screensData, isLoading, isError } = GetScreensData(id)
      if (isError) isError
      if(!screensData) return "loading..."    
      if (screensData) {
        
     
        
       
    //ARRAYS DEFINITION
    let seminarsData= screensData.attributes.stage_timetables.data;
    let halldescriptorsData= screensData.attributes.hall_descriptors.data;
    //let advertisementsData= screensData.attributes.advertisementsToAdd.data;
    let advertisementsData= screensData.attributes.advertisements.data;
  
      
      
  //ADD SEMINARS
  console.log(theatreInfo.attributes.SeminarsDurationSlide,"duracion de seminars")
  if(seminarsData!=0){

  slideImages.push(    
    
    <Layout
    timeSlide = {theatreInfo.attributes.SeminarsDurationSlide}
    ContentType="Seminar" 
    EventName={theatreInfo.attributes.EventName} 
    EventStart={theatreInfo.attributes.EventStart} 
    EventEnd={theatreInfo.attributes.EventEnd} 
    FooterImage={theatreInfo.attributes.FooterImage.data.attributes.url} 
    TheatreName={theatreInfo.attributes.TheatreName} 
    TopicOrSubtitle={theatreInfo.attributes.TopicOrSubtitle} 
    SponsoredByImg={theatreInfo.attributes.SponsoredBy.data.attributes.url}
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
    console.log(slideImages.length)

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
          timeSlide = {advertisementsData.attributes.Duration}
          ContentType="Advertisement"
          FullScreen={advertisementsData.attributes.FullScreen}
          EventName={theatreInfo.attributes.EventName} 
          EventStart={theatreInfo.attributes.EventStart} 
          EventEnd={theatreInfo.attributes.EventEnd} 
          FooterImage={theatreInfo.attributes.FooterImage.data.attributes.url} 
          TheatreName={theatreInfo.attributes.TheatreName} 
          TopicOrSubtitle={theatreInfo.attributes.TopicOrSubtitle} 
          SponsoredByImg={theatreInfo.attributes.SponsoredBy.data.attributes.url}>
        
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
                {console.log(index,"datos desde ID")}
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
      <FullScreen handle={handle}>
      <Slider></Slider>
      </FullScreen>
      
    <button className="btn btn-primary btn-lg" onClick={handle.enter} style={{position:"relative" , left:"43%"}}>
    Enter fullscreen
    </button>
    
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



  function GetTheatreInfo(initialTheatreInfo) {
  
    const {data,error} = useSWR(
      "/api/theatre-info?populate=*",
      fetcher,
      {fallbackData:initialTheatreInfo,
        revalidateOnMount:true,
        refreshInterval: 5 })

    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
    
    return {
        theatreInfo: data,
        isLoading: !error && !data,
        isError: error
    }
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
  