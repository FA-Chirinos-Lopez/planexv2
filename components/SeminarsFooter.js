import { URL } from "../pages"
import { months } from "../utils/daysandmonths"


export default function SeminarsFooter({EventName, EventStart, EventEnd, FooterImage}) {

    function getMonth(DateToCut){
    if(DateToCut){
        const cuttedDate = DateToCut.split("-")
        const t1 = cuttedDate[2]+"-"+cuttedDate[1]
        
        if(t1.slice(3,4)>0){
            const monthNumber = t1.slice(3,5)
         
            return months[monthNumber-1]

        }else{
            const monthNumber = t1.slice(4,5)

            return months[monthNumber-1]
        }
      
    }}

    function getDayNumber(DateToCut){
        if(DateToCut){
            const cuttedDate = DateToCut.split("-")
            const t1 = cuttedDate[2]+"-"+cuttedDate[1]
            
            if(cuttedDate[2].slice(0,1)<=0)
            {
                return cuttedDate[2].slice(1,2)
            }else{
                return cuttedDate[2]
            }
            
            
        }}

    function getDayNumberN(DateToCut){
        if(DateToCut){
            const cuttedDate = DateToCut.split("-")
            const t1 = cuttedDate[2]+"-"+cuttedDate[1]
            
            if(cuttedDate[2].slice(0,1)<=0)
            {
                return cuttedDate[2].slice(1,2)
            }else{
                return cuttedDate[2]
            }
            
            
        }}
        

    const startDay=getDayNumber(EventStart)
    const startMonth=getMonth(EventStart)
    const endDay=getDayNumber(EventEnd)
    const endMonth=getMonth(EventEnd)
    const toPrintInDate = startDay+" "+startMonth+" - "+endDay+" "+endMonth
    if(startMonth==endMonth){
        toPrintInDate=startDay+" - "+endDay+" "+endMonth
    }

    return (
    <footer className="footerSeminars">
        <div className="footerSeminars__grid">
            <h1 className="footerSeminars__grid__h1">{EventName}</h1>
            <h2 className="footerSeminars__grid__h2">{toPrintInDate}</h2>
        </div>

        <div className="footerSeminars__flexIMG" >
            <img src={URL+FooterImage} alt="" className="footerSeminars__flexIMG__img"/>
        </div> 
    </footer>
    )
}
