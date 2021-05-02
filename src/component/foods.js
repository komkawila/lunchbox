import './css/foods.css';
import {useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'

function Foods() {
    let history = useHistory();
    var str = "";
    str = history.location.search;

    var splits = str.split("&");
    var userID = splits[1].substr(splits[1].indexOf("userid") + 7, splits[1].length);
    var foodID = splits[0].substr(splits[1].indexOf("id"), splits[0].length);
    // console.log("splits = ");
    // console.log(splits);
    // console.log("userID = ");
    // console.log(userID);
    // console.log("foodID = ");
    // console.log(foodID);
    const [foods, setFoods] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [statestart, setStatestart] = useState(0);

    useEffect(() => {
        axios.get(api + "getfoods/" + foodID).then((res) => {
            setFoods(res.data);
        })
        // console.log(foods)
    }, []);
    useEffect(() => {
        axios.get(api + "getingredientsfoods/" + foodID).then((res) => {
            setIngredients(res.data);
        })
        console.log(ingredients)
    }, []);
    useEffect(() => {
        axios.get(api + "getfoods/" + foodID).then((res) => {
            setFoods(res.data);
        })
    }, []);
    const btn = () => {

    }
    const [tagp,setTagp] = useState("");
    const showIngredient =  (res,key) => {
        var pp = "";
        console.log(res);
        var kom1 = false;
        axios.get(api + "getingredients/" + res.id_ingredient).then((res) => {
        // console.log(res.data[0].name_thai);
            // return (
            //     // <p style={{ width: 350, marginTop: 10 }}>{key + 1}. {res.data[0].name_thai}</p>
            //     <p style={{ width: 350, marginTop: 10 }}>A</p>
            // )
            pp = res.data[0].name_thai;
            console.log("pp = ");
            console.log(pp);
            kom1 = true;
            // return ()
            setTagp(() => <p style={{ width: 350, marginTop: 10 }}>{pp}</p>);
            setStatestart(statestart + 1);
        });
        if(kom1 === true){
            console.log("a = ");
        console.log(pp);
        console.log("End");
        }
        
        return <p style={{ width: 350, marginTop: 10 }}>{tagp}</p>
    }

    return (
        <div>
            <Navbarmain />
            {foods.map((data) => {
                return (
                    <div className="body-food">
                        <div className="item-food">
                            <div className="img-food">

                                <img src={api + 'images/' + data.url} />

                            </div>

                            <div className="detial-food">
                                <div className="title-food">
                                    <div>{data.name_thai} :</div>
                                    <p >ราคา</p>
                                    <div><img src={coin} style={{width: 30,height: 30}}/> </div>
                                    <button onClick={btn}>edit</button>
                                </div>
                                <hr/>
                                <div className="cal-food">
                                    <span>
                                        <p>Energy</p>
                                        <p style={{fontSize:"32px",fontWeight:"bold"}}>{data.energy.toFixed(0)}</p>
                                        <p>kcal</p>
                                    </span>
                                    <span>
                                        <p>Protein</p>
                                        <p style={{fontSize:"32px",fontWeight:"bold"}}>{data.protein.toFixed(0)}</p>
                                        <p>g/100g</p>
                                    </span>
                                    <span>
                                        <p>Fat</p>
                                        <p style={{fontSize:"32px",fontWeight:"bold"}}>{data.fat.toFixed(0)}</p>
                                        <p>g/100g</p>
                                    </span>
                                    <span>
                                        <p>Carb</p>
                                        <p style={{fontSize:"32px",fontWeight:"bold"}}>{data.carbohydrate.toFixed(0)}</p>
                                        <p>g/100g</p>
                                    </span>
                                </div>
                                <hr></hr>
                                <div className="material-food">
                                    <h4>วัตถุดิบ</h4>
                                    {ingredients.map((data, key) => {
                                        return (
                                            <div style={{ display: "flex" ,marginTop:"20px"}}>
                                                <div className="n-foods" >{key + 1}. {data.name_thai}</div>
                                                <div className="na-foods" >{data.ingredient_value}</div>
                                                <div className="u-foods" >{data.unit}</div>
                                                <div className="p-foods" >ราคา</div>
                                                <img className="im-foods" src={coin} style={{width: 30,height: 30}}/> 
                                            </div>
                                            
                                        )
                                    })}
                                </div>
                                <hr></hr>
                                <div className="sol-food">
                                    <h4>รายละเอียด</h4>
                                    <p>{data.descrition}</p>
                                </div>
                                <hr></hr>
                            </div>

                        </div>
                    </div>
                )
            })}

        </div>
    );
}

export default Foods;