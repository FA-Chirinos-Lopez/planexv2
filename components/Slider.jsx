import React from "react";
//import { slideImages } from "../pages/[id]";




const currentSlide = 0
export { currentSlide }
export default function Slider({ slideImages }) {
    
    let [index, setIndex] = React.useState(0);
    let [Slides, setSlides] = React.useState(null)
    let SliderRef = React.useRef(null)
    let timeoutRef = React.useRef(null)
    if (Slides&&Slides[index]){
        let delay = Slides[index].props.timeSlide*1000
    }

    currentSlide = index
    

    React.useEffect(() => {

        const slidesWithClones = [...slideImages]
        //slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
        slideImages.length > 1 ? slidesWithClones.push(slidesWithClones[0]) : null
            
        
        setSlides(slidesWithClones)


        

        return null
        //console.log(Slides)
        //delay = Slides[index].props.timeSlide * 1000
        //console.log(delay)

        // ...
    }, [])



    React.useEffect(() => {
        const slidesWithClones = [...slideImages]
        slideImages.length > 1 ? slidesWithClones.push(slidesWithClones[0]) : null
        setSlides(slidesWithClones)

    }, [slideImages])

    

        function resetTimeout() {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }


        React.useEffect(() => {
            //setIndex(1)
                if (slideImages.length > 1) {
                resetTimeout()
                if (Slides && Slides[index]) {
                    delay = Slides[index].props.timeSlide * 1000
                }
                if (Slides) {
                    timeoutRef.current = setTimeout(
                        () =>
                            setIndex((prevIndex) =>
                                prevIndex === Slides.length - 1 ? 0 : prevIndex + 1,

                            ), delay
                    );

                }



            //console.log(delay)

            // ...
        }}, [Slides])

        React.useEffect(() => {
            resetTimeout();
            if (slideImages.length > 1) {
            let Slider = SliderRef.current
            if (Slides) {
                if (index != Slides.length - 1 || Slides.length == 2) {
                    timeoutRef.current = setTimeout(
                        () =>
                            setIndex((prevIndex) => {
                                let changedIndex = [""]
                                console.log("PREV", index)
                                if (prevIndex == Slides.length-1) {
                                    //Slider.className = "slideshowSliderTrick"
                                    changedIndex = 0
                                    resetTimeout()
                                }
                                if (prevIndex != Slides.length - 1) {
                                    Slides.length==index?null:changedIndex = prevIndex + 1
                                    Slider.className = "slideshowSlider"
                                }
                                return changedIndex
                            },

                            ), delay
                    );
                } else {
                    setTimeout(() => {
                        Slider.className = "slideshowSliderTrick"
                        setIndex(0)
                        const slidesWithClones = [...slideImages]
                        slideImages.length > 1 ? slidesWithClones.push(slidesWithClones[0]) : null
                        setSlides(slidesWithClones)
                        //Slider.className = "slideshowSlider"
                        //Slider.className = "slideshowSliderTrick"
                        setTimeout(() => { Slider.className = "slideshowSlider"},1000)
                    }, 1000)
                    
                }
            }
            try {
                if (Slides) {              
                    if (Slides[index].props.ContentType =="Advertisement"){
                        if (Slides[index].props.children.props.Type == "Video") {
                            const vid = document.getElementById("vid")
                            vid.play()

                        }
                    }
                }
            }
            catch (err) {
                console.log(err)
            }
            return () => {

                resetTimeout();
            };
        }}, [index]);
    
  
      if(Slides)return(
          <div  className="slideshow">
             
              <div
                  ref={SliderRef}
                  className="slideshowSlider"
                  style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                  >
                      {Slides.map((each, index) => (

                      <div className="slide" key={index}>{each}</div>
                  ))}

                  </div>)

    
          <div className="slideshowDots">
                  {Slides.map((_, idx) => (
                      Slides.length-1==idx?null:
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
return null
}
