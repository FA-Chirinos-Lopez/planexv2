import AdsContainer from "../components/AdsContainer"
import ContainerSeminars from "../components/ContainerSeminars"
import Layout from "../components/Layout"
import SeminarsFooter from "../components/SeminarsFooter"
import SeminarsHeader from "../components/SeminarsHeader"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "video-react/dist/video-react.css";
import { Player } from 'video-react';

const currIndex = 0




export default function dev() {

  
  




  function Slideshow() {

    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    const delay = 2500;
    let [index, setIndex] = React.useState(0);
    let timeoutRef = React.useRef(null);
    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  
    React.useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === colors.length - 1 ? 0 : prevIndex + 1,
            console.log("caca")
          ),delay
          
        
        
      );
  
      return () => {
        resetTimeout();
      };
    }, [index]);
  
    return (
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {colors.map((backgroundColor, index) => (
            <img src="http://localhost:1337/uploads/photo_1497366811353_6870744d04b2_97cb596f08.jpeg" alt="" className="adsConainer__main__img"/>
          ))}
        </div>
  
        <div className="slideshowDots">
          {colors.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return <Slideshow></Slideshow>
  
        
    
}





const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;

function Slideshoww() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map((backgroundColor, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundColor }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}








const Slider = ({ slides }) => {
    // Create a curr state indicating what's the current slide's index
    const [curr, setCurr] = React.useState(0);
    const { length } = slides;
    const delay = [2000,7000,3000]
    const goToNext = () => {
      // Check if we've reached the final slide in the array
      // If so, go back to 0, else curr + 1
      setCurr(curr === length - 1 ? 0 : curr + 1);
    }
    
    // useEffect will run at every re-render
    React.useEffect(() => {
      // At every render, set a new timeout to go to the next slide
      setTimeout(goToNext, delay[curr]);
      // And, when unmounting <Slider />, clear the timeout
      // See the reactjs.org docs on hooks for more info
      return function() {
        clearTimeout(goToNext);
      }
    })
    
    if (!Array.isArray(slides) || length <= 0) {
      return null;
    }
    
    return (
      <section className="slider">
        {slides.map((s, i) => (
          <div
            // if active slide, include the "active" class
            className={i === curr ? "slide active" : "slide"}
            key={s.title}
            // if not active, hide from screen readers for accessibility
            aria-hidden={i !== curr}
          >
            <div>
              <h1>{s.title}</h1>
              <h2>{s.subtitle}</h2>
            </div>
            {i === curr && (
              <img className="image" src={s.image} alt={`Image for ${s.title}`} />
            )}
          </div>
        ))}
        
      </section>
    );  
  }
  
  const Main = () => {
    return (
      // Pretending I'm using dynamic slides as props
      <main>
        <Slider slides={defaultSlides} />
      </main>
    );
  }
  
  const defaultSlides = [
    {
        title: 'First slide!',
        subtitle: 'is it working?',
        image: 'https://picsum.photos/300',
    },
    {
        title: "Second Slide",
        subtitle: "ohhh yeah",
        image: "https://picsum.photos/400"
    },
    {
        title: "Third Slide",
        subtitle: "last one! ✨",
        image: "https://picsum.photos/350"
    },
]