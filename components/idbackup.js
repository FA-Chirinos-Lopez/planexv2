
import Layout from "../components/Layout";
import Container from "../components/Container";
import AdsContainer from "../components/AdsContainer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slide } from "react-slideshow-image";
import React , { Component } from "react";
import 'react-slideshow-image/dist/styles.css'
import useSWR from "swr"
import ContainerSeminars from "../components/ContainerSeminars"








const URL = "https://backend-l3ahb.ondigitalocean.app"

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
        console.log("no es imagen")
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
      const {imgDataADS} = GetAdvertisementData()
      const { screensData, isLoading, isError } = GetScreensData(id)
      if (isError) isError
      if(!screensData) return "loading..."    
      if (screensData) {
        
        console.log("HAY DATOS")
        
       
    //ARRAYS DEFINITION
    let seminarsData= screensData.attributes.stage_timetables.data;
    let halldescriptorsData= screensData.attributes.hall_descriptors.data;
    let advertisementsData= screensData.attributes.advertisementsToAdd.data;
  
      
      
  //ADD SEMINARS
  if(seminarsData!=0){
  slideImages.push(   <Layout>
    {seminarsData && seminarsData.map((seminarsData) => (
     <div   key={seminarsData.id}>
     <ContainerSeminars title={seminarsData.attributes.title} subtitle={seminarsData.attributes.subtitle} 
     description={seminarsData.attributes.description} left1={"NOW"} left2={seminarsData.attributes.time} />
    </div>
    ))}
    </Layout>)}

   //ADD HALL DESCRIPTORS
   if(halldescriptorsData!=0){
   slideImages.push(
    <Layout>
    {halldescriptorsData && halldescriptorsData.map((halldescriptorsData) => (
     <div   key={halldescriptorsData.id}>
     <Container title={halldescriptorsData.attributes.Title} subtitle={halldescriptorsData.attributes.Subtitle} 
     description={halldescriptorsData.attributes.Description} left1={halldescriptorsData.attributes.HallName} />
    </div>
    ))}
    </Layout>)}
    //ADD ADVERTISEMENTS
    if(advertisementsData!=0){
    imgDataADS && advertisementsData.map((advertisementsData) =>(
        
      
          
          slideImages.push( <div   key={advertisementsData.id}>
          
          <AdsContainer ifvideo="" img={findContentURL(imgDataADS,advertisementsData.id)} CallToAction={advertisementsData.attributes.CallToAction}
          Time={advertisementsData.attributes.Time} Title={advertisementsData.attributes.Title}  
          Location={advertisementsData.attributes.Location}  />
             
           {findContentURL(imgDataADS,advertisementsData.id)} {isVideo(imgDataADS,advertisementsData.id)} 
            
        </div>
        
        
        )))}

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
        console.log(slideImages.length)
    return (
      <div >
      <FullScreen handle={handle}>
      <Slideshow autoplay={condSlide} duration={3000}></Slideshow>
  
     
    </FullScreen>
    <button className="btn btn-primary btn-lg" onClick={handle.enter} style={{position:"relative", bottom:"-5vh"}}>
    Enter fullscreen
    </button>
    
        <br/><br/><br/><br/><br/>

         {/********************SEMINARS***********************************************************************/}
        <Layout>
        {seminarsData && seminarsData.map((seminarsData) => (
         <div   key={seminarsData.id}>
         <Container title={seminarsData.attributes.title} subtitle={seminarsData.attributes.subtitle} 
         description={seminarsData.attributes.description} left1={"NOW"} left2={seminarsData.attributes.time} />
        </div>
        ))}
        </Layout>


         {/********************HALLDESCRIPTOR***********************************************************************/}

         <Layout>
         {halldescriptorsData && halldescriptorsData.map((halldescriptorsData) => (
          <div   key={halldescriptorsData.id}>
          <Container title={halldescriptorsData.attributes.Title} subtitle={halldescriptorsData.attributes.Subtitle} 
          description={halldescriptorsData.attributes.Description} left1={halldescriptorsData.attributes.HallName} />
         </div>
         ))}
         </Layout>
         {/********************ADVERTISEMENTS***********************************************************************/}


         {advertisementsData && advertisementsData.map((advertisementsData,id) => (
          <div key={id}>
          <AdsContainer img={findContentURL(imgDataADS,id+1)} CallToAction={advertisementsData.attributes.CallToAction}
          Time={advertisementsData.attributes.Time} Title={advertisementsData.attributes.Title}  
          Location={advertisementsData.attributes.Location}  />
              
          </div>
         ))}

      
         
      </div>
    )}
  }






  
  class Slideshow extends Component {

  


    constructor() {
      super();
      this.slideRef = React.createRef();
      this.back = this.back.bind(this);
      this.next = this.next.bind(this);
      this.state = {
        current: 0
      };
    }
    
  
  
    back() {
      this.slideRef.current.goBack();
    }
  
    next() {
      this.slideRef.current.goNext();
    }
    
  
    GoNext = () =>{
      this.slideRef.current.goNext();
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
      };
  
  
     
  
      
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
      const resScreens = await fetch(URL+"/api/screens");
      const data = await resScreens.json();
      const paths = data.data.map(({ id }) => ({ params: { id: id.toString() } }));
      console.log(paths,"paths")
      return {
        paths,
        fallback: 'blocking',
      };
    } catch (error) {
      console.log(error);
    }
  }

 
  export async function getStaticProps({ params }) {
    try {
       
       
        const resImagesAds = await fetch(URL+"/api/advertisements?populate=*");
        const resScreens = await fetch(URL+"/api/screens/"+params.id+"?populate=*");
        const imgAdsData= await resImagesAds.json();
        const dataScreens = await resScreens.json();
        const initialScreensData = dataScreens.data
        const initialImgDataADS = imgAdsData.data
        console.log(initialScreensData)
      
       
     
      return {
        props: {
            initialScreensData,initialImgDataADS
        },revalidate:1
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

  function GetScreensData(id) {
  
    const {data,error} = useSWR("/api/screens/"+id+"?populate=*",fetcher,{revalidateOnMount:true,refreshInterval: 5 })
    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
    
    return {
        screensData: data,
        isLoading: !error && !data,
        isError: error
    }
  }


/*   function getScreensData(id) {
  
    const {data,error} = useSWR("/api/screens/"+id+"?populate=*",fetcher,{revalidateOnMount:true,refreshInterval: 5 })
    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
    console.log(data)
    return {
        imgDataADS: data,
        isLoading: !error && !data,
        isError: error
    }
  } */


  function GetAdvertisementData() {
    const urlimg = "/api/advertisements?populate=*"
    const {data,error} = useSWR(urlimg,fetcher,{revalidateOnMount:true,refreshInterval: 5 })
    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
    
    return {
        imgDataADS: data,
        isLoading: !error && !data,
        isError: error
    }
  }
  