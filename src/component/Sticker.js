
import '../component/css/sticker.css'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const le = [
    1, // 1
    2, // 2
    3, // 3
    2, // 4
    3, // 5
    2, // 6
    3, // 7
    2, // 8
    3, // 9
    2, // 10
    3, // 11
    2, // 12
    3, // 13
    2, // 14
    3, // 15
    2, // 16
    3, // 17
    1, // 18
    2, // 19
    3, // 20
    4 // 21
];

var obb = [];

function Sticker() {
    let history = useHistory();

    const [his, setHis] = useState(false);
    const [kcal, setKcal] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carb, setCarb] = useState(0);

    const [readystate, setReadystate] = useState(false);
    useEffect(() => {
        // console.log("history = ");
        var str = history.location.search;
        // console.log("str = " + str);
        setKcal(str.substring(str.indexOf("kcal") + 5, str.indexOf("&", str.indexOf("kcal"))));
        setProtein(str.substring(str.indexOf("prot") + 5, str.indexOf("&", str.indexOf("prot"))));
        setFat(str.substring(str.indexOf("fat") + 4, str.indexOf("&", str.indexOf("fat"))));
        setCarb(str.substring(str.indexOf("carb") + 5, str.length));
        setHis(true);
    }, []);

    useEffect(() => {
        // console.log("kcal = " + kcal);
        // console.log("protein = " + protein);
        // console.log("fat = " + fat);
        // console.log("carb = " + carb);
        if (his == true) {
            obb = [];
            for (var i = 0; i < 21; i++) {
                obb.push({
                    kcal: kcal,
                    protein: protein,
                    fat: fat,
                    carb: carb,
                });
            }
            setReadystate(true);

            // window.print()
        }
    }, [his]);

    useEffect(() => {
        if (readystate == true) {
            // console.log("data = ");
            // console.log(obb);
            window.print();
        }
    }, [readystate]);
    function printdata() {
        console.log("1111");
    }


    return (
        <div className="sticker-kal">
            {(readystate) ? obb.map((data) => {
                return (
                    <div className="content-sticker" >
                        <div>{data.kcal} kal</div>
                        <span className="kal-stk" >
                            <span>
                                <p>Protein</p>
                                <p style={{ color: "rgb(25, 151, 173)", fontSize: "24px" }}>{data.protein}</p>
                                <p style={{ color: "rgb(25, 151, 173)" }}>g/100g</p>
                            </span>
                            <span>
                                <p>Fat</p>
                                <p style={{ color: "rgb(25, 151, 173)", fontSize: "24px" }}>{data.fat}</p>
                                <p style={{ color: "rgb(25, 151, 173)" }}>g/100g</p>
                            </span>
                            <span>
                                <p>Carb</p>
                                <p style={{ color: "rgb(25, 151, 173)", fontSize: "24px" }}>{data.carb}</p>
                                <p style={{ color: "rgb(25, 151, 173)" }}>g/100g</p>
                            </span>
                        </span>
                    </div>
                )
            }) : null}
        </div>
    )
}

export default Sticker