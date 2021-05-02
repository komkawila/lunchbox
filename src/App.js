
import {Route} from 'react-router-dom';
import Home from './component/home';
import Foods from './component/foods';
import navbarmain from './component/navbarmain';
import Menu from './component/menu'
import Menagefood from './component/managefood'
import './component/css/app.css'
import Nutrition from './component/nutrition'
import Insertutrition from './component/insertnutrition'
import Getfood from './component/getfood';
import Main from './component/pagestarts/main'
import Pre1 from './component/pagestarts/Pre1'
import Pre2 from './component/pagestarts/Pre2'
import Pre3 from './component/pagestarts/Pre3'
import Login from './component/pagelogin/Login';
import Registor from './component/pagelogin/Registor';
import Registorstore from './component/pagelogin/Registorstore';
import Registoradmin from './component/pagelogin/Registoradmin';
import ProfileStore from './component/profile/ProfileStore';
import ProfileAdmins from './component/profile/ProfileAdmin';
import MenuStore from './component/menustore';
import Sticker from './component/Sticker';
import Igredients from './component/ingredients';
function App() {
    return (
        <div >
            <div>
                <Route exact path="/" component={Main}></Route>
                <Route exact path="/pre1" component={Pre1}></Route>
                <Route exact path="/pre2" component={Pre2}></Route>
                <Route exact path="/pre3" component={Pre3}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/registor" component={Registor}></Route>
                <Route exact path="/registor-store" component={Registorstore}></Route>
                <Route exact path="/registor-admin" component={Registoradmin}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/foods" component={Foods}></Route>
                <Route exact path="/menu" component={Menu}></Route>
                <Route exact path="/menu-store" component={MenuStore}></Route>
                <Route exact path="/menagefood" component={Menagefood}></Route>
                <Route exact path="/nutrition" component={Nutrition}></Route>
                <Route exact path="/insert-nutrition" component={Insertutrition}></Route>
                <Route exact path="/getfood" component={Getfood}></Route>
                <Route exact path="/profile-store" component={ProfileStore}></Route>
                <Route exact path="/profile-admin" component={ProfileAdmins}></Route>
                <Route exact path="/sticker" component={Sticker}></Route>
                <Route exact path="/ingredients" component={Igredients}></Route>

            </div>
        </div>
    );
}

export default App;
