import React, { useState, useEffect } from 'react'
import '../css/login.css'
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';
import logo from '../../img/login/logo1.png'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import axios from 'axios';

import { api } from '../urlapi';
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

    const clickLogin = () => {
        console.log("login");
    }
    const clickRegistor = () => {
        console.log("registor");
        history.push("/registor")
    }

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                console.log("Login Success");
                console.log("user = ");
                console.log(user.uid);
                //   history.push("/home")
                axios.get(api + "login/"+user.uid).then((res) => {
                    console.log("res = ");
                    console.log(res.data);
                    if(res.data.length != 0){
                        history.push("/home")
                    }else{
                        history.push("/registor")
                    }
                })
            }
        }
    }, [user]);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            setUser(firebase.auth().currentUser);
        });
        return () => unregisterAuthObserver();
    }, []);

    return (

        <div className="container-login">
            <div className="box login">
                <div className="login-img">
                    <img src={logo} />
                </div>

                {/* <div className="btn-login">
                    <button className="button is-success lg " style={{ width:"100%" }} onClick={() => { clickRegistor() }}>Register</button>
                </div>
                <div className="or">
                    <hr style={{ width: "100%", backgroundColor: "white", height: "2px", marginTop: "15px" }} />
                    <h1>or</h1>
                    <hr style={{ width: "100%", backgroundColor: "white", height: "2px", marginTop: "15px" }} />
                </div> */}
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
