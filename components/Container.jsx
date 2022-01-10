import SpacerSL from "./SpacerSL"

export default function Container(props) {
    return (
        <div>
            <div style={{paddingTop:"0.5rem"}}>
            <div className='container'>
            <div className="row">
            <div className="col-3" style={{ paddingTop:"1rem", position:"relative", left:"-2.5rem"}}>
            <h1>{props.left1}</h1>
            {props.left2?(
            <h3 >{props.left2}</h3>):(null)
            }
            </div>
            
            <div className="col" style={{ position:"relative", left:"-2.5rem"}} >
                 <h1 >{props.title}</h1>
                 <h2></h2>
                 <h3>{props.subtitle}</h3>
          {/*<h3>{seminarsData.attributes.time}</h3>*/}
                 
                 <p>{props.description}</p>
                 </div>
                 </div>
                 </div>
                 
                 </div>
                 <SpacerSL/>
        </div>
    )
}
