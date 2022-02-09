import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { URL } from '.';
import useSWR from "swr";


let username=[]
let password=[]


export default function login() {
  username = 'test@test.com'
  password = 'Password'
  
  const data = loginf()
  const data2 = () =>{
    console.log(data)
  }
  React.useEffect(() => {
    //console.log(data)
  }, []);


  return (
    <Layout>

      <Form></Form>

    </Layout>
      
      );
}



async function fetcher(url){
    const res = await fetch(URL+url, {
                        method: 'POST',
                        body: new URLSearchParams({
                            'identifier': username,
                            'password': password
                        })
                    });
    
    const {jwt,user} = await res.json();
    return {jwt,user}
  }


function loginf() {
  
    const {data,error} = useSWR(
        "/api/auth/local",
      fetcher)
    if(error) return "an error has occured "+{error}
    if(!data) return "loading..."
   
    return {
        data,
        isLoading: !error && !data,
        error
    }
  }





  function Form() {
    const registerUser = async event => {
      event.preventDefault()
  
      const res = await fetch(URL+'/api/auth/local?populate=%2A', {
        method: 'POST',
        body: new URLSearchParams({
            'identifier': event.target.username.value,
            'password': event.target.password.value
        })
    })
  
      const result = await res.json()
      console.log(result)
      
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
              <input className="form-control" className="form-check-input" type="checkbox" required/>
              <label className="form-check-label">
                I accept the conditions of use 
              </label>
          </div>
        </div>
      </div>
        <button type="submit" className="btn btn-primary" style={{ width:"20%"}}>Sign in</button>
      </form>
    )
  }






