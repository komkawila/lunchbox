
import '../css/registor-store.css'
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React, { useState, useEffect } from 'react'
import firebase from 'firebase';
import axios from 'axios';
import { api } from '../urlapi';

import Swal from 'sweetalert2'

// const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false
// })
function ProfileStore() {
    const [nameS, setnameS] = useState("");
    const [phoneNumberS, setphoneNumberS] = useState("");
    const [sexS, setsexS] = useState("");
    const [addressS, setaddressS] = useState("");
    const [nameStoeS, setnameStoeS] = useState("");
    const [typeFoodS, settypeFoodS] = useState("");
    const [foodSellS, setfoodSellS] = useState("");
    const [addressStoreS, setaddressStoreS] = useState("");
    const [emailS, setemailS] = useState("");
    const [uid, setUID] = useState("");

    const history = useHistory();

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                console.log("Login Success");
                console.log("user = ");
                console.log(user);
                setnameS(user.providerData[0].displayName);
                setemailS(user.providerData[0].email);
                setUID(user.uid);
                axios.get(api+"login/"+user.uid).then((res) => {
                        console.log(res.data[0]);
                        setphoneNumberS(res.data[0].phonenumber);
                        setsexS(res.data[0].gender);
                        setaddressS(res.data[0].address);
                        setnameStoeS(res.data[0].namestore);
                        settypeFoodS(res.data[0].typeStore);
                        setfoodSellS(res.data[0].food);
                        setaddressStoreS(res.data[0].addressStore);
                });
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

    const cancelRgt = () => {
        console.log("CC")
        history.push("/home")

    }


    const saveRtg = () => {


        console.log("*********************************")
        console.log("nameS = " + nameS)
        console.log("phoneNumberS = " + phoneNumberS)
        console.log("addressS = " + addressS)
        console.log("nameStoeS = " + nameStoeS)
        console.log("typeFoodS = " + typeFoodS)
        console.log("foodSellS = " + foodSellS)
        console.log("addressStoreS = " + addressStoreS)
        console.log("emailS = " + emailS)
        console.log("addressStoreS = " + sexS)
        if (phoneNumberS == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกเบอร์โทรศัพท์',
                showConfirmButton: true,
            });
        } else if (sexS == "" || sexS == "เพศ") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณาระบุเพศ',
                showConfirmButton: true,
            });
        } else if (addressS == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกที่อยู่',
                showConfirmButton: true,
            });
        } else if (nameStoeS == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกชื่อร้านอาหาร',
                showConfirmButton: true,
            });
        } else if (typeFoodS == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกประเภทของสถานประกอบการณ์ด้านอาหาร',
                showConfirmButton: true,
            });
        } else if (foodSellS == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกอาหารที่จำหน่าย',
                showConfirmButton: true,
            });
        } else if (addressStoreS == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกที่อยู่ของร้าน',
                showConfirmButton: true,
            });
        } else {
            axios.post(api + "editstore", {
                uid: uid,
                phonenumber: phoneNumberS,
                namestore: nameStoeS,
                address: addressS,
                food: foodSellS,
                gender: sexS,
                addressStore: addressStoreS,
                typeStore: typeFoodS,
            }).then((res) => {
                console.log("res = ");
                console.log(res);
                if (res.data.affectedRows == 1) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'แก้ไขข้อมูลสำเร็จ',
                        // showConfirmButton: true,
                        timer: 2000
                    }).then((err) => {
                        history.push("/home");
                    });
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'แก้ไขข้อมูลไม่สำเร็จ',
                        showConfirmButton: true,
                    });
                }
            });

        }

    }

    return (
        <div className="container-login">
            <div className="box registor-store">
                <h1> แก้ไขข้อมูลสำหรับร้านค้า</h1>
                <div className="rgt-hr"></div>
                <div className="rgt-data">
                    <div className="rgt-1">
                        <p> ชื่อ - นามสกุล</p>
                        <input class="input ip-rgt" type="text" value={nameS} disabled></input>
                        <p> โทรศัพท์มือถือ</p>
                        <input class="input ip-rgt"
                            type="number"
                            placeholder="โทรสัพท์มือถือ"
                            value={phoneNumberS}
                            onChange={(e) => {
                                setphoneNumberS(e.target.value);
                            }}
                            onWheelCapture={e => { e.target.blur() }}></input>
                        <p> เพศ</p>
                        <div className="select ip-rgt">
                            <select className="ip-rgt" value={sexS} onChange={e => { setsexS(e.target.value) }}>
                                <option selected>เพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>

                        <p> ที่อยู่</p>
                        <input class="input ip-rgt" type="text" placeholder="ที่อยู่" value={addressS} onChange={e => { setaddressS(e.target.value) }}></input>
                        <p> ชื่อร้านอาหาร</p>
                        <input class="input ip-rgt" type="text" placeholder="ชื่อร้านอาหาร" value={nameStoeS} onChange={e => { setnameStoeS(e.target.value) }}></input>
                    </div>
                    <div className="rgt-2">
                        <p> ประเภทของสถานประกอบการณ์ด้านอาหาร</p>
                        <input class="input ip-rgt" type="text" placeholder="ประเภทของสถานประกอบการณ์ด้านอาหาร" value={typeFoodS} onChange={e => { settypeFoodS(e.target.value) }}></input>
                        <p> อาหารที่จำหน่าย</p>
                        <input class="input ip-rgt" type="text" placeholder="อาหารที่จำหน่าย" value={foodSellS} onChange={e => { setfoodSellS(e.target.value) }}></input>
                        <p> ที่อยู่ของร้าน</p>
                        <input class="input ip-rgt" type="text" placeholder="ที่อยู่ของร้าน" value={addressStoreS} onChange={e => { setaddressStoreS(e.target.value) }}></input>
                        <p> อีเมลล์</p>
                        <input class="input ip-rgt" type="email" value={emailS} disabled></input>

                    </div>

                </div>
                <div className="btn-rgt">
                    <button className="button is-success rgt-lg " style={{ marginRight: "10px" }} onClick={() => { saveRtg() }} >บันทึก</button>
                    <button className="button is-danger rgt-lg " style={{ marginLeft: "10px" }} onClick={() => { cancelRgt() }}>ยกเลิก</button>
                </div>

            </div>
        </div>

    )
}

export default ProfileStore
