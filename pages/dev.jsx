import React,{useEffect,useState,useRef} from "react";




export default function dev() {

    const [name, setName] = useState("manolo");
    const prevName = useRef("");

    useEffect(() => {
        setName("ramon")
    prevName.current = name;
    
        },[name]);


        



return(
  <div>
  
  
  
    {name}
    <br/>
    {prevName.current}
  
<br/><br/><br/><br/><br/><br/>
  <button onClick={"boton"}>cambiar nombre</button>
  </div>
  
  
  )
   
}



/* 

 const videoAddRef = React.useRef(null);
    console.log(videoAddRef.current);


    function playVid() {
        videoAddRef.current.play();
    }
    
    function pauseVid() {
        videoAddRef.current.pause();
    }

    videoAddRef.current = function() {
        console.log("El video ha terminado")    };



    setInterval(() => {
        console.log(videoAddRef.current.ended)
        if(videoAddRef.current.ended){
            playVid()
        }
    }, 1000);

    return (
        <div>
        <video ref={videoAddRef} className="video"    >
            <source src="https://backend-2-lp7nu.ondigitalocean.app/uploads/v1_37f7bfb8ea.mp4" type="video/mp4" />
        </video>
        <button onClick={playVid} type="button">
            Play
        </button>
        <button onClick={pauseVid} type="button">
            Pause
        </button>
        </div>
    )

*/