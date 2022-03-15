import React from "react";
import { slideImages } from "../pages/[id]";




const currentSlide = 0
export{currentSlide}
export default function Slider() {

    let [index, setIndex] = React.useState(0);
    let timeoutRef = React.useRef(null);
     if(slideImages[index]){
       let delay = slideImages[index].props.timeSlide*1000
      }

    currentSlide = index
    
   
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
            prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1,

          ),delay
          
        
        
      );
     
      
      return () => {
        resetTimeout();
      };
    }, [index]);
  
      return(
        <div className="slideshow">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {slideImages.map((each, index) => (

              <div className="slide" key={index}>{each}</div>
            ))}
            
          </div>
    
          <div className="slideshowDots">
            {slideImages.map((_, idx) => (
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
      )
}
