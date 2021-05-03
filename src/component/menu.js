
import './css/menu.css';
import { useHistory } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import { api } from './urlapi';
import coin from '../img/coin.png'
import gda from '../img/GDA.png'
import Swal from 'sweetalert2'
function Menu() {
    let history = useHistory();
    var str = "";
    const [historyid, setHistoryid] = useState(0);
    // str = history.location.search;
    // var id_user = str.substr(str.indexOf("id_user") + 7, str.length);
    // console.log("id_user = " + id_user);
    const [statestore, setStateStore] = useState(0);
    const [foods, setFoods] = useState([]);
    const [foodsearch, setFoodsSearch] = useState([]);
    const [userID, setUserid] = useState(0);

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    const [input, setInput] = useState("");

    useEffect(() => { // Search Foods
        if (input == "") {
            setFoodsSearch(foods);
        } else {
            setFoodsSearch(foods.filter((member) => {
                return member.name_thai.toLowerCase().includes(input);
            }))
        }
    }, [input]);

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                // console.log("menu Login Success");
                // console.log("user = ");
                // console.log(user.uid);
                axios.get(api + "login/" + user.uid).then((res) => {
                    // console.log("res = ");
                    // console.log(res.data[0].id_user);
                    setStateStore(res.data[0].status);
                    setUserid(res.data[0].id_user);
                })
                // console.log(user);
            }
        }

    }, [user]);

    useEffect(() => {
        str = history.location.search;
        setHistoryid(str.substr(str.indexOf("id_user") + 8, str.length));
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            setUser(firebase.auth().currentUser);
        });
        return () => unregisterAuthObserver();
    }, []);

    useEffect(() => {

        // console.log("historyid = " + historyid);
    }, [historyid]);


    useEffect(() => {
        if (historyid != 0) {

        }

        if (statestore == 1) {
            axios.get(api + "getfoodsusers/" + userID).then((res) => {
                setFoods(res.data);
                // console.log("getfoodsuser === ");
                // console.log(res.data);
            })
            // console.log(foods);
        } else if (statestore == 2) {
            axios.get(api + "getfoodsusers/" + historyid).then((res) => {
                setFoods(res.data);
                // console.log("getfoodsuser === ");
                // console.log(res.data);
            })
            // console.log(foods);
        }

    }, [userID]);

    const deleteFoods = (id_food, name_thai) => {
        Swal.fire({
            title: 'ยืนยันการลบ \'' + name_thai + '\'',
            text: 'ต้องการลบ \'' + name_thai + '\' ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ต้องการ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(id_food);
                axios.delete(api + "deletefoods/" + id_food).then((res) => {
                    setFoods(
                        foods.filter((val) => {
                            return val.id_food != id_food;
                        })
                    )
                }).then(Swal.fire(
                    'ลบข้อมูลสำเร็จแล้ว',
                    'ลบ \'' + name_thai + '\' สำเร็จ',
                    'success'
                ));

            }
        })
    }


    useEffect(() => {
        axios.get(api + "getfoodsusers/" + userID).then((res) => {
            setFoods(res.data);
        })
        // console.log(foods);
    }, []);

    return (
        <div>
            <Navbarmain />
            <div className="body-menu">
                <form>
                    <div className="head-menu">
                        <input className="form-control" type="text" onChange={(data) => setInput(data.target.value)} />
                        <button className="insertfoods1" style={{ backgroundColor: "rgb(8, 155, 20)", borderRadius: "40px", width: "40px", height: "40px", lineHeight: "20px", padding: "10px 12px", fontSize: "24px" }} onClick={() => { history.push("/menagefood") }}>+</button>
                        <button className="insertfoods2" style={{ backgroundColor: "rgb(8, 155, 20)" }} onClick={() => { history.push("/menagefood?userid=" + userID) }}>เพิ่มรายการอาหาร</button>

                    </div>

                </form>
                <hr></hr>
                <div className="list-item">
                    {(input == "") ? foods.map((data) => {
                        return (
                            <div>
                                <div className="list-menu">
                                    <img src={api + 'images/' + data.url} />
                                    <span>
                                        <h4>{data.name_thai}</h4>
                                        <div>
                                            <h6>Protein</h6>
                                            <progress value={data.protein} max="100"></progress>
                                            <p>{data.protein} g/100</p>
                                        </div>
                                        <div>
                                            <h6>Fat</h6>
                                            <progress value={data.fat} max="100"> </progress>
                                            <p>{data.fat} g/100</p>
                                        </div>
                                        <div>
                                            <h6>Carb</h6>
                                            <progress value={data.carbohydrate} max="100"></progress>
                                            <p>{data.carbohydrate} g/100</p>
                                        </div>
                                    </span>
                                    <a href={"sticker?kcal=" + data.energy + "&prot=" + data.protein + "&fat=" + data.fat + "&carb=" + data.carbohydrate} target="_blank" className="gda">
                                        <img src={gda} style={{ margin: "auto" }} />
                                    </a>

                                    <div className="kcal">
                                        <span className="kcal-span1">
                                            <p className="kcal-span1-p1" style={{ color: "white", marginTop: "5px" }}> {data.energy} </p>
                                            <p className="kcal-span1-p2" style={{ color: "white", marginTop: "5px" }}> kcal</p>
                                        </span>
                                        <span className="kcal-span2">
                                            <img src={coin} />
                                            <p className="kcal-span1-p1" style={{ color: "rgb(0, 120, 212)", lineHeight: "16px" }}> kcal</p>
                                        </span>
                                    </div>


                                    <div className="item-right">
                                        <button className="btn-edtiFood" style={{ backgroundColor: "rgb(223, 208, 6)", marginRight: "5px" }} 
                                        onClick={()=>{history.push("editfood?userid="+userID+"&foodid="+data.id_food)}}>แก้ไข</button>
                                        <button className="btn-deleteFood" style={{ backgroundColor: "rgb(214, 36, 30)" }} onClick={() => deleteFoods(data.id_food, data.name_thai)}>ลบ</button>

                                    </div>

                                </div>

                                <hr />
                            </div>
                        )
                    }) : foodsearch.map((data) => {
                        return (
                            <div>
                                <div className="list-menu">
                                    <img src={api + 'images/' + data.url} />
                                    <span>
                                        <h4>{data.name_thai}</h4>
                                        <div>
                                            <h6>Protein</h6>
                                            <progress value={data.protein} max="100"></progress>
                                            <p>{data.protein} g/100</p>
                                        </div>
                                        <div>
                                            <h6>Fat</h6>
                                            <progress value={data.fat} max="100"> </progress>
                                            <p>{data.fat} g/100</p>
                                        </div>
                                        <div>
                                            <h6>Carb</h6>
                                            <progress value={data.carbohydrate} max="100"></progress>
                                            <p>{data.carbohydrate} g/100</p>
                                        </div>
                                    </span>
                                    <a href={"sticker?kcal=" + data.energy + "&prot=" + data.protein + "&fat=" + data.fat + "&carb=" + data.carbohydrate} target="_blank" className="gda">
                                        <img src={gda} style={{ margin: "auto" }} />
                                    </a>

                                    <div className="kcal">
                                        <span className="kcal-span1">
                                            <p className="kcal-span1-p1" style={{ color: "white", marginTop: "5px" }}> {data.energy} </p>
                                            <p className="kcal-span1-p2" style={{ color: "white", marginTop: "5px" }}> kcal</p>
                                        </span>
                                        <span className="kcal-span2">
                                            <img src={coin} />
                                            <p className="kcal-span1-p1" style={{ color: "rgb(0, 120, 212)", lineHeight: "16px" }}> kcal</p>
                                        </span>
                                    </div>


                                    <div className="item-right">
                                        {/* <button className="btn-edtiFood" style={{ backgroundColor: "rgb(223, 208, 6)", marginRight: "5px" }} >แก้ไข</button> */}
                                        <button className="btn-edtiFood" style={{ backgroundColor: "rgb(223, 208, 6)", marginRight: "5px" }} 
                                        onClick={()=>{history.push("editfood?userid="+userID+"&foodid="+data.id_food)}}>แก้ไข</button>
                                        <button className="btn-deleteFood" style={{ backgroundColor: "rgb(214, 36, 30)" }} onClick={() => deleteFoods(data.id_food, data.name_thai)}>ลบ</button>

                                    </div>

                                </div>

                                <hr />
                            </div>
                        )
                    })}
                </div>



            </div>

        </div>
    )
}

export default Menu
