
import Layout from "../components/Layout";
import Container from "../components/Container";
import AdsContainer from "../components/AdsContainer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slide } from "react-slideshow-image";
import React , { Component } from "react";
import 'react-slideshow-image/dist/styles.css';
import useSWR from "swr";
import ContainerSeminars from "../components/ContainerSeminars";
import { URL } from ".";







//const URL =  "http://localhost:1337" //"https://backend-l3ahb.ondigitalocean.app"

const slideImages=[""]
slideImages.length=0




function findContentURL(data, idToLookFor) {
  var categoryArray = data;
  for (var i = 0; i < categoryArray.length; i++) {
      if (categoryArray[i].id == idToLookFor) {
          return(URL+categoryArray[i].attributes.ExhibitorAnimationOrGraphic.data.attributes.url);
      }
  }
}
function isVideo(data, idToLookFor) {
  var categoryArray = data;
  const videoExt=[".mp4",".mpg-4",".mov",".wmv",".avi",".avchd",".flv",".f4v",".swf",".mkv",".webm",".mpge-2"]
  for (var i = 0; i < categoryArray.length; i++) {

      if (categoryArray[i].attributes.ExhibitorAnimationOrGraphic.data.attributes.formats) {
        
        console.log(categoryArray[i],"no es imagen")
        }else{ console.log("Es imagen")}
}}

export default function ScreensDisplay({ initialScreensData,initialImgDataADS }) {
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
  if(seminarsData!=0){

  slideImages.push(    
    
    <Layout 
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
   if(halldescriptorsData!=0){

   slideImages.push(

    <Layout 
    ContentType="seminarr" 
    EventName={theatreInfo.attributes.EventName} 
    EventStart={theatreInfo.attributes.EventStart} 
    EventEnd={theatreInfo.attributes.EventEnd} 
    FooterImage={theatreInfo.attributes.FooterImage.data.attributes.url} 
    TheatreName={theatreInfo.attributes.TheatreName} 
    TopicOrSubtitle={theatreInfo.attributes.TopicOrSubtitle} 
    SponsoredByImg={theatreInfo.attributes.SponsoredBy.data.attributes.url}>

    {halldescriptorsData && halldescriptorsData.map((halldescriptorsData) => (
     
     <Container 
     key={halldescriptorsData.id} 
     title={halldescriptorsData.attributes.Title} 
     subtitle={halldescriptorsData.attributes.Subtitle} 
     description={halldescriptorsData.attributes.Description} 
     left1={halldescriptorsData.attributes.HallName} />
    
    ))}

    </Layout>)}

    //ADD ADVERTISEMENTS
    if(advertisementsData!=0){
    imgDataADS && advertisementsData.map((advertisementsData) =>(
        
      
          
          slideImages.push( 
          <Layout 
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
              key={advertisementsData.id}
              FullScreen={advertisementsData.attributes.FullScreen} 
              ifvideo="" 
              Img={findContentURL(imgDataADS,advertisementsData.id)} 
              CallToAction={advertisementsData.attributes.CallToAction}
              Time={advertisementsData.attributes.Time} 
              Title={advertisementsData.attributes.Title}  
              Location={advertisementsData.attributes.Location}
              Description={advertisementsData.attributes.Description}
              DescriptionSecondParagraph={advertisementsData.attributes.DescriptionSecondParagraph}/>
                {console.log(advertisementsData.attributes.DescriptionSecondParagraph,"DESCRIPTION")}
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
       console.log(slideImages)
    return (
      <div >
      <FullScreen handle={handle}>
      <Slideshow autoplay={false} duration={3000}></Slideshow>
  
     
    </FullScreen>
    <button className="btn btn-primary btn-lg" onClick={handle.enter} style={{position:"relative", bottom:"-47vh"}}>
    Enter fullscreen
    </button>
    
      </div>
    )}
  }






  
  class Slideshow extends Component {

  


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
  
  
     
  
      
      return (
        <div className={this.props.className}  style={{height:"100vh"}}>
        
         
          <div className="slide-container">
            <Slide ref={this.slideRef} {...properties}>
              {slideImages.map((each, index) => (
                <div key={index} className="each-slide"><div>{each}</div>
                  
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
  