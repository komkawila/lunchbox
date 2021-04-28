import React from 'react'
import '../css/login.css'
import { BrowserRouter, Route, Link, Router, Redirect,useHistory ,useEffect} from 'react-router-dom';
import logo from '../../img/login/logo1.png'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAZyheJ6ihWLjoPJXW4X-LKUGjEtM7wY3c",
    authDomain: "lunchbox-53965.firebaseapp.com",
    projectId: "lunchbox-53965",
    storageBucket: "lunchbox-53965.appspot.com",
    messagingSenderId: "921824850689",
    appId: "1:921824850689:web:336ab9087cc896e4aca100",
    measurementId: "G-FY3S2G0GKB"
  };
  firebase.initializeApp(config);
  
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

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
                    {/* <button class="button is-primary">
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
                    </button> */}
                    <StyledFirebaseAuth className="btn-loginall" uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

                </div>

            </div>

        </div>
    )
}

export default Login
