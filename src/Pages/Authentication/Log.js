import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../../Hooks/useFirebase";
import "./Reg.scss";

const Log = () => {
    const {googleSignIn,error,loginWithEmailAndPass,setError,saveUser,user, logOut} = useFirebase()
    const [users, setUsers] = useState({})
    const location = useLocation()
    const history = useNavigate()
    const uri = location?.state?.from?.pathname;
    const handleOnBlur = e => {
        const field = e.target.name
        const value = e.target.value

        const userDetails = {...users}
        userDetails[field] = value
        setUsers(userDetails)
    }
    const email = users?.email
    const password = users?.password

    //user log in
    const emailAndPassSignIn = (email,password) => {
        loginWithEmailAndPass(email,password)
        .then(result => {
            setUsers(result.user)
            if (uri) {
                history(uri)  
            }
            else{
                history('/')
            }
        })
        .catch(error => {
            setError(error.message)
        })
    }

    const formHandle = e => {
        e.preventDefault()
        emailAndPassSignIn(email,password)   
    }

  return (
    <div className="reg-container">
      <div class="form_wrapper">
        <div class="form_container">
          <div class="title_container-reg">
            <h2>Responsive Registration Form</h2>
          </div>
          <div class="row-reg clearfix">
            <div class="">
              <form onSubmit= {formHandle}>
                <div class="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-envelope"></i>
                  </span>
                  <input
                    onBlur={handleOnBlur}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div class="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-lock"></i>
                  </span>
                  <input
                    onBlur={handleOnBlur}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                {
                    user.email && <>
                    <button onClick={logOut} className=" btn btn-danger my-2">Log Out</button> <br /></>
                }
                <Link  to='/reg'>Create Account?</Link>

                <input className="button mt-2" type="submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
