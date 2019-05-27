import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route}from "react-router-dom";
import {Provider} from "mobx-react";
import Login from "./component/Login/index"
import App from "./layout"
import registerServiceWorker from './registerServiceWorker';
import "./assets/css/global.css"
const Root = ()=>{
    return (
        <Provider>
            <BrowserRouter>
                <Switch>
                    <Route  exact path="/login" component={Login}/>
                    <Route  path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
