
import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard,MDBCardBody, MDBIcon, MDBCardHeader, MDBContainer  } from "mdbreact";
import {register,getErrors} from '../../action/auth'
import {connect} from 'react-redux';
import { Label, Input } from 'reactstrap';
import _ from 'lodash';

class RegisterPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            password2 : "",
            userType : "",
            fullName : "",
            phone : "",
            DOB : "",
            error : {}
        }
    } 

    componentDidMount() {
      this.props.getErrors({})
    }

    hangdleOnchange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    hangdleSumbit = e => {
        e.preventDefault();
        this.props.register(this.state, this.props.history)
    }

    render() {
     const {errors} = this.props

     const {email,password,password2,phone, DOB,userType, fullName} = this.state
        return (
          <MDBContainer className ="p-3">
              <MDBCard>
              <MDBCardBody>
             <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3 text-center">
                    <MDBIcon icon="address-card" /> Register
                  </h3>
                </MDBCardHeader>
            <form onSubmit={this.hangdleSumbit}  className="grey-text text-left">
              <MDBRow >
                <MDBCol md="4">
                  <MDBInput
                    value={email}
                    name="email"
                    icon="envelope"
                    onChange={this.hangdleOnchange}
                    type="email"
                    id="email"
                    label="Type your email"
                    required
                    className = {errors.email ? 'is-invalid' : ''}
                  >
                    <div className="invalid-feedback">
                        {errors.email}
                    </div>
                  </MDBInput>
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    value={password}
                    icon="lock"
                    name="password"
                    onChange={this.hangdleOnchange}
                    type="password"
                    id="password"
                    label="Password"
                    required
                    className = {errors.password ? 'is-invalid' : ''}
                  >
                    <div className="invalid-feedback">
                     {errors.password }
                    </div>
                  </MDBInput>
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    value={password2}
                    icon="lock"
                    onChange={this.hangdleOnchange}
                    type="password"
                    id="password2"
                    name="password2"
                    label="Confirm Password"
                    className = {errors.password2 ? 'is-invalid' : ''}
                  >
                    <div className="invalid-feedback">
                        {errors.password2 }
                    </div>
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <MDBInput
                    value={phone}
                    icon="phone"
                    onChange={this.hangdleOnchange}
                    type="number"
                    id="phone"
                    name="phone"
                    label="Phone"
                    required
                    className = {errors.phone ? 'is-invalid' : ''}
                  >
                    <div className="invalid-feedback">
                      {errors.phone}
                    </div>
                  </MDBInput>
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    value={DOB}
                    icon="calendar-alt"
                    onChange={this.hangdleOnchange}
                    type="date"
                    id="DOB"
                    name="DOB"
                    label="Day of Birth"
                    required
                  >
                  </MDBInput>
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    value={fullName}
                    icon="user-circle"
                    onChange={this.hangdleOnchange}
                    type="text"
                    id="fullName"
                    name="fullName"
                    label="Name"
                    required
                  >
                  </MDBInput>
                </MDBCol>
                </MDBRow>
                <MDBRow >
                <MDBCol md="4">
                <Label for="userType">User Type</Label>
                <Input
                  type="select"
                  value = {userType}
                  onChange={this.hangdleOnchange}
                  name="userType" 
                  id="userType" 
                  required
                >
                  <option value = "-1">Select User Type</option>
                  <option value = "passenger">Passenger</option>
                  <option value = "driver">Driver</option>
                  </Input>
                  <span className = "text-danger">{errors.userType}</span>
                </MDBCol>
              </MDBRow>
              <div className="text-center mt-4">
                  <MDBBtn
                    color="light-blue"
                    className="mb-3"
                    type="submit"
                  >
                    Register
                  </MDBBtn>
                </div>
            </form>
            </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      errors :state.errorsReducer
   }     
};
export default connect(mapStateToProps,{register,getErrors})(RegisterPopup)


