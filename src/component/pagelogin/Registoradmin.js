import React from 'react'
import '../css/registor-admin.css'
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';
function Registoradmin() {
    const history = useHistory();
    const cancelRgt = () => {
        console.log("CC")
        history.push("/registor")

    }
    const saveRtg = () => {
        console.log("SS")
    }
    return (
        <div className="container-login">
            <div className="box registor-admin">
                <h1> สมัครสมาชิกสถาบัน <br />วิจัยวิทยาศาสตร์และเทคโนโลยี</h1>
                <div className="rgt-hr"></div>
                <div className="rgt-am-data">
                    <div className="rgt-am-1">
                        <p> ชื่อ</p>
                        <input class="input" type="text" placeholder="ชื่อ"></input>
                        <p> นามสกุล</p>
                        <input class="input" type="text" placeholder="นามสกุล"></input>
                        <p> โทรศัพท์มือถือ</p>
                        <input class="input" type="number" placeholder="โทรสัพท์มือถือ" onWheelCapture={e => { e.target.blur() }}></input>
                        <p> เพศ</p>
                        <div className="select ip-rgt">
                            <select className="ip-rgt">
                                <option>ชาย</option>
                                <option>หญิง</option>
                                <option>อื่นๆ</option>
                            </select>
                        </div>
                        <p> ที่อยู่</p>
                        <input class="input" type="text" placeholder="ที่อยู่"></input>
                        <p> อีเมลล์</p>
                        <input class="input" type="email" placeholder="อีเมลล์"></input>
                        <p> รหัสผ่าน</p>
                        <input class="input" type="password" placeholder="รหัสผ่าน"></input>
                        <p> ยืนยันรหัสผ่าน</p>
                        <input class="input" type="password" placeholder="ยืนยันรหัสผ่าน"></input>
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
