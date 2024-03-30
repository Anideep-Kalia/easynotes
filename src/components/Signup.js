import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  
  const [credentials,setCredentials] = useState({name:"",email:"", password:"",cpassowrd:""})
  let navigate = useNavigate();          // it lets you use/acccess data used by react-router  like in line 24

  const handleSubmit= async(e) => {
    e.preventDefault();
    const {name,email,password} = credentials;       // this is destructuring of the props so we can use them independently
    //the below code is taken from NoteState
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password}) //this is that same body as we do in thunderclient
      });
      const json= await response.json();       // in this case which is auth token 
      console.log(json);
        // Save the auth token and redirect
        if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate("/");        //this is redirecting me to the home page after I login
        props.showmsg("Account created SUCCESSFULLY","success")
      }
      else{props.showmsg("Invalid Credentials","danger")}
    }
  

  const onChange= (e) =>{                                                    //this is fucntion is one of its kind
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">

    <label className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>

    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>

    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm your Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div> 
  )
  }

export default Signup
