import '../css/main.css'
import page0 from '../../img/login/logo2.png'
import {Nav,BrowserRouter,Route,Link,Router,Redirect,useHistory} from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

function Main() {
    
    const history = useHistory();

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                console.log("Login Success");
                console.log("user = ");
                console.log(user);
                console.log(user);
                history.push("/home")
            }
        } else {
            console.log("user = null");
            // history.push("/login")
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
        <div className="App">
            <div className="Body">
                <img src={page0} alt="Logo"/>
                <div className="bt_start">
                    <Link className="btn btn-primary btn-lg" to="/pre1" role="button">Start</Link>
                </div>
            </div>
        </div>
    );
}

export default Main;
