import './css/home.css';

import Navbarmain from './navbarmain';
import apple from '../img/apple.png';
import carrot from '../img/carrot.png';
import breakfast from '../img/breakfast.png';
import egg from '../img/egg.png';
import fish from '../img/fish.png';
import leaf from '../img/leaf.png';
import meat from '../img/meat.png';
import milk from '../img/milk.png';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Router, Redirect } from 'react-router-dom';
import axios from 'axios';

import { api } from './urlapi';

function Home() {
    const [foods, setFoods] = useState([]);

    var userid = 2;

    useEffect(() => {
        axios.get(api + "getfoods").then((res) => {
            setFoods(res.data);
        })
        console.log(foods);
    }, []);

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
                    <div className="icon-item">
                        <img className="box" src={carrot} />
                        <p>ผัก</p>
                    </div>
                    <div className="icon-item">
                        <img className="box" src={apple} />
                        <p>ผลไม้</p>
                    </div>
                    <div className="icon-item">
                        <img className="box" src={breakfast} />
                        <p>ธัญพืช</p>
                    </div>
                    <div className="icon-item">
                        <img className="box" src={leaf} />
                        <p>สมุมไพร</p>
                    </div>
                </div>
                <div className="icon-area2">
                    <div className="icon-item">
                        <img className="box" src={meat} />
                        <p>เนื้อสัตว์</p>
                    </div>
                    <div className="icon-item">
                        <img className="box" src={fish} />
                        <p>ปลา</p>
                    </div>
                    <div className="icon-item">
                        <img className="box" src={egg} />
                        <p>ไข่</p>
                    </div>
                    <div className="icon-item">
                        <img className="box" src={milk} />
                        <p>นม</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;