import React from 'react'
import '../css/registor.css'
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';
import logo from '../../img/login/logo1.png'

function Registor() {
    const history = useHistory();
    const clickStore = ()=>{
        console.log("store")
        history.push("/registor-store")
    }
    const clickAdmin = ()=>{
        console.log("admin")
        history.push("/registor-admin")
    }
    return (
        <div className="container-login">
            <div className="box registor">
            <div className="registor-type">
                <img src={logo} />
                <p>กรูณาเลือกสมัครสมาชิก</p>
                <i class="fas fa-arrow-alt-circle-down iconrg"></i>
                <button className="button is-primary is-focused btn-rg" onClick={()=>{clickStore()}}>สำหรับร้านค้า</button>

                <div style={{ display: "flex" ,color:"white"}}>
                    <hr style={{ width: "100%", backgroundColor: "white", height: "2px", marginTop: "10px" }} />
                    <h1>or</h1>
                    <hr style={{ width: "100%", backgroundColor: "white", height: "2px", marginTop: "10px" }} />
                </div>

                <button className="button is-success is-focused btn-rg" onClick={()=>{clickAdmin()}}>สมัครสมาชิกสถาบัน วิจัยวิทยาศาสตร์และเทคโนโลยี</button>

            </div>
            <button className="button is-danger is-focused btn-rg" onClick={()=>{history.push("/login")}}>ยกเลิก</button>

            </div>
        </div>
        
    )
}

export default Registor
