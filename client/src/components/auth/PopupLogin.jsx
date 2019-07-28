import React, { Component } from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import {login,getErrors} from '../../action/auth';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
      componentDidMount() {
        this.props.getErrors({})
      }
      hangdleOnchange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      hangdleSumbit = e => {
        e.preventDefault();
        //fingerprint
        this.props.login(this.state, this.props.history)
        
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
                      label= 'Type Your Mail'
                      icon="envelope"
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.hangdleOnchange}
                      required
                      className={errors.errors ? "is-invalid" : ''}
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.hangdleOnchange}
                      className={errors.errors ? "is-invalid" : ''}
                      required
                    />
                    <Label className='text-left'>
                    <span className = "text-danger" > {errors.errors ? errors.errors : "" }</span>
                    </Label>
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
  export default connect(mapStateToProps,{login,getErrors})(PopupLogin)