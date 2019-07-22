import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../action/auth';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPopup from "../auth/PopupLogin";
import RegisterPopup from "../auth/RegisterPopup";
import Profile from '../auth/PopupProfile';
import Notfound from '../notfound/index'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: true,
        };
        this.onClick = this.onClick.bind(this);
      }
      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }

      handleLogout = ()=> {
          this.props.logout();
      }
    render() {
      const {isAuthenticated} = this.props.auth;
      const navbarForAnonymous = (
          <MDBNavbarNav right>
          <MDBNavItem>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </MDBNavItem>
        </MDBNavbarNav>
      )

      const navbarForLoggedInUser = (
        <MDBNavbarNav right>
        <MDBNavItem>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </MDBNavItem>
        <MDBNavItem>
          <Link className="nav-link" to="/login"  onClick = {this.handleLogout} >
            Logout
          </Link>
        </MDBNavItem>
      </MDBNavbarNav>
      );
        return (
          <div>
            <header>
              <BrowserRouter>
                <MDBNavbar
                  color="bg-primary"
                  fixed="top"
                  dark
                  expand="md"
                  scrolling
                  transparent
                >
                  <MDBNavbarBrand>
                    <Link to="/" className="white-text">Home</Link>
                  </MDBNavbarBrand>
                  <MDBCollapse isOpen={this.state.collapse} navbar>
                  {isAuthenticated ? navbarForLoggedInUser : navbarForAnonymous}
                  </MDBCollapse>
                </MDBNavbar>

                <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(40).jpg">
                  <MDBMask
                    overlay="purple-light"
                    className="flex-center flex-column text-white text-center"
                  >
                    {/* <h2>This Navbar is fixed</h2>
                    <h5>
                      It will always stay visible on the top, even when
                      you scroll down
                    </h5>
                    <p>
                      Navbar's background will switch from transparent
                      to solid color while scrolling down
                    </p>
                    <br />
                    <p>
                      Full page intro with background image will be
                      always displayed in full screen mode, regardless
                      of device{" "}
                    </p> */}
                    <Switch>
                      <Route path="/register" component={RegisterPopup} />
                      <Route path="/Login" component={LoginPopup} />
                      <Route path="/profile" component={isAuthenticated ? Profile : Notfound}
                      />
                    </Switch>
                  </MDBMask>
                </MDBView>
              </BrowserRouter>
            </header>
            <main>
              <MDBContainer className="text-center my-5">
                <p align="justify">
                </p>
              </MDBContainer>
            </main>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    auth : state.auth
  }
}
export default connect(mapStateToProps,{logout})(Header);