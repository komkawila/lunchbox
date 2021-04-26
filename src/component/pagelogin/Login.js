import React from 'react'
import '../css/login.css'
import { BrowserRouter, Route, Link, Router, Redirect,useHistory } from 'react-router-dom';
import logo from '../../img/login/logo1.png'
function Login() {
    const history = useHistory();

    const clickLogin = ()=>{
        console.log("login");
    }
    const clickRegistor = ()=>{
        console.log("registor");
        history.push("/registor")
    }
    return (
        <div className="container-login">
            <div className="box login">
                <div className="login-img">
                    <img src={logo} />
                </div>
                <div className="field">
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email" style={{ borderRadius: "5px" }} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope fa-xs" />
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check fa-xs" />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock" />
                        </span>
                    </p>
                </div>
                <div className="btn-login">
                    <button className="button is-link lg " style={{ marginRight: "5px" }} onClick={()=>{clickLogin()}}>Login</button>
                    <button className="button is-success lg " style={{ marginLeft: "5px" }} onClick={()=>{clickRegistor()}}>Register</button>

                </div>
                <div className="or">
                    <hr style={{ width: "100%", backgroundColor: "white", height: "2px", marginTop: "15px" }} />
                    <h1>or</h1>
                    <hr style={{ width: "100%", backgroundColor: "white", height: "2px", marginTop: "15px" }} />
                </div>
                <div className="btn-fg">
                    <button class="button is-primary">
                        <span class="icon fg">
                            <i class="fab fa-google-plus-square"></i>

                        </span>
                        <span>Continure with Google</span>
                    </button>
                    <button class="button is-link">
                        <span class="icon fg">
                            <i class="fab fa-facebook-square"></i>
                        </span>
                        <span>Continure with Facebook</span>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Login
