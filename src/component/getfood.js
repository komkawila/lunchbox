
import './css/getfood.css';
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'
import gda from '../img/GDA.png'
import ReactDOM from "react-dom";

const people = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
];

function Getfood() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const [count, setCount] = useState(0)
    const [foods, setFoods] = useState([]);
    // const [textfood, setTextFood] = useState([]);

    useEffect(() => {
        // console.log("data = ");
        var userid = 2;
        const textfood = [];
        axios.get(api + "getfoodsusers/" + userid).then((res) => {
            const { data } = res;
            setFoods(data);
        })
        if (searchTerm === "") {
            console.log("error")
            textfood.pop();
        } else {
            foods.map(data => {
                textfood.push(data.name_thai);
            })

        }


        console.log("data = " + textfood)
        const resultsx = textfood.filter(person =>
            person.toLowerCase().includes(searchTerm)
        );
        setSearchResults(resultsx);
        // console.log(foods);
    }, [searchTerm]);




    return (
        <div >
            <Navbarmain />
            <div className="body-getfood">
                <div className="title">
                    <h1>ข้าว</h1>
                </div>
                <div className="cal-getfoods">
                    <span>
                        <p>Energy</p>
                        <h1>0</h1>
                        <p>kcal</p>
                    </span>
                    <span>
                        <p>Protein</p>
                        <h1>0</h1>
                        <p>g/100g</p>
                    </span>
                    <span>
                        <p>Fat</p>
                        <h1>0</h1>
                        <p>g/100g</p>
                    </span>
                    <span>
                        <p>Carb</p>
                        <h1>0</h1>
                        <p>g/100g</p>
                    </span>
                </div>
                <hr />
                <div className="data-rdi">
                    <div>
                        <h1>%RDI</h1>
                    </div>

                    <div>
                        <h6>Protein</h6>
                        <progress value="55" max="100"></progress>
                        <p>"55" g/100</p>
                    </div>

                </div>
                <div className="rdi-box">
                    %RDI คือ ปริมาณสารอาหารที่แนะนำให้รับใน 1 วัน <br />
                    โดยเทียบที่ปริมาณพลังงาน 2,000 kcal
                </div>
            </div>

        </div>
    );
}
export default Getfood;