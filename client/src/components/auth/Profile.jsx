import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import {getMyProfile} from '../../action/auth'
import jwtDecode from 'jwt-decode';
import getFingerPrint from  '../../helpers/getFingerprint';
import setHeaders from '../../helpers/setHeader';
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      userType: "",
      fullName: "",
      phone: "",
      DOB: "",
      avatar: "",
      file : null
    };
  }

  componentDidMount() {

    const token = localStorage.getItem('token');
    if (!token) return
    // const decoded = jwtDecode(token)
    // this.props.setUserCurrent(decoded)

    getFingerPrint(fingerprint => {
      setHeaders(token,fingerprint)
 
      const { profile } = this.props.auth;
      this.props.getMyProfile(profile.id, (user) => {
          this.setState(user)
      })
    })
    // if( (Date.now) / 1000 > decoded.exp) {
    //     this.props.logout();
    // }
  }
  onChange = (e) => {
    console.log(e)
      this.setState({
          [e.target.name] : e.target.value,
          file : e.target.files && e.target.files[0]
          
      }, () => { 
           const formData = new FormData();
           
            formData.append("avatar", this.state.file)
            console.log(this.state.file)
            axios.post('/api/user/upload-avatar',formData)
            .then(res => this.setState({
                avatar : res.data.avatar
            }, console.log( res.data.avatar)))
            .catch(err => console.log(err));
        })
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={5}>
                <img 
                src = {this.state.avatar && `http://localhost:5000/${this.state.avatar}`} alt = "avatar"/> 
                <input type="file" name = "file" onChange= {this.onChange} file = {this.state.file}></input>
            </Col>

            <Col md={7}>
              <h4>My INFO </h4>
              <Form>
                <FormGroup>
                  <Label for="email" className="d-flex justify-content-between">
                    Email
                    {/* <span className = "text-danger" > {this.props.errors.email ? this.props.errors.email : "" }</span> */}
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Input mail here..."
                    value={this.state.email}
                    //   onChange={this.hangdleOnchange}
                    //   invalid={this.props.errors.email ? true : false  }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userType">User Type</Label>
                  <Input
                    type="text"
                    name="userType"
                    id="userType"
                    value={this.state.userType}
                    //onChange={this.hangdleOnchange}
                  />
                </FormGroup>
                <FormGroup>
                  FullName
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Input fullname here..."
                    value={this.state.fullName}
                    //nChange={this.hangdleOnchange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phone" className="d-flex justify-content-between">
                    Phone
                    {/* <span className = "text-danger" >{this.props.errors.phone ? this.props.errors.phone : "" }</span> */}
                  </Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Input phone here..."
                    value={this.state.phone}
                    //   onChange={this.hangdleOnchange}
                    //   invalid={this.props.errors.phone ? true : false  }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="DOB">Day of Bird</Label>
                  <Input
                    type="date"
                    name="DOB"
                    id="DOB"
                    placeholder="Input DOB here..."
                    value={this.state.DOB}
                    //   onChange={this.hangdleOnchange}
                  />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps,{getMyProfile})(Profile);
