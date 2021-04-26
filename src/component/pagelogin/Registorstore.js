import React from 'react'
import '../css/registor-store.css'
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';
function Registorstore() {
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
            <div className="box registor-store">
                <h1> สำหรับร้านค้า</h1>
                <div className="rgt-hr"></div>
                <div className="rgt-data">
                    <div className="rgt-1">
                        <p> ชื่อ</p>
                        <input class="input ip-rgt" type="text" placeholder="ชื่อ"></input>
                        <p> นามสกุล</p>
                        <input class="input ip-rgt" type="text" placeholder="นามสกุล"></input>
                        <p> โทรศัพท์มือถือ</p>
                        <input class="input ip-rgt" type="number" placeholder="โทรสัพท์มือถือ" onWheelCapture={e => { e.target.blur() }}></input>
                        <p> เพศ</p>
                        <div className="select ip-rgt">
                            <select className="ip-rgt">
                                <option>ชาย</option>
                                <option>หญิง</option>
                                <option>อื่นๆ</option>
                            </select>
                        </div>

                        <p> ที่อยู่</p>
                        <input class="input ip-rgt" type="text" placeholder="ที่อยู่"></input>
                        <p> ชื่อร้านอาหาร</p>
                        <input class="input ip-rgt" type="text" placeholder="ชื่อร้านอาหาร"></input>
                    </div>
                    <div className="rgt-2">

                        <p> ประเภทของสถานประกอบการณ์ด้านอาหาร</p>
                        <input class="input ip-rgt" type="text" placeholder="ประเภทของสถานประกอบการณ์ด้านอาหาร"></input>
                        <p> อาหารที่จำหน่าย</p>
                        <input class="input ip-rgt" type="text" placeholder="อาหารที่จำหน่าย"></input>
                        <p> ที่อยู่ของร้าน</p>
                        <input class="input ip-rgt" type="text" placeholder="ที่อยู่ของร้าน"></input>
                        <p> อีเมลล์</p>
                        <input class="input ip-rgt" type="email" placeholder="อีเมลล์"></input>
                        <p> รหัสผ่าน</p>
                        <input class="input ip-rgt" type="password" placeholder="รหัสผ่าน"></input>
                        <p> ยืนยันรหัสผ่าน</p>
                        <input class="input ip-rgt" type="password" placeholder="ยืนยันรหัสผ่าน"></input>
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

export default Registorstore
