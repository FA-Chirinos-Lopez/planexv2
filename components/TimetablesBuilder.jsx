import React, {useState} from 'react'
import { slideImages } from '../pages/[id]'
import { SeminarsDataToExport } from '../pages/[id]'
import ContainerSeminars from './ContainerSeminars'



const TimetablesBuilder = () => {
    let timetables = []
    let timesTimetable = 0   
    let d = new Date();
    const time = []  
    // update and clean when unmount

        d = new Date();
        time =  d.toString().slice(16, 24)
        //console.log(time)     

  
      const date = new Date()
      const date1 = date.toString()
      //const date2 = date1.split(" ")[4]
      let dayOfTheMonth = date.getDate()
      let actualMonth = date.getMonth()+1
      
      const getDayNumber = (DateToCut) => {
        
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
  
  
        const getMonthNumber = (DateToCut) =>{
          if(DateToCut){
            const cuttedDate = DateToCut.split("-")
            
            const t1 = cuttedDate[2]+"-"+cuttedDate[1]
            
            if(cuttedDate[1].slice(0,1)<=0)
            {
              return cuttedDate[1].slice(1,2)
            }else{
              return cuttedDate[1]
            }
            
          }}
        
  
  
        const checkDateAndTimeForSeminar =(seminarDate,timeEnd)=>{
          if(dayOfTheMonth == getDayNumber(seminarDate) && actualMonth == getMonthNumber(seminarDate) && getValueInMinutes(time)<getValueInMinutes(timeEnd)){
          return true
        }else{
          return false
        }}
  
  
  
      const getValueInMinutes = (timeToTransform) => {
          if(timeToTransform != null){//console.log(timeToTransform)
          const t1 = timeToTransform.split(":")
          const hoursToMinutes = t1[0]*60
          const a = parseInt(t1[1])
          const timeInMinutes = a+hoursToMinutes
          return timeInMinutes}else{
            console.log("Add a time to the seminar")
          }
      }

    if(SeminarsDataToExport!=0){
        let seminarsWithiutFilter = SeminarsDataToExport && SeminarsDataToExport.map((seminarsData) => {
            let key = seminarsData.id 
            let title=seminarsData.attributes.Title
            let subtitle=seminarsData.attributes.Subtitle 
            let description=seminarsData.attributes.Description
            let seminarDate=seminarsData.attributes.SeminarDate
            let timeStart=seminarsData.attributes.TimeStart
            let timeEnd=seminarsData.attributes.TimeEnd
           //console.log(checkDateAndTimeForSeminar(seminarDate, timeEnd))
            if(checkDateAndTimeForSeminar(seminarDate, timeEnd))return(
          <ContainerSeminars 
          key={key}
          title={title}
          subtitle={subtitle}
          description={description}
          seminarDate={seminarDate}
          timeStart={timeStart}
          timeEnd={timeEnd} ></ContainerSeminars>
            )})

        let seminars = seminarsWithiutFilter.filter(function(x) {
            return x !== undefined;
        });
            

         //console.log(seminars,"chequeo de condicion")

         if(seminars.length > 5 ){
             timesTimetable  = Math.trunc(seminars.length / 5)
             let timesTimetableRemainder = seminars.length % 5
             if(timesTimetableRemainder > 0 ) {
                 timesTimetable+=1
                 let sliceStart = 0

                 for (let index = 0; index < timesTimetable; ++index) {                   
                    let sliceEnds = index*5+1
                    if(index == 0) sliceEnds = 5
                    timetables[index] = seminars.slice(sliceStart,sliceEnds)
                    sliceStart = sliceEnds
                }
             }
         }
         else{

            timesTimetable  = 1       
            let sliceStart = 0
            for (let index = 0; index < timesTimetable; ++index) {                  
               let sliceEnds = index*5+1
               if(index == 0) sliceEnds = 5
               timetables[index] = seminars.slice(sliceStart,sliceEnds)
               sliceStart = sliceEnds
           }
        }
        }

        
        //console.log(timetables[timetables.length],"desde return")
        return {timetables}
}










export {TimetablesBuilder}