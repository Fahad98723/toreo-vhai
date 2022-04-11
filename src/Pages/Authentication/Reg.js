import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../../Hooks/useFirebase";
import "./Reg.scss";

const Reg = () => {
  const {googleSignIn,error,signupWithEmailAndPass,saveUser,setError} = useFirebase()
    const location = useLocation()
    const history = useNavigate()
    const uri = location?.state?.from?.pathname;
    const [user, setUser] = useState({})

    const handleOnBlur = e => {
        const field = e.target.name
        const value = e.target.value

        const userDetails = {...user}
        userDetails[field] = value
        setUser(userDetails)
        console.log(user);
    }
    const email = user?.email
    const password = user?.password
    const rePassword = user?.rePassword
    const name = user?.firstName + ' ' + user?.lastName 

    //user signup
    const formHandle = e => {
        e.preventDefault()
        console.log(user);
        if (password === rePassword) {
          signupWithEmailAndPass(email, password, name, history)
        }
        else{
          alert('Password Did not matched')
        }
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
                <div class="input_field">
                  {" "}
                  <span>
                    <i aria-hidden="true" class="fa fa-lock"></i>
                  </span>
                  <input
                    onBlur={handleOnBlur}
                    type="password"
                    name="rePassword"
                    placeholder="Re-type Password"
                    required
                  />
                </div>
                <div class="row-reg clearfix">
                  <div class="col_half">
                    <div class="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" class="fa fa-user"></i>
                      </span>
                      <input onBlur={handleOnBlur} type="text" name="firstName" placeholder="First Name" />
                    </div>
                  </div>
                  <div class="col_half">
                    <div class="input_field">
                      {" "}
                      <span>
                        <i aria-hidden="true" class="fa fa-user"></i>
                      </span>
                      <input
                      onBlur={handleOnBlur}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd1" />
                  <label for="rd1">Male</label>
                  <input type="radio" name="radiogroup1" id="rd2" />
                  <label for="rd2">Female</label>
                </div>
                <div class="input_field select_option">
                  <select>
                    <option>Select a country</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <div class="select_arrow"></div>
                </div>
                <div class="input_field checkbox_option">
                  <input type="checkbox" id="cb1" />
                  <label for="cb1">I agree with terms and conditions</label>
                </div>
                <div class="input_field checkbox_option">
                  <input type="checkbox" id="cb2" />
                  <label for="cb2">I want to receive the newsletter</label>
                </div>

                <Link  to='/log'>Already Have Account?</Link>
                <input className="button mt-2" type="submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reg;
