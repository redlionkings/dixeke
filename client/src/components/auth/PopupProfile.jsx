
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
import AvatarEditor from 'react-avatar-editor';
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
            avatar:"uploads/15621690312751.jpg",
            file : null
        };
    };
    componentDidMount() {
      const token = localStorage.getItem('token');
      const fingerPrint = localStorage.getItem('fingerprint');
        if (!token && !fingerPrint) return
        setHeaders(token,fingerPrint)
        const { profile } = this.props.auth;
        this.props.getMyProfile(profile.id, (user) => {
            this.setState(user)
        })
      }
      
    hangdleOnchange = e => {
        this.setState({
            [e.target.name] : e.target.value,
            file : e.target.files && e.target.files[0]
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
     const {email,phone, DOB,userType, fullName} = this.state
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
                  <MDBRow className='mt-4'>
                    <MDBCol md="4">
                        <AvatarEditor
                          image= {this.state.avatar && `http://localhost:5000/${this.state.avatar}`}
                          width={250}
                          height={300}
                          border={0}
                          alt = "avatar"/>
                        <input type="file" name = "file" onChange= {this.hangdleOnchange} file = {this.state.file}></input>
                      </MDBCol>
                    <MDBCol> 
                      <MDBRow> 
                        <MDBCol>
                          <MDBInput
                            value={email}
                            name="email"
                            icon="envelope"
                            type="email"
                            id="email"
                            label="Type your email"
                          />
                        </MDBCol>
                        <MDBCol>
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
                        <MDBCol>
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
                        <MDBCol>
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
                    </MDBCol>
                  </MDBRow>    
                  <div className="text-center mt-4">
                    <MDBBtn
                      color="light-blue"
                      className="mb-3"
                      type="submit"
                    >Save
                    </MDBBtn>
                  </div>>  
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


