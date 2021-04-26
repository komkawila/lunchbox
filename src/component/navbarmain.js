import './css/navbarmain.css';
import { BrowserRouter, Route, Link, Router, Redirect } from 'react-router-dom';

import React, { useState } from 'react';
function Navbars(props) {
    return (
        <div>
            <div className="nav-bars" >
                <nav>
                    <ul >
                        <Link to="/home"><li><h1 >Lunchbox</h1></li></Link>
                        <Link to={{
                            pathname: "/menu",
                            search: "?userid=" + props.userid,
                            state: { fromDashboard: true }
                        }}><li>Menu</li></Link>
                        <Link to="nutrition"><li >Nutrition</li></Link>
                    </ul>
                </nav>
                <form>
                    <input className="form-control" type="text" placeholder="Search" />
                    <button type="submit" >Search</button>
                </form>
            </div>
        </div>
    );
}

export default Navbars;