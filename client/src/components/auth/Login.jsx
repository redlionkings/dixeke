import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import _ from "lodash";
import {connect} from 'react-redux';
import {login,testPrivate} from '../../action/auth';

 class Login extends Component {
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
}
  render() {
    const {errors} = this.props
    return (  
      <div className="container text-left">
        LOGIN
        <Form onSubmit={this.hangdleSumbit}>
          <FormGroup>
            <Label for="email" className="d-flex justify-content-between">
              Email
              <span className="text-danger">
                {errors.errors ? errors.errors : ""}
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
                {errors.password ? errors.password : ""}
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
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      errors :state.errorsReducer
   }     
};
// export default withRouter(connect(null,{login})(Logi)
export default connect(mapStateToProps,{login})(Login)