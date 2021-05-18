import { useState, useEffect } from 'react'
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
//component did mount useeffect use
//used as component did update() too

//if we dont want to call use effect on update
//we will pass second argument to useEffect()
//second arg will be blank array

function Login(props) {
    var [formerros, setFormerrors] = useState({})

    var validate = function (elements) {
        var errors = {}
        console.log("validate form field", elements, elements.email)

        if (!elements.email.value) {
            errors.email = "Enter your name"
        }


        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(elements.email.value)) {
            errors.email = "Please Enter Valid Email"
        }


        if (!elements.password.value) {
            errors.password = "Enter your password"
        }

        if (typeof elements.password.value !== "undefined") {
            if (!elements.password.value.match(
                '^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$'
            )) {
                //formIsValid = false;
                errors.password = "Please valid password";
            }
        }



        var errorskey = Object.keys(errors)
        if (errorskey.length > 0)
            return errors
        else
            return false
    }
    var [error, setError] = useState()
    // var user={}
    var [user, setUser] = useState({})


    let getEmail = (event) => {
        setUser({
            ...user,
            email: event.target.value
        })
        user.email = event.target.value;
    }

    let getPassword = (event) => {
        setUser({
            ...user,
            password: event.target.value
        })
        user.password = event.target.value;
    }

    let login = function () {
        var form = document.getElementById('loginform')

        console.log("form field", form.elements, form.controls)
        var errors = validate(form.elements)
        if (errors) {
            setFormerrors(errors)
        }
        if (!user.email || !user.password) {
            setError("Please enter valid credentials")

        }
        else {
            console.log("user trying to login", user)

            props.dispatch({
                type: "LOGIN",
                payload: user
            })

            props.history.push("/")
            // let apiurl = "https://apibyashu.herokuapp.com/api/login"
            // axios({
            //     url: apiurl,
            //     method: "post",
            //     data: user
            // }).then((response) => {
            //     console.log("response from signup api", response.data)
            //     if (response.data.token) {
            //         localStorage.token = response.data.token
            //         localStorage.email = response.data.email
            //         props.dispatch({
            //             type: "LOGIN",
            //             payload: response.data
            //         })
            //        props.history.push("/")
            //     } else {
            //         alert("invalid credentials")
            //     }

            // }, (error) => {
            //     console.log("Error from signup api", error)
            // })
        }

        console.log("user is trying to login", user)

    }


    let forgotpassword = function () {

        var baseurl = process.env.REACT_APP_BASE_URL;

        let apiurl = baseurl + "/api/recoverpassword"
        // let apiurl = "https://apibyashu.herokuapp.com/api/recoverpassword"
        var token = localStorage.token
        var email = localStorage.token
        axios({
            url: apiurl,
            method: "post",
            headers: { authtoken: token },
            data: { email: user.email }
        }).then((response) => {
            console.log("Forgot password => ", response.data)
            if (response.data.message == "Password Sent to your email") {
                alert("Password has been sent to your email.Please check email!")
            }

        }, (error) => {
            console.log("api Error", error)
            // setError("Invalid Login")
        })

    }
    return (

        <div >
            <br /><br />
            {/* {!props.islogin?<><h3>Login</h3> */}
            {/* <div style={{width:"50%", margin:"auto",border: "1px solid",padding: "35px",boxshadow: "5px 10px #888888"}}> */}
            <div className="fromcustom">


                <form id="loginform">

                    <div className="form-group">
                        <label style={{ float: "left" }}>Email</label>
                        <input type="email" name="email" className="form-control" onChange={getEmail}></input>
                        <div className="form-error">{formerros?.email && <div>{formerros.email}</div>}</div>

                        {/* {user && <label>{user.email}</label>} */}
                    </div>
                    <div className="form-group">
                        <label style={{ float: "left" }}>Password</label>
                        <input type="password" name="password" className="form-control" onChange={getPassword}></input>
                        <div className="form-error">{formerros?.password && <div>{formerros.password}</div>}</div>
                        {/* {user && <label>{user.password}  </label>}   */}
                    </div>
                    {/* <div className="text-danger">
                        {error}
                    </div> */}
                    <div style={{ float: "left" }}>
                        <Link to="/signup">sign up? Click here</Link>
                    </div>
                    <div style={{ float: "right" }}>
                        <Link onClick={forgotpassword}>Forgot Password?</Link>
                    </div>


                </form>
                <br />
                <button className="btn btn-primary" onClick={login} style={{
                    marginLeft: "40%"
                }}>Login</button>
            </div>


        </div>



    )
}
Login = withRouter(Login)
export default connect(function (state, props) {
    return {
        cart: state?.cart,
        user: state?.user?.name,
        loginstatus: state?.isloggin
    }

})(Login)