import React, { Component } from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import {login} from '../../action/auth';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn,
    MDBInput
  } from "mdbreact";

 class PopupLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          error: {}
        };
      }
      hangdleOnchange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      hangdleSumbit = e => {
        e.preventDefault();
        //fingerprint
        const { email, password } = this.state;
        this.props.login(this.state, this.props.history)
        ToastsStore.success("Hey, you just clicked!")
    } 
  render() {
    const {errors} = this.props
    return (
        <MDBContainer className ="p-3">
        <MDBRow>
          <MDBCol md="4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.hangdleSumbit}>
                  <div className="grey-text text-left">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      id="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.hangdleOnchange}
                      invalid={errors.errors ? true : false}
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      id="password"
                      validate
                      value={this.state.password}
                      onChange={this.hangdleOnchange}
                      invalid={this.state.error.password ? true : false}
                    />
                    <span className="text-danger">
                        {errors.errors ? errors.errors : ""}
                    </span>
                  </div>
  
                <div className="text-center mt-4">
                  <MDBBtn
                    color="light-blue"
                    className="mb-3"
                    type="submit"
                  >
                    Login
                  </MDBBtn>
                  <ToastsContainer store={ToastsStore}/>
                </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <a>Not a member? Sign Up</a>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        errors :state.errorsReducer
     }     
  };
  export default connect(mapStateToProps,{login})(PopupLogin)