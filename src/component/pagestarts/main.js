import '../css/main.css'
import {Nav,BrowserRouter,Route,Link,Router,Redirect,useHistory} from 'react-router-dom';
import page0 from '../../img/login/logo2.png'
function main() {
    return (
        <div className="App">
            <div className="Body">
                <img src={page0} alt="Logo"/>
                <div className="bt_start">
                    <Link className="btn btn-primary btn-lg" to="/pre1" role="button">Start</Link>
                </div>
            </div>
        </div>
    );
}

export default main;
