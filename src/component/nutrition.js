
import './css/nutrition.css';
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'
import gda from '../img/GDA.png'
import ReactDOM from "react-dom";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

function Nutrition() {

    const history = useHistory();

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);
    const [userid, setUserid] = useState(0);
    const [userstatus, setUserstatus] = useState(0);

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                console.log("Login Success");
                console.log("user = ");
                console.log(user);
                console.log(user);
                axios.get(api + "login/" + user.uid).then((res) => {
                    // console.log("res = ");
                    setUserid(res.data[0].id_user);
                    setUserstatus(res.data[0].status);
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


    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const [count, setCount] = useState(0)
    const [foods, setFoods] = useState([]);
    // const [textfood, setTextFood] = useState([]);



    // var userid = 2;
    useEffect(() => {
        // console.log("data = ");
        const textfood = [];
        if(userstatus == 1){
            axios.get(api + "getfoodsusers/" + userid).then((res) => {
                const { data } = res;
                setFoods(data);
            })
        }else if(userstatus == 2){
            axios.get(api + "getfoods").then((res) => {
                const { data } = res;
                setFoods(data);
            })
        }
        
        if (searchTerm === "") {
            console.log("error")
            // textfood.pop();
        } else {
            foods.map(data => {
                textfood.push(data.name_thai);
            })

        }


        console.log("data = " + textfood)
        const resultsx = textfood.filter(data =>
            data.toLowerCase().includes(searchTerm)
        );
        setSearchResults(resultsx);
        // console.log(foods);
    }, [searchTerm]);




    return (
        <div >
            <Navbarmain />
            <div className="body-nutrition">
                <h1>ค้นหาข้อมูลโภชณาการ</h1>
                <div className="head-nutrition">
                    <input
                        className="form-control"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="ค้นหาอาหาร"
                    />

                    <Link to="/insert-nutrition"><button style={{ backgroundColor: "rgb(8, 155, 20)" }}>เพิ่มวัตถุดิบใหม่</button></Link>
                </div>
                <hr />
                <div className="result-search">
                    <h2>Result</h2>
                </div>
                {searchResults.map(item => (
                    <Link to={{
                        pathname: "/getfood",
                        search: "?name_food=" + item + "&userid=" + userid,
                        state: { fromDashboard: true }
                        }}
                        style={{textDecoration: "none"}}>
                            <div className="item-search" key={item}>
                                <a>{item} </a>
                            </div>
                            
                    </Link>
                ))}
            </div>

        </div>
    );
}
export default Nutrition;