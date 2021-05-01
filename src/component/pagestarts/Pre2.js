import '../css/pre.css';

import img1 from '../../img/login/PrePage/2.jpg';
import text1 from '../../img/login/PrePage/text_2.png'; 
import text2 from '../../img/login/PrePage/text_2_1.png'; 
import {Nav,BrowserRouter,Route,Link,Router,Redirect,useHistory} from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import React, { useState, useEffect } from 'react';

function Pre2() {
  const history = useHistory();

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [user, setUser] = useState([]);

  useEffect(() => {
      if (user != null) {
          if (user.length != 0) {
              console.log("Login Success");
              console.log("user = ");
              console.log(user);
              console.log(user);
              history.push("/home")
          }
      } else {
          console.log("user = null");
          // history.push("/login")
      }
  }, [user]);

  useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
          setIsSignedIn(!!user);
          setUser(firebase.auth().currentUser);
      });
      return () => unregisterAuthObserver();
  }, []);
  return (
    <div className="App1">
      <div className="Body1">
        <img src={img1} alt="Logo"/>
      </div>
      <div className="text1">
        <img src={text1} alt="Logo"/>
        <br></br>
        <img src={text2} alt="Logo"/>
        
      </div>

      <br></br>
      <div className="text2">

      <Link class="btn btn-outline-primary btn-lg" to="/login" role="button">ข้าม</Link>
      {/* <button className="btn btn-outline-primary btn-lg" type="submit">ข้าม</button> */}
      <Link class="dotGray" to="/pre1" role="button"></Link>
      {/* <span className="dotBlue"></span> */}
      
      <Link class="dotBlue" to="/pre2" role="button"></Link>
      {/* <span className="dotGray"></span> */}

      <Link class="dotGray" to="/pre3" role="button"></Link>
      {/* <span className="dotGray"></span> */}
      <Link class="btn btn-outline-primary btn-lg" to="/pre3" role="button">ถัดไป</Link>
      {/* <button className="btn btn-primary btn-lg" type="submit">ถัดไป</button> */}
      
      </div>
    </div>
  );
}

export default Pre2;
