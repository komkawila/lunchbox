import '../css/pre.css';
import {BrowserRouter,Route,Link,Router,Redirect} from 'react-router-dom';

import img1 from '../../img/login/PrePage/3.png';
import text1 from '../../img/login/PrePage/text_3.png'; 
import text2 from '../../img/login/PrePage/text_3_1.png'; 

function Pre3() {
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
      
      <Link class="dotGray" to="/pre2" role="button"></Link>
      {/* <span className="dotGray"></span> */}

      <Link class="dotBlue" to="/pre3" role="button"></Link>
      {/* <span className="dotGray"></span> */}
      <Link class="btn btn-outline-primary btn-lg" to="login" role="button"> เริ่ม... </Link>
      {/* <button className="btn btn-primary btn-lg" type="submit">ถัดไป</button> */}
      
      </div>
    </div>
  );
}

export default Pre3;
