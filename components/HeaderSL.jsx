import 'bootstrap/dist/css/bootstrap.min.css';



export default function HeaderSL() {
    return (
        <div style={{height:"8rem", width:"100%", backgroundColor:"black" }}>
            
            <div className="row" style={{paddingTop:"1rem"}}>
            <div className="col" style={{border:"solid red", marginLeft:"4rem"}}>
            <h1 style={{color:"white"}}>12:00</h1>
            <h2 style={{color:"white"}}>Monday</h2>
            </div>
            <div className="col" style={{position:"relative", right:"8rem", border:"solid red"}}>
            <h1 style={{color:"white"}}>Theatre Name Topic</h1>
            </div>
            
            </div>
            
        </div>
    )
}
