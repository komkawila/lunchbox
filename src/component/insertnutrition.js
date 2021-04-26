
import '../component/css/insertutrition.css';
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'
import gda from '../img/GDA.png'
function Insertutrition() {
    let history = useHistory();
    var str = "";
    str = history.location.search;
    var userID = str.substr(str.indexOf("userid") + 7, str.length);
    // console.log("userID = " + userID);
    const [units, setUnits] = useState([]);
    const [types, setTypes] = useState([]);

    const [nameNutritionN, setnameNutritionN] = useState("")
    const [unitN, setUnitN] = useState("")
    const [typeN, setTypeN] = useState("")

    const [eneregyN, setEneregyN] = useState()
    const [proteinN, setProteinN] = useState()
    const [fatN, setFatN] = useState()
    const [crabN, setCrabN] = useState()



    useEffect(() => {
        axios.get(api + "getunit-ingredients").then((res) => {
            setUnits(res.data);
        })
        console.log(units);
    }, []);

    useEffect(() => {
        axios.get(api + "gettype").then((res) => {
            setTypes(res.data);
        })
        console.log(types);
    }, []);

    const check = async () => {
        console.log("nameNutritionN :" + nameNutritionN);
        console.log("unitN :" + unitN);
        console.log("typeN :" + typeN);
        console.log("eneregyN :" + eneregyN);
        console.log("proteinN :" + proteinN);
        console.log("fatN :" + fatN);
        console.log("eneregyN :" + crabN);
        console.log("================================check");
        await axios.post(api+"addingredients",{
            name_thai : nameNutritionN,
            type_id : typeN,
            unit_food : unitN,
            energy : eneregyN,
            protein : proteinN,
            fat : fatN,
            carbohydrate : crabN,
        });
    }
    // console.log("nameNutritionN :" + nameNutritionN);
    // console.log("unitN :" + unitN);
    // console.log("typeN :" + typeN);
    // console.log("eneregyN :" + eneregyN);
    // console.log("proteinN :" + proteinN);
    // console.log("fatN :" + fatN);
    // console.log("eneregyN :" + crabN);
    return (
        <div>
            <Navbarmain />
            <div className="body-insertnutrition">
                {/* <form> */}
                    <h1>เพิ่มวัตถุดิบ</h1>
                    <hr />
                    <div className="detial-insertnutrition">
                        <span >
                            <h3>ชื่อวัตถุดิบ</h3>
                            <input
                                className="form-control"
                                type="text"
                                value={nameNutritionN}
                                onChange={e => setnameNutritionN(e.target.value)} />
                        </span>
                        <span >
                            <h3>ประเภทวัตภุดิบ</h3>
                            <select className="form-select" onChange={(e)=> {setTypeN(e.target.value)}}>
                                {types.map((data) => {
                                    return (
                                        <option
                                            value={data.type_id}
                                            key={data.id}>
                                           
                                            {data.type}
                                                </option>
                                    )
                                })
                                }
                            </select>

                        </span>
                        <span >
                            <h3>หน่วย</h3>
                            <select className="form-select" onChange={(e)=> {setUnitN(e.target.value)}}>
                                {units.map((data) => {
                                    return (
                                        <option
                                        value={data.unit_food}
                                        key={data.id}>
                                            {data.unit_food}
                                        </option>
                                    )
                                })
                                }
                            </select>

                        </span>
                    </div>
                    <h2>คุณค่าทางโภชนาการ</h2>
                    <div className="detial-calI">
                        <span >
                            <h1>Eneregy :</h1>
                            <hr />
                            <input className="form-control"
                                type="number"
                                value={eneregyN}
                                onWheelCapture={e => { e.target.blur() }}
                                onChange={e => setEneregyN(e.target.value)} />
                        </span>
                        <span >
                            <h1>Protein :</h1>
                            <hr />
                            <input
                                className="form-control"
                                type="number"
                                value={proteinN}
                                onWheelCapture={e => { e.target.blur() }}
                                onChange={e => setProteinN(e.target.value)} />
                        </span>
                        <span >
                            <h1>Fat :</h1>
                            <hr />
                            <input
                                className="form-control"
                                type="number" value={fatN}
                                onWheelCapture={e => { e.target.blur() }}
                                onChange={e => setFatN(e.target.value)} />
                        </span>
                        <span >
                            <h1>Crab :</h1>
                            <hr />
                            <input
                                className="form-control"
                                type="number" value={crabN}
                                onWheelCapture={e => { e.target.blur() }}
                                onChange={e => setCrabN(e.target.value)} />
                        </span>
                    </div>
                    <div className="btn-page">
                        <button onClick={check} type="submit" style={{ backgroundColor: "rgb(39, 139, 146)" }}>บันทึก</button>
                        <button style={{ backgroundColor: "rgb(146, 39, 39)" }}>ยกเลิก</button>
                    </div>

                {/* </form> */}
                <hr />
            </div>
        </div>
    )
}

export default Insertutrition
