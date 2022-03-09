import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { URL } from '.';
import { InfoUser, isLogged, Token , setIsLogged, setToken, setInfoUser, myHeaders, setHeader } from '../utils/logs';
import Router from 'next/router';


export default function login() {


  return (
   
    <Layout ContentType="Index">
      <Form></Form>
    </Layout>
   
      
      );
}






  const Form = () => {
    

   const registerUser = async (event) => {
      event.preventDefault()
    
        const res = await fetch("http://localhost:1337/admin/login", {
          method: 'POST',
          body: new URLSearchParams({
            'password': event.target.password.value,
              'email': event.target.username.value
          })
      })
    
        const result = await res.json()
        let {token , user} = result.data
        if(token) {
          setIsLogged(true)
          setToken(token)
          setInfoUser(user)
          setHeader(token)
          sessionStorage.setItem("ViewPlanexFrontendToken", token)
          sessionStorage.setItem("ViewPlanexFrontendUserInfoName",user.firstname)

          Router.push('/')
          
        }
/*       const res1 = await fetch("http://localhost:1337/content-manager/collection-types/api::dif-event.dif-event", {
        method: 'GET',
        headers: myHeaders,
      })
      const result1 = await res1.json()
      console.log(result1.results)
 */
        console.log(isLogged)
        console.log(InfoUser)
        console.log(Token) 
        
      }
     
      


  
    return (
      <form onSubmit={registerUser} style={{paddingTop:"30%", color:"white", display:"flex", flexDirection:"column", position:"relative", left:"25%"}}>
      <div className="row mb-3" style={{width:"50%"}}>
        <label htmlFor="name" className="col-sm-3 col-form-label ">Username</label>
        <div className="col-sm-10">
          <input className="form-control" id="username" username="username" type="text" autoComplete="email" required />
        </div>
      </div>
      <div className="row mb-3" style={{width:"50%"}}>
        <label className="col-sm-3 col-form-label" htmlFor="name">Password</label>
        <div className="col-sm-10">
          <input className="form-control" id="password" name="password" type="password" required />
        </div>
      </div>
      <div className="row mb-3" style={{position:"relative",left:"-17%"}}>
        <div className="col-sm-10 offset-sm-2">
          <div className="form-check">
              <input  className="form-check-input  form-control" type="checkbox" required/>
              <label className="form-check-label">
              &nbsp;&nbsp;&nbsp;&nbsp;I accept the conditions of use 
              </label>
          </div>
        </div>
      </div>
        <button type="submit" className="btn btn-primary" style={{ width:"20%"}}>Sign in</button>
      </form>
    )
  }






