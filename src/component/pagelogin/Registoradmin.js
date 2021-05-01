
import '../css/registor-admin.css'
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import firebase from 'firebase';
import axios from 'axios';
import { api } from '../urlapi';
import Swal from 'sweetalert2'

function Registoradmin() {
    const history = useHistory();

    const [nameA, setnameA] = useState("aaaaaa");
    const [uid, setUID] = useState("");
    const [emailA, setemailA] = useState("eeeeee");

    const [phoneNumberA, setphoneNumberA] = useState("");
    const [sexA, setsexA] = useState("");
    const [addressA, setaddressA] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const [user, setUser] = useState([]);

    useEffect(() => {
        if (user != null) {
            if (user.length != 0) {
                console.log("Login Success");
                console.log("user = ");
                console.log(user);
                setnameA(user.providerData[0].displayName);
                setemailA(user.providerData[0].email);
                setUID(user.uid);

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
        history.push("/registor")

    }
    const saveRtg = () => {
        console.log("SS")
        console.log("nameA = " + nameA)
        console.log("phoneNumberA = " + phoneNumberA)
        console.log("sexA = " + sexA)
        console.log("addressA = " + addressA)
        console.log("emailA = " + emailA)
        // const swalWithBootstrapButtons = Swal.mixin({
        //     customClass: {
        //         confirmButton: 'btn btn-success',
        //         cancelButton: 'btn btn-danger'
        //     },
        //     buttonsStyling: false
        // })
        if (phoneNumberA == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกเบอร์โทรศัพท์',
                showConfirmButton: true,
            });
        } else if (sexA == "" || sexA == "เพศ") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณาระบุเพศ',
                showConfirmButton: true,
            });
        } else if (addressA == "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'กรุณากรอกที่อยู่',
                showConfirmButton: true,
            });
        }else{
            axios.post(api + "regisadmin", {
            uid: uid,
            email: emailA,
            name: nameA,
            phonenumber: phoneNumberA,
            status: 2,
            address: addressA,
            gender: sexA,

        }).then((res) => {
            console.log("res = ");
            console.log(res);
            if (res.data.affectedRows == 1) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'สมัครสมาชิกสำเร็จ',
                    // showConfirmButton: true,
                    timer: 2000
                }).then((err) => {
                    history.push("/home");
                });
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'สมัครสมาชิกไม่สำเร็จ',
                    showConfirmButton: true,
                });
            }
        });
        }
        
    }

    return (
        <div className="container-login">
            <div className="box registor-admin">
                <h1> สมัครสมาชิกสถาบัน <br />วิจัยวิทยาศาสตร์และเทคโนโลยี</h1>
                <div className="rgt-hr"></div>
                <div className="rgt-am-data">
                    <div className="rgt-am-1">
                        <p> ชื่อ - นามสกุล</p>
                        <input class="input" type="text" value={nameA} disabled></input>
                        <p> โทรศัพท์มือถือ</p>
                        <input class="input" type="number" placeholder="โทรสัพท์มือถือ" onWheelCapture={e => { e.target.blur() }} value={phoneNumberA} onChange={e => { setphoneNumberA(e.target.value) }}></input>
                        <p> เพศ</p>
                        <div className="select ip-rgt">
                            <select className="ip-rgt" value={sexA} onChange={e => { setsexA(e.target.value) }}>
                                <option selected>เพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>
                        </div>
                        <p> ที่อยู่</p>
                        <input class="input" type="text" placeholder="ที่อยู่" value={addressA} onChange={e => { setaddressA(e.target.value) }}></input>
                        <p> อีเมลล์</p>
                        <input class="input" type="email" value={emailA} disabled></input>
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

export default Registoradmin
