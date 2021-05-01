

import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'
import gda from '../img/GDA.png'
import '../component/css/menu-store.css'
const storeName = [
    "aaaaaaaaaaaaaaaa",
    "bbbbbbbbbbbbbbbb",
    "cccccccccccccccc",
    "dddddddddddddddd",
    "eeeeeeeeeeeeeeee",
    "ffffffffffffffff",
    "gggggggggggggggg",
    "hhhhhhhhhhhhhhhh"
]
function MenuStore() {
    let history = useHistory();
    var str = "";
    // str = history.location.search;
    // var userID = str.substr(str.indexOf("userid") + 7, str.length);
    // console.log("userID = " + userID);
    const [statestore, setStateStore] = useState(0);
    const [foods, setFoods] = useState([]);
    const [userID, setUserid] = useState(0);

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    const [store, setStore] = useState([]);

    useEffect(() => {
        axios.get(api + "getstores").then((res) => {
            setStore(res.data);
        });
    }, []);


    useEffect(() => {
        console.log(store);
    }, [store]);

    return (
        <div>
            <Navbarmain />
            <div className="body-MenuStore">
                <h1>ร้านอาหาร</h1>
                <hr />
                <div className="result-MenuStore">
                    <h2>Result</h2>
                </div>
                {store.map((data, key) => {
                    return (
                        <Link to={{
                            pathname: "/menu",
                            search: "?id_user=" + data.id_user,
                            state: { fromDashboard: true }
                        }}>
                            <div className="storeName-map">
                                <p>{key + 1}. </p>
                                <p>{data.namestore}</p>
                            </div>

                        </Link>

                    )
                })}
            </div>
        </div>
    )
}

export default MenuStore
