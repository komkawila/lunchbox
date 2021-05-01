import './css/manegefood.css';
import { BrowserRouter, Route, Link, Router, Redirect, useHistory } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Navbarmain from './navbarmain';
import axios from 'axios';
import coin from '../img/coin.png'
import noimmage from '../img/noimmage.png'
import { api } from './urlapi';

import Swal from 'sweetalert2'
function Manegefood() {
    let history = useHistory();
    var str = "";
    str = history.location.search;
    // str = history.location.search;
    var userID = str.substr(str.indexOf("userid") + 7, str.length);
    console.log("userID = " + userID);
    const [immage, setImmage] = useState(noimmage);


    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Not File Choose");
    const onSelectImages = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        console.log("files = ");
        console.log(e.target.files[0]);
        console.log("filesName = " + e.target.files[0].name);
    };

    const UploadImmage = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
            api + "upload/" + e,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }




    const [ingredientstype, setIngredientstype] = useState([]);
    const [count, setCount] = useState(0);

    const [objects, setObjects] = useState([]);

    const [type1, setType1] = useState([]);
    const [type2, setType2] = useState([]);
    const [type3, setType3] = useState([]);
    const [type4, setType4] = useState([]);
    const [type5, setType5] = useState([]);
    const [type6, setType6] = useState([]);
    const [type7, setType7] = useState([]);
    const [type8, setType8] = useState([]);
    const [type9, setType9] = useState([]);
    const [type10, setType10] = useState([]);
    const [type11, setType11] = useState([]);
    const [type12, setType12] = useState([]);
    const [type13, setType13] = useState([]);
    const [type14, setType14] = useState([]);
    const [type15, setType15] = useState([]);

    const [energy, setEnergy] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carb, setCarb] = useState(0);

    ///////////////////////new/////////////////
    const [foodname, setFoodname] = useState("");
    const [price, setPrice] = useState(Number);
    const [detail, setDetial] = useState("");
    ///////////////////////new/////////////////
    // var store_id = 2;
    const saveFunc = async () => {
        // await 
        await axios.post(api + "insertfood", {
            store_id: userID,
            name_thai: foodname,
            price: price,
            energy: energy,
            protein: protein,
            fat: fat,
            carbohydrate: carb,
            objects: objects,
            descrition: detail,
        }).then((res) => {
            console.log("###### SAVE ######");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บัททึกสำเร็จ',
                showConfirmButton: true,
            });

            UploadImmage(res.data);
            console.log(objects);
            console.log(detail);
            console.log(energy);
            console.log(protein);
            console.log(fat);
            console.log(carb);
            console.log(foodname);
            console.log(price);
            history.push("/menu");
        })



    }
    var ob = [];
    const [objects2, setObjects2] = useState([]);


    useEffect(() => {
        axios.get(api + "gettypeingredients/1").then((res) => {
            setType1(res.data);
        });

        axios.get(api + "gettypeingredients/2").then((res) => {
            setType2(res.data);
        });

        axios.get(api + "gettypeingredients/3").then((res) => {
            setType3(res.data);
        });

        axios.get(api + "gettypeingredients/4").then((res) => {
            setType4(res.data);
        });

        axios.get(api + "gettypeingredients/5").then((res) => {
            setType5(res.data);
        });

        axios.get(api + "gettypeingredients/6").then((res) => {
            setType6(res.data);
        });

        axios.get(api + "gettypeingredients/7").then((res) => {
            setType7(res.data);
        });

        axios.get(api + "gettypeingredients/8").then((res) => {
            setType8(res.data);
        });

        axios.get(api + "gettypeingredients/9").then((res) => {
            setType9(res.data);
        });

        axios.get(api + "gettypeingredients/10").then((res) => {
            setType10(res.data);
        });

        axios.get(api + "gettypeingredients/11").then((res) => {
            setType11(res.data);
        });

        axios.get(api + "gettypeingredients/12").then((res) => {
            setType12(res.data);
        });

        axios.get(api + "gettypeingredients/13").then((res) => {
            setType13(res.data);
        });

        axios.get(api + "gettypeingredients/14").then((res) => {
            setType14(res.data);
        });

        axios.get(api + "gettypeingredients/15").then((res) => {
            setType15(res.data);
        });
    }, []);


    const insertdata = () => {
        setCount(count + 1);
        setObjects(
            [...objects, {
                indexs: count,
                types: "",
                ingredient: "",
                units: "",
                unitperunit: 0,
                energy: 0,
                protein: 0,
                fat: 0,
                carbohydrate: 0
                // ,
                // name_thai: "",
                // uintsany: "" 
            }
            ]
        )
    }

    useEffect(() => {
        axios.get(api + "gettype").then((res) => {
            setIngredientstype(res.data);
        })
        console.log(ingredientstype);
    }, []);

    const deleteIngredient = (data) => {
        setObjects(
            objects.filter((val) => {
                return val.indexs != data;
            })
        );
    }

    const typeIn = (data1, data) => {
        setObjects(
            objects.map((results) => {
                return results.indexs == data.indexs
                    ? {
                        indexs: results.indexs,
                        types: data1.target.value,
                        ingredient: results.ingredient,
                        units: results.units,
                        unitperunit: results.unitperunit,
                        energy: results.energy,
                        protein: results.protein,
                        fat: results.fat,
                        carbohydrate: results.carbohydrate
                    } : results;
            })
        )
    }

    const ingredientsFunc = (data1, data) => {
        console.log(data1);
        setObjects(
            objects.map((results) => {
                return results.indexs == data.indexs
                    ? {
                        indexs: results.indexs,
                        types: results.types,
                        ingredient: data1.target.value,
                        units: results.units,
                        unitperunit: results.unitperunit,
                        energy: results.energy,
                        protein: results.protein,
                        fat: results.fat,
                        carbohydrate: results.carbohydrate
                    } : results;
            })
        )
    }

    const setvalueunits = (resultinput, data) => {
        console.log("func " + resultinput.target.value)
        setObjects(
            objects.map((results) => {
                console.log("data.index");
                console.log(data.indexs);
                console.log("results.index");
                console.log(results.indexs);
                return results.indexs == data.indexs
                    ? {
                        indexs: data.indexs,
                        types: results.types,
                        ingredient: results.ingredient,
                        units: resultinput.target.value,
                        unitperunit: results.unitperunit,
                        energy: results.energy,
                        protein: results.protein,
                        fat: results.fat,
                        carbohydrate: results.carbohydrate
                    } : results
            })
        )
    }

    function rendertag(typedata) {
        let tagtype = "";
        if (typedata.types == "1") {
            return (
                type1.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "2") {
            return (
                type2.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "3") {
            return (
                type3.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "4") {
            return (
                type4.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "5") {
            return (
                type5.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "6") {
            return (
                type6.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "7") {
            return (
                type7.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "8") {
            return (
                type8.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "9") {
            return (
                type9.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "10") {
            return (
                type10.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "11") {
            return (
                type11.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "12") {
            return (
                type12.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "13") {
            return (
                type13.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "14") {
            return (
                type14.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        } else if (typedata.types == "15") {
            return (
                type15.map((data, key) => {
                    return (
                        <option key={data.id_ingredient} value={data.id_ingredient}>{data.name_thai}</option>
                    )
                })
            )
        }
    }



    useEffect(() => {

        // const [energy, setEnergy] = useState(0);
        // const [protein, setProtein] = useState(0);
        // const [fat, setFat] = useState(0);
        // const [carb, setCarb] = useState(0);
        console.log("Calculator Success !!");
        console.log(objects);

        /*
        {
    "indexs": 0,
    "types": "1",
    "ingredient": "2489",
    "units": "500",
    "unitperunit": "100",
    "energy": 48.92,
    "protein": 56.10199999999999,
    "fat": 29.212500000000002,
    "carbohydrate": 0.3925
}
        */

        let sumEnergy = 0;
        let sumProtein = 0;
        let sumFat = 0;
        let sumCarb = 0;
        objects.map((result, key) => {
            // setEnergy(energy + result.energy);
            // setProtein(protein + result.protein);
            // setFat(fat + result.fat);
            // setCarb(carb + result.carbohydrate);

            console.log(result.energy);
            sumEnergy = sumEnergy + result.energy;
            sumProtein = sumProtein + result.protein;
            sumFat = sumFat + result.fat;
            sumCarb = sumCarb + result.carbohydrate;
        })
        setEnergy(sumEnergy);
        setProtein(sumProtein);
        setFat(sumFat);
        setCarb(sumCarb);

    }, [objects]);
    function calculator() {
        calculator2();

    }
    function calculator2() {
        ob = [];
        objects.map((typedata, key) => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!! " + typedata.ingredient);
            let datatypes = [];
            if (typedata.types == "1") {
                datatypes = type1.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }
                // console.log("!!!!!!!!!!!!!!!! => 1");
                // console.log("kcalin = " + kcalins);
                // console.log("proteins = " + proteinss);
                // console.log("fat = " + fats);
                // console.log("carbohydrates = " + carbohydratess);

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
                // ob = [...ob, {
                //     indexs: typedata.indexs,
                //     types: typedata.types,
                //     ingredient: typedata.ingredient,
                //     units: typedata.units,
                //     unitperunit: datatypes[0].unit,
                //     energy: kcalins + typedata.energy,
                //     protein: proteinss + typedata.protein,
                //     fat: fats + typedata.fat,
                //     carbohydrate: carbohydratess + typedata.carbohydrate
                // }
                // ]

            } else if (typedata.types == "2") {
                datatypes = type2.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "3") {
                datatypes = type3.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "4") {
                datatypes = type4.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "5") {
                datatypes = type5.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "6") {
                datatypes = type6.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "7") {
                datatypes = type7.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "8") {
                datatypes = type8.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "9") {
                datatypes = type9.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "10") {
                datatypes = type10.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "11") {
                datatypes = type11.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }
                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "12") {
                datatypes = type12.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "13") {
                datatypes = type13.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "14") {
                datatypes = type14.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            } else if (typedata.types == "15") {
                datatypes = type15.filter((result) => {
                    return result.id_ingredient == typedata.ingredient;
                });

                var kcalins = ((typedata.units / datatypes[0].unit) * datatypes[0].energy) / 1000;
                var proteinss = ((typedata.units / datatypes[0].unit) * datatypes[0].protein) / 100;
                var fats = ((typedata.units / datatypes[0].unit) * datatypes[0].fat) / 100;
                var carbohydratess = ((typedata.units / datatypes[0].unit) * datatypes[0].carbohydrate) / 100;

                if (carbohydratess < 0) {
                    carbohydratess = carbohydratess * (-1);
                }

                ob = [...ob, {
                    indexs: typedata.indexs,
                    types: typedata.types,
                    ingredient: typedata.ingredient,
                    units: typedata.units,
                    unitperunit: datatypes[0].unit,
                    energy: kcalins,
                    protein: proteinss,
                    fat: fats,
                    carbohydrate: carbohydratess
                }
                ]
            }
        })
        setObjects(ob);


    }

    return (
        <div>
            <Navbarmain />
            <div className="body-foods">
                <div className="item-foods">
                    <div className="detial-foods">
                        <div className="title-foods">
                            <div className="title-food-imgs">
                                <img for="upload" src={immage} ></img>
                                <div className="choose-file">
                                    <input type="file" hidden id="upload" onChange={onSelectImages} />
                                    <label for="upload">Choose file</label>
                                    <div>{filename}</div>
                                </div>

                            </div>
                            <div className="title-food-items">
                                <div className="title-food-item-head">
                                    <p> สร้าง / แก้ไขสูตรอาหาร </p>
                                </div>
                                <hr />
                                <div className="title-food-item-coin">
                                    <span>
                                        <h1>Food name </h1>
                                        <input className="form-control" value={foodname}
                                            onChange={(event) => { setFoodname(event.target.value) }} />
                                    </span>
                                    <span >
                                        <img src={coin} />
                                        <input className="form-control" type="number"
                                            onWheelCapture={e => { e.target.blur() }}
                                            appearance="none"
                                            value={price}
                                            onChange={(event) => { setPrice(event.target.value) }} />
                                    </span>
                                </div>
                                <div className="btn-save">
                                    <button onClick={calculator}>คำนวณ</button>
                                    <button onClick={saveFunc}>บันทึก</button>
                                </div>
                            </div>
                        </div>

                        <hr></hr>
                        <div className="cal-foods">
                            <span>
                                <p>Energy</p>
                                <h1>{energy.toFixed(2)}</h1>
                                <p>kcal</p>
                            </span>
                            <span>
                                <p>Protein</p>
                                <h1>{protein.toFixed(2)}</h1>
                                <p>g/100g</p>
                            </span>
                            <span>
                                <p>Fat</p>
                                <h1>{fat.toFixed(2)}</h1>
                                <p>g/100g</p>
                            </span>
                            <span>
                                <p>Carb</p>
                                <h1>{carb.toFixed(2)}</h1>
                                <p>g/100g</p>
                            </span>
                        </div>
                        <hr></hr>
                        <div className="material-foods">
                            <span>
                                <h6>วัตถุดิบ</h6>
                                <h2 style={{ width: "30%" }}>asd</h2>
                                <h2 style={{ width: "30%" }}>asd</h2>
                                <h2 style={{ width: "15%" }}>asd</h2>
                                <h2 style={{ width: "15%" }}>asd</h2>
                                <button type="submit" onClick={() => { insertdata() }} >+</button>
                            </span>

                            {objects.map((objectsData, key) => {
                                return (
                                    <div >
                                        <p >{key + 1}</p>
                                        <select className="form-select" value={objectsData.types} onChange={(data1) => { typeIn(data1, objectsData) }}>
                                            <option value="" selected disabled hidden>ประเภทวัตถุดิบ</option>
                                            {ingredientstype.map((data, key) => {
                                                return (
                                                    <option key={key} value={data.type_id}>{data.type}</option>
                                                )
                                            })}
                                        </select>


                                        <select className="form-select" value={objectsData.ingredient} onChange={(data1) => { ingredientsFunc(data1, objectsData) }}>
                                            <option key={key} value="" selected disabled hidden>วัตถุดิบ</option>
                                            {rendertag(objectsData)}
                                        </select>

                                        <input className="form-control" type="number"
                                            onWheelCapture={e => { e.target.blur() }}
                                            value={objectsData.units}
                                            onChange={(resultinput) => { setvalueunits(resultinput, objectsData) }}
                                        />
                                        <input className="form-control" type="number"
                                            onWheelCapture={e => { e.target.blur() }}
                                            value={objectsData.units}
                                            onChange={(resultinput) => { setvalueunits(resultinput, objectsData) }}
                                        />
                                        <button type="submit" onClick={() => { deleteIngredient(objectsData.indexs) }}>-</button>
                                    </div>
                                )
                            })
                            }
                        </div>
                        {/* <button onClick={() => {
                            // setObjects2(objects);
                            console.log(objects);
                            // console.log(ob);
                            // console.log(objects2);
                        }
                        }>Views</button>
                        <button onClick={() => {

                            console.log(objects);
                            console.log(detail);
                            console.log(energy);
                            console.log(protein);
                            console.log(fat);
                            console.log(carb);
                            console.log(foodname);
                            console.log(price);
                        }
                        }>Saves</button>
                        <hr></hr> */}

                        <div className="sol-foods">
                            <h6>รายละเอียด</h6>
                            <textarea className="form-control" value={detail}
                                onChange={(event) => { setDetial(event.target.value) }}></textarea>
                        </div>
                        <hr></hr>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Manegefood;