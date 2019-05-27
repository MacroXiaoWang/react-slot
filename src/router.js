import React, {Component} from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import Loadable from 'react-loadable';
import About from "./component/About";
import Home from "./component/Home";
import ContactUs from "./component/ContactUs"
import RouterStore from "./store/RouterStore"
import ReactLoading from 'react-loading';
function Loading(props) {
    if (props.isLoading) {
        if (props.timedOut) {
            return <div>Loader timed out!</div>;
        } else if (props.pastDelay) {
            return <ReactLoading/>;
        } else {
            return null;
        }
    } else if (props.error) {
        return <div>Error! Component failed to load</div>;
    } else {
        return null;
    }
}
const HomeComponent = Loadable({
    loader: () => import('./component/Home'),
    loading: Loading,
});

@withRouter
class RouterCom extends Component {
    componentDidMount() {
      /*  window.onpopstate = () => {
            const arr = this.props.history.location.pathname.split("/");
            RouterStore.onOpenChange(["/" + arr[1]]);
        }*/
    }
    componentDidUpdate() {
        RouterStore.setCurrentUrl([this.props.history.location.pathname]);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/home" component={HomeComponent}/>
                <Route path="/Group3/about" component={About}/>
                <Route path="/Group1/home" component={Home}/>
                <Route path="/Group2/SubItem/contactUs" component={ContactUs}/>
            </Switch>
        )
    }
}

export default RouterCom;