import React from "react";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December",]
const actualDay = () =>{

    let d = new Date()
    let currMonth = d.getMonth()+1
    let currDay = d.getDate()
    return { currDay, currMonth}

}



export {days, months, actualDay}