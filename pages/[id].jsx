import Layout from "../components/Layout";
import Container from "../components/Container";
import AdsContainer from "../components/AdsContainer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide, Zoom } from "react-slideshow-image";
import React, { Component, useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import useSWR from "swr";
//import ContainerSeminars from "../components/ContainerSeminars";
import { URL } from ".";
import Slider, { currentSlide } from "../components/Slider";
import Link from "next/link";
import { TimetablesBuilder } from "../components/TimetablesBuilder ";
import { checkDate, checkTime } from "../components/TimeAndDateValidator";

//const URL =  "http://localhost:1337" //"https://backend-l3ahb.ondigitalocean.app"

const slideImages = [""];
let SeminarsDataToExport = [""];
export { slideImages, SeminarsDataToExport };
slideImages.length = 0;

function findContentURL(data, idToLookFor) {
  var categoryArray = data;
  for (var i = 0; i < categoryArray.length; i++) {
    if (categoryArray[i].id == idToLookFor) {
      return (
        URL +
        categoryArray[i].attributes.ExhibitorAnimationOrGraphic.data.attributes
          .url
      );
    }
  }
}

export default function ScreensDisplay({
  initialScreensData,
  initialImgDataADS
}) {
  //initialScreensData.id

  //FULLSCREEN
  const handle = useFullScreenHandle();
  //RESET ARRAY OF SLIDES
  slideImages.length = 0;
  // IF ONLY ONE SLIDE OR NONE DONT SCROLL
    var condSlide = false;

    const color1ref = React.useRef(null)
    const color2ref = React.useRef(null)

    const colorCambiar = React.useRef(null)

  switch (slideImages) {
    case 0:
      condSlide = false;
      break;
    case 1:
      condSlide = false;
      break;
    default:
      condSlide = true;
  }

  const id = initialScreensData.id;
    let color1 = "#FF5050"
    let color2 = "#FF0000"
    let allowColorChanger = false
  const {
    AddAdverts,
    AddTimetable,
    Color1,
    Color2,
    isLoadingIdsForAdsAndTimetable
  } = GetIdsForAdsAndTimetable(id);

  const { imgDataADS, isLoadingAdvertisementData } = GetAdvertisementData();

  const {
    EventData,
    AdsData,
    Timetables,
    screensData,
    isLoadingScreensData,
    isError
  } = GetScreensData(id);

  const idEvent = initialScreensData.attributes.event.data.id;

  const idTimetable = initialScreensData.attributes.AddTimetable.id;

  const { TheatreData, isLoadingTheatreData } = GetTheatreData(idEvent);

  const { TimetableData, isLoadingTimetableData } = GetTimetableData(
    idTimetable
  );

  if (isError) isError;

  if (
    isLoadingScreensData ||
    isLoadingTheatreData ||
    isLoadingIdsForAdsAndTimetable ||
    isLoadingAdvertisementData
  )
    return "loading...";

  if (screensData && imgDataADS && TheatreData) {
    //ARRAYS DEFINITION
    //let seminarsData= screensData.attributes.timetable_events.data;
    //let halldescriptorsData= screensData.attributes.hall_descriptors.data;
    //let advertisementsData= screensData.attributes.advertisementsToAdd.data;
    let advertisementsData = AdsData;
    let timetablesIds = [""];

    const GetTimetablesIdAndData = () => {
      if (AddTimetable) {
        for (let i = 0; i < AddTimetable.length; i++) {
          timetablesIds[i] = AddTimetable[i].id;
        }
      }
    };

    GetTimetablesIdAndData();



    const getTimetables = async => {
      let timetables = TimetablesBuilder();

      return timetables;
    };

    if (AdsData) {
      for (let i = 0; i < AdsData.length; i++) {
        let allowToAdd = true;
        let data = AdsData[i].attributes;
        let eventData = EventData.data.attributes;

          console.log(eventData)
        
        if (data.AddTime) {
              allowToAdd = checkTime(data.AddTime.timeStart, data.AddTime.timeEnd)
          }
        if (data.AddDate) {
              allowToAdd = checkDate(data.AddDate.date)
          }
        

        if (allowToAdd) {
          slideImages.push(
            <Layout
              timeSlide={data.Duration}
              ContentType="Advertisement"
              EventName={eventData.EventName}
              EventStart={eventData.EventStart}
              EventEnd={eventData.EventEnd}
              FooterImage={eventData.FooterImge.data.attributes.url}
              TheatreName={screensData.attributes.TheatreName}
              TopicOrSubtitle={screensData.attributes.TopicOrSubtitle}
              SponsoredByImg={
                screensData.attributes.SponsoredBy.data.attributes.url
              }
              FullScreen={data.FullScreen}
            >
              <AdsContainer
                timeSlide={data.Duration}
                //IndexNumber={index}
                //CurrIndexSlider={currentSlide}
                Type={data.Type}
                FullScreen={data.FullScreen}
                Img={URL + data.ExhibitorAnimationOrGraphic.data.attributes.url}
                CallToAction={data.CallToAction}
                //Time={data.Time}
                Title={data.Title}
                Location={data.Location}
                Description={data.Description}
                //DescriptionSecondParagraph={data.DescriptionSecondParagraph}
              />
            </Layout>
          );
        }
        }
    

        const colorChanger = () => {
            let color1 = [""]
            let color2 = [""]
            if (EventData.data.attributes.ChangeColors && !screensData.attributes.ChangeColors) {
                console.log(screensData.attributes.ChangeColors)
                allowColorChanger = true
                color1 = EventData.data.attributes.PrimaryColor
                color2 = EventData.data.attributes.SecondaryColor
            }
            if (screensData.attributes.ChangeColors) {
                console.log(screensData)
                allowColorChanger = true
                color1 = screensData.attributes.Color1
                color2 = screensData.attributes.Color2
            }
            if (allowColorChanger){
                setTimeout(() => {
                    colorCambiar.current.style.setProperty("--color1", color1)
                    colorCambiar.current.style.setProperty("--color2", color2)
                }, 1)
            }
        }

      //  AdsData.map((advertisementsData,index) =>(

      //slideImages.push(
      //  <Layout
      //  timeSlide = {advertisementsData.attributes.Duration}
      //  ContentType="Advertisement"
      //  EventName={TheatreData.attributes.EventName}
      //  EventStart={TheatreData.attributes.EventStart}
      //  EventEnd={TheatreData.attributes.EventEnd}
      //  FooterImage={TheatreData.attributes.FooterImge.data.attributes.url}
      //  TheatreName={screensData.attributes.TheatreName}
      //  TopicOrSubtitle={screensData.attributes.TopicOrSubtitle}
      //  SponsoredByImg={screensData.attributes.SponsoredBy.data.attributes.url}
      //  FullScreen={advertisementsData.attributes.FullScreen}
      //  >

      //    <AdsContainer
      //    timeSlide = {advertisementsData.attributes.Duration}
      //    key={advertisementsData.id}
      //    IndexNumber={index}
      //    CurrIndexSlider={currentSlide}
      //    Type={advertisementsData.attributes.Type}
      //    FullScreen={advertisementsData.attributes.FullScreen}
      //    Img={findContentURL(imgDataADS,advertisementsData.id)}
      //    CallToAction={advertisementsData.attributes.CallToAction}
      //    Time={advertisementsData.attributes.Time}
      //    Title={advertisementsData.attributes.Title}
      //    Location={advertisementsData.attributes.Location}
      //    Description={advertisementsData.attributes.Description}
      //    DescriptionSecondParagraph={advertisementsData.attributes.DescriptionSecondParagraph}/>

      //</Layout>

      //      )))
    }
    //               {findContentURL(imgDataADS,advertisementsData.id)} {isVideo(imgDataADS,advertisementsData.id)}

    switch (slideImages.length) {
      case 0:
        condSlide = false;
        break;
      case 1:
        condSlide = false;
        break;
      default:
        condSlide = true;
    }

    const zoomOutProperties = {
      indicators: true,
      scale: 0.4
    };
    console.log(slideImages);
    return (
        <div>
            <div ref={colorCambiar} className="mainStyle" >
                
        <header
          style={{
            //background: "#294b79",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            left: "0",
            right: "0",
            width: "100%",
            height: "10%",
            zIndex: "1"
          }}
                >
                    {colorChanger()}

          <div
            className="btn-group"
            role="group"
            style={{ display: "flex", height: "150%" }}
          >
            <Link href={`/`}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  background: "#2d173d",
                  borderColor: "#7c6a86",
                  fontSize: "150%"
                }}
              >
                GoBack
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handle.enter}
              style={{
                width: "100%",
                background: "#2d173d",
                borderColor: "#7c6a86",
                fontSize: "150%"
              }}
            >
              Enter FullScreen
            </button>
          </div>
          <h4
            style={{
              alignSelf: "center",
              color: "white",
              backgroundColor: "#294b79"
            }}
          >
            Press esc to exit FullScreen mode
          </h4>
        </header>
        <FullScreen handle={handle}>
          <Slider />
        </FullScreen>

        

        </div>
      </div>
    );
  } else return "Loading...";
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

class Slideshoww extends Component {
  constructor() {
    super();
    this.slideRef = React.createRef();
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    this.state = { current: 0 };
  }

  back() {
    this.slideRef.current.goBack();
  }

  next() {
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
      indicators: i => <div className="indicator">{i + 1}</div>
    };

    // while(true){
    //   console.log("hola")
    //   setTimeout(,1000)
    // }

    return (
      <div className={this.props.className}>
        <div className="slide-container">
          <Slide ref={this.slideRef} {...properties}>
            {slideImages.map((each, index) => (
              <div key={index} className="each-slide">
                <div>{each}</div>

                {}
              </div>
            ))}
          </Slide>
        </div>

        <div
          className="btn-group"
          style={{ position: "relative", right: "-25vh", top: "-13vh" }}
        >
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
    const resScreens = await fetch(URL + "/api/screens");
    const data = await resScreens.json();
    const paths = data.data.map(({ id }) => ({
      params: { id: id.toString() }
    }));

    return {
      paths,
      fallback: "blocking"
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  try {
    const resTheatreInfo = await fetch(URL + "/api/theatre-info?populate=*");
    const resImagesAds = await fetch(URL + "/api/advertisements?populate=*");
    const resScreens = await fetch(
      URL + "/api/screens/" + params.id + "?populate=*"
    );

    const theatreInfo = await resTheatreInfo.json();
    const imgAdsData = await resImagesAds.json();
    const dataScreens = await resScreens.json();

    const initialTheatreInfo = theatreInfo.data;
    const initialScreensData = dataScreens.data;
    const initialImgDataADS = imgAdsData.data;

    return {
      props: {
        initialScreensData,
        initialImgDataADS,
        initialTheatreInfo
      },
      revalidate: 1
    };
  } catch (error) {
    console.log(error);
  }
}

async function fetcher(url) {
  const res = await fetch(URL + url);
  const { data } = await res.json();

  return data;
}

async function fetcherWithToken(url) {
  const res = await fetch(URL + url, {
    method: "GET",
    headers: new Headers({
      Authorization:
        "Bearer " + sessionStorage.getItem("ViewPlanexFrontendToken")
    })
  });
  //console.log(sessionStorage.getItem("ViewPlanexFrontendToken"),"URL   ",URL,url)

  const data = await res.json();

  return data;
}

function GetScreensData(id, initialScreensData) {
  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: [
        "AddAdverts.advertisements.AddDate",
        "AddAdverts.advertisements.AddTime",
        "SponsoredBy",
        "event.FooterImge",
        "AddAdverts.advertisements.ExhibitorAnimationOrGraphic",
        "AddTimetable.timetables.AddEvents.timetable_events"
      ]
    },
    {
      encodeValuesOnly: true
    }
  );

  const { data, error } = useSWR(`/api/screens/` + id + `?${query}`, fetcher, {
    fallbackData: initialScreensData,
    revalidateOnMount: true,
    refreshInterval: 5
  });

  if (error) return "an error has occured " + { error };
  if (!data) return "loading...";
  let AdsData = data.attributes.AddAdverts.advertisements.data;
  let Timetables = data.attributes.AddTimetable.timetables.data;
  let EventData = data.attributes.event;
  return {
    EventData,
    AdsData,
    Timetables,
    screensData: data,
    isLoadingScreensData: !error && !data,
    isError: error
  };
}

//screensData.attributes.event.data

function GetTheatreData(idEvent) {
  const { data, error } = useSWR(
    "/api/events/" + idEvent + "?populate=*",
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 5
    }
  );

  if (error) return "an error has occured " + { error };
  if (!data) return "loading...";
  //console.log(data)
  return {
    TheatreData: data,
    isLoadingTheatreData: !error && !data
  };
}

function GetTimetableData(idTimetable) {
  //const {data,error} = useSWR(
  //  `/content-manager/collection-types/api::timetable.timetable/${idTimetable}`,
  //  fetcherWithToken,{
  //    revalidateOnMount:true,
  //    refreshInterval: 5 })
  const { data, error } = useSWR(
    `/api/timetables?populate[AddEvents][populate]=%2A`,
    fetcher,
    {
      revalidateOnMount: true,
      refreshInterval: 5
    }
  );

  if (error) return "an error has occured " + { error };
  if (!data) return "loading...";

  return {
    TimetableData: data,
    isLoadingTimetableData: !error && !data
  };
}

function GetIdsForAdsAndTimetable(id) {
  const { data, error } = useSWR(
    "/content-manager/collection-types/api::screen.screen/" + id,
    fetcherWithToken,
    {
      revalidateOnMount: true,
      refreshInterval: 5
    }
  );

  if (error) return "an error has occured " + { error };
  if (!data) return "loading...";

  let AddAdverts = data.AddAdverts;
  let AddTimetable = data.AddTimetable.timetables;
  let Color1 = data.Color1;
  let Color2 = data.Color2;

  return {
    AddAdverts,
    AddTimetable,
    Color1,
    Color2,
    isLoadingIdsForAdsAndTimetable: !error && !data
  };
}

function GetAdvertisementData(initialImgDataADS) {
  const urlimg = "/api/advertisements?populate=*";
  const { data, error } = useSWR(urlimg, fetcher, {
    fallbackData: initialImgDataADS,
    revalidateOnMount: true,
    refreshInterval: 5
  });
  if (error) return "an error has occured " + { error };
  if (!data) return "loading...";

  return {
    imgDataADS: data,
    isLoadingAdvertisementData: !error && !data,
    isError: error
  };
}
