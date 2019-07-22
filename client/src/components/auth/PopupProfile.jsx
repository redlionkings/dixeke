
import React, { Component } from 'react';
import { MDBRow, 
  MDBCol, 
  MDBInput, 
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBContainer} from "mdbreact";
import { connect } from "react-redux";
import {getMyProfile} from '../../action/auth';
import jwtDecode from 'jwt-decode';
import getFingerPrint from  '../../helpers/getFingerprint';
import setHeaders from '../../helpers/setHeader';
import axios from "axios";
import _ from 'lodash';

class ProfiePopup extends Component {
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
            avatar:"",
            file : null
        };
    };
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) return
        const { profile } = this.props.auth;
        console.log(profile)
        this.props.getMyProfile(profile.id, (user) => {
          console.log(user)
            this.setState(user)
        })
      }
      
    hangdleOnchange = e => {
        this.setState({
            [e.target.name] : e.target.value,
            file : e.target.files && e.target.file[0]
        }, () => {
            const formData = new FormData();
            formData.append('avatar', this.state.file)
            axios.post('./api/user/upload-avatar',formData)
            .then(res => 
                this.setState({
                    avatar : res.data.avatar   
                })
            )
            .catch(err => console.log(err))            
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
          <MDBContainer className="p-3">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3 text-center">
                    <MDBIcon icon="address-card" /> Info
                  </h3>
                </MDBCardHeader>
                <form
                  onSubmit={this.hangdleSumbit}
                  className="grey-text text-left"
                >
                  <MDBRow>
                    <MDBCol md="4">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupFileAddon01"
                          >
                            Upload
                          </span>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </MDBCol>

                    <MDBCol md="4">
                      <MDBInput
                        value={email}
                        name="email"
                        icon="envelope"
                        type="email"
                        id="email"
                        label="Type your email"
                      />
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBInput
                        value={phone}
                        icon="phone"
                        type="number"
                        id="phone"
                        name="phone"
                        label="Phone"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
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
                        <div className="invalid-feedback">
                          Please provide a valid phone.
                        </div>
                        <div className="valid-feedback">
                          Looks good!
                        </div>
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
                        <div className="invalid-feedback">
                          Please provide a valid phone.
                        </div>
                        <div className="valid-feedback">
                          Looks good!
                        </div>
                      </MDBInput>
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
      errors :state.errorsReducer,
      auth: state.auth
   }     
};
export default connect(mapStateToProps,{getMyProfile})(ProfiePopup)


