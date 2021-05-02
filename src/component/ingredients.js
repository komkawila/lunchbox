

import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'
import gda from '../img/GDA.png'
import '../component/css/ingredients.css'

function Ingredients() {
    let history = useHistory();
    // str = history.location.search;
    // var userID = str.substr(str.indexOf("userid") + 7, str.length);
    // console.log("userID = " + userID);
    const [type, setType] = useState(0);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // console.log("history = ");
        var str = history.location.search;
        setType(str.substring(str.indexOf("type") + 5, str.length));
    }, []);

    useEffect(() => {
        console.log(type);
        if (type != 0) {
            axios.get(api + "gettypeingredients/" + type).then((res) => {
                setIngredients(res.data);
            })
        }
    }, [type]);


    // const [statestore, setStateStore] = useState(0);
    // const [foods, setFoods] = useState([]);
    // const [userID, setUserid] = useState(0);

    // const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    // const [user, setUser] = useState([]);

    // const [store, setStore] = useState([]);

    // useEffect(() => {
    //     axios.get(api + "getstores").then((res) => {
    //         setStore(res.data);
    //     });
    // }, []);


    // useEffect(() => {
    //     console.log(store);
    // }, [store]);
// http://paelectronic.3bbddns.com:15249/ingredients?type=4
    return (
        <div>
            <Navbarmain />
            <div className="body-ingredients">
                {ingredients.length!=0? <h1>วัตถุดิบ : {ingredients[0].type}</h1> : null}
                <hr />
                <div className="result-ingredients">
                    <h2>Result</h2>
                </div>
                
                <table class="table is-bordered ">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อวัตถุดิบ</th>
                            <th>หน่วย</th>
                            <th>Eneregy</th>
                            <th>Protein</th>
                            <th>Fat</th>
                            <th>Crab</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {ingredients.map((data, key) => {
                    return (
                        <tr className="tbody-data">
                            <td>{key+1}</td>
                            <td>{data.name_thai}</td>
                            <td>{data.unit_food}</td>
                            <td>{data.energy}</td>
                            <td>{data.protein}</td>
                            <td>{data.fat}</td>
                            <td>{data.carbohydrate}</td>
                        </tr>


                    )
                })}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ingredients
