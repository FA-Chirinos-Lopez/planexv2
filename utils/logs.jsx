import React from "react";

let isLogged = false
let Token = [""]
let InfoUser = [""]
const myHeaders = new Headers()

const setHeader = (RecivedToken) =>{
    myHeaders.append('Authorization', "Bearer " + RecivedToken)
}

const checkLogs = () => {

        const registerUserr = async (event) => {   
            if(sessionStorage.getItem("ViewPlanexFrontendToken")){
                setHeader(sessionStorage.getItem("ViewPlanexFrontendToken"))
                isLogged = true
            }
        }

        // const rregisterUserr = async (event) =>{            
        //     if(isLogged){
        //     const res = await fetch("http://localhost:1337/admin/users/me", {
        //             method: 'GET',
        //             headers: myHeaders,
        //         })
        //         const result = await res.json()
        //         InfoUser = result
        // }
        // }
        
//registerUserr()

    React.useEffect(() => {
        registerUserr()
        //rregisterUserr()
     }, []) 




}

const setIsLogged = (value) => isLogged = value
const setToken = (value) => Token = value
const setInfoUser = (value) => InfoUser = value

export {isLogged, Token, InfoUser , setIsLogged, setToken, setInfoUser, myHeaders, setHeader, checkLogs}