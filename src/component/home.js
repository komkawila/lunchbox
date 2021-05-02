import './css/home.css';

import Navbarmain from './navbarmain';
import apple from '../img/apple.jpg';
import carrot from '../img/carrot.jpg';
import breakfast from '../img/breakfast.jpg';
import egg from '../img/egg.jpg';
import fish from '../img/fish.jpg';
import leaf from '../img/leaf.jpg';
import meat from '../img/meat.jpg';
import milk from '../img/milk.jpg';
import axios from 'axios';

import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

import { api } from './urlapi';
import Swal from 'sweetalert2'

function Home() {
    const history = useHistory();

    const [statestore, setStateStore] = useState(0);
    const [userid, setUserid] = useState(0);
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    const [types, setTypes] = useState([]);
    const [typesstate, setTypesstate] = useState(false);
    var arrayypes = [];

    useEffect(() => {
        axios.get(api + "gettype").then((res) => {
            setTypes(res.data);
            (res.data).map((res2) => {
                arrayypes.push(res2);
            });
            // console.log("arrayypes ");
            // console.log(arrayypes);
            // arrayypes.push(res.data);
            // console.log("types   ");
            // console.log(res.data);
        });
    }, []);

    // useEffect(() => {

    //     console.log("types   ");
    //     console.log(types);
    //     console.log("arrayypes   ");
    //     console.log(arrayypes);
    // }, [types]);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 500,
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
                setTimeout(() => {
                    axios.get(api + "login/" + user.uid).then((res) => {
                        console.log("res = ");
                        console.log(res.data[0]);
                        setStateStore(res.data[0].status);
                        setUserid(res.data[0].id_user);
                    })
                }, 0);
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
            }
        } else {
            // console.log("user = null");
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
    const [foods, setFoods] = useState([]);

    // var userid = 2;

    useEffect(() => {
        if (statestore == 1) {
            axios.get(api + "getfoodsusers/" + userid).then((res) => {
                setFoods(res.data);
                console.log("getfoodsuser === ");
                console.log(res.data);
            })
            console.log(foods);
        } else if (statestore == 2) {
            axios.get(api + "getfoods").then((res) => {
                setFoods(res.data);
                console.log("getfoodsuser === ");
                console.log(res.data);
            })
            console.log(foods);
        }

    }, [userid]);


    return (
        <div className="contianner">
            <Navbarmain userid={userid} />
            <div className="cards">
                {
                    foods.map(result => (
                        <Link to={{
                            pathname: "/foods",
                            search: "?id=" + result.id_food + "&userid=" + userid,
                            state: { fromDashboard: true }
                        }}>
                            <div className="cardfoods">
                                <img src={api + 'images/' + result.url}></img>
                                <h4>{result.energy} kcal</h4>
                                <p>{result.name_thai}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>

            <div className="icon-area">
                <div className="icon-area1">
                    {/* <Link to={{
                        pathname: "/ingredients",
                        search: "?ingredients=1"
                    }}>
                        </Link> */}
                        
                    <div onClick={()=>history.push("/ingredients?id=4")} className="icon-item">
                        <img className="box" src={carrot} />
                        <p>ผัก</p>
                    </div>
                    <div onClick={()=>history.push("/ingredients?id=5")} className="icon-item">
                        <img className="box" src={apple} />
                        <p>ผลไม้</p>
                    </div>
                    <div onClick={()=>history.push("/ingredients?id=1")} className="icon-item">
                        <img className="box" src={breakfast} />
                        <p>ธัญพืช</p>
                    </div>
                    <div onClick={()=>history.push("/ingredients?id=10")} className="icon-item">
                        <img className="box" src={leaf} />
                        <p>เครื่องเทศ</p>
                    </div>
                </div>
                <div className="icon-area2">
                    <div onClick={()=>history.push("/ingredients?id=6")} className="icon-item">
                        <img className="box" src={meat} />
                        <p>เนื้อ</p>
                    </div>
                    <div onClick={()=>history.push("/ingredients?id=7")} className="icon-item">
                        <img className="box" src={fish} />
                        <p>ปลา</p>
                    </div>
                    <div onClick={()=>history.push("/ingredients?id=8")} className="icon-item">
                        <img className="box" src={egg} />
                        <p>ไข่</p>
                    </div>
                    <div onClick={()=>history.push("/ingredients?id=9")} className="icon-item">
                        <img className="box" src={milk} />
                        <p>นม</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Home;