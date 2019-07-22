import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import Login from "./components/auth/PopupLogin";
import Register from "./components/auth/Register";
import RegisterPopup from "./components/auth/RegisterPopup";
import Profile from './components/auth/Profile';
import {setUserCurrent,logout} from './action/auth';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';
import Notfound from './components/notfound/index'
import getFingerPrint from  './helpers/getFingerprint'
import setHeaders from "./helpers/setHeader";
class App extends Component {
  
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) return
    const decoded = jwtDecode(token)
    this.props.setUserCurrent(decoded)
    getFingerPrint(fingerPrint => {
      console.log(123123123)
      setHeaders(token,fingerPrint)
    })
    if( (Date.now) / 1000 > decoded.exp) {
        this.props.logout();
    }
  }
  render() {
    return ( 
      <div className="App">      
        <Header />                
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth : state.auth
  }
}
export default connect(mapStateToProps, {setUserCurrent,logout})(App);
