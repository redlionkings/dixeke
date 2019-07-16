import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import _ from "lodash";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
//with Router la higher order component
//nhan 1 compnet tra va 1 component
// B(A) B la withRoueter, A la Login khi do A se co luon cac props cua A
import {login,testPrivate} from '../../action/auth';
import Fingerprint2 from 'fingerprintjs2';
import getFingerPrint from "../../helpers/getFingerprint";
 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {}
    };
  }
  // //test private
  // testPrivate = () => {
  //   const token = localStorage.getItem("token")
  //   getFingerPrint( fingerprint => {
  //     axios.defaults.headers.common["Authorization"] = token;
  //     axios.defaults.headers.common["fingerprint"] = fingerprint;
  //     axios.get('api/user/test-private')
  //     .then(res => console.log(res))
  //     .catch(err => {console.log(err)})
  //   })
   
  // }
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
  
}

  render() {
    return (
      <div className="container text-left">
        LOGIN
        <Form onSubmit={this.hangdleSumbit}>
          <FormGroup>
            <Label for="email" className="d-flex justify-content-between">
              Email
              <span className="text-danger">
                {this.state.error.errors ? this.state.error.errors : ""}
              </span>
            </Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Input mail here..."
              value={this.state.email}
              onChange={this.hangdleOnchange}
              invalid={this.state.error.errors ? true : false}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="d-flex justify-content-between">
              Password
              <span className="text-danger">
                {this.state.error.password ? this.state.error.password : ""}
              </span>
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Input password here..."
              value={this.state.password}
              onChange={this.hangdleOnchange}
              invalid={this.state.error.password ? true : false}
            />
          </FormGroup>
          <Button>Login</Button>
          <Button onClick = {testPrivate}>test</Button>
        </Form>
      </div>
    );
  }
}

// export default withRouter(connect(null,{login})(Logi)
export default connect(null,{login})(Login)