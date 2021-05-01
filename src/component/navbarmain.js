import './css/navbarmain.css';
// import { BrowserRouter, Route, Link, Router, Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2'

import axios from 'axios';
import { api } from './urlapi';
function Navbars(props) {
    const history = useHistory();

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    const [userobj, setUserobj] = useState(0);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                console.log("Login Success");
                console.log("user = ");
                console.log(user);
                console.log(user);
                axios.get(api + "login/" + user.uid).then((res) => {
                    // console.log("res = ");
                    // console.log(res.data[0].id_user);
                    setUserobj(res.data[0]);
                })
                // Toast.fire({
                //     icon: 'success',
                //     title: 'Signed in successfully'
                // })
            }
        } else {
            console.log("user = null");
            history.push("/login")
        }
    }, [user]);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            setUser(firebase.auth().currentUser);
        });
        return () => unregisterAuthObserver();
    }, []);

    function signout() {
        firebase.auth().signOut();
        history.push("/login");
    }
    function profile() {
        // history.push("/profile-store")
        console.log("userobj.status  = ");
        console.log(userobj.status);
        if (userobj.status == 1) {
            history.push("/profile-store")
        } else if (userobj.status == 2) {
            history.push("/profile-admin")
        }


    }
    return (
        <div>
            <div className="nav-bars" >
                <nav>
                    <ul >
                        <Link to="/home"><li ><h1 className="lch1">Lunchbox</h1></li></Link>
                        <Link to="/home"><li ><h1 className="lch2">Home</h1></li></Link>
                        <Link to={{
                            pathname: "/menu",
                            // search: "?userid=" + props.userid,
                            state: { fromDashboard: true }
                        }}><li>Menu</li></Link>
                        <Link to="nutrition"><li >Nutrition</li></Link>

                    </ul>
                </nav>
                <form>
                    <input className="form-control" type="text" placeholder="Search" />
                    <button type="submit" >Search</button>

                </form>
                <div className="dropdown">
                    <input type="checkbox" id="checkbox_toggle" />
                    <label for="checkbox_toggle"><i class="fas fa-user"></i></label>
                    <ul>
                        <li><a onClick={profile}><i class="fas fa-book"></i>Profile Setting</a></li>
                        {/* <li><a><i class="fas fa-key"></i>Edit-password</a></li> */}
                        <li><a onClick={signout}><i class="fas fa-sign-out-alt"></i>Sign-out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbars;