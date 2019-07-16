import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {register} from '../../action/auth'
import {connect} from 'react-redux';
import _ from 'lodash';

class Register extends Component {
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
        return (
          <div className="container text-left">
            <h1>Register</h1>
            <Form onSubmit = {this.hangdleSumbit}>
              <FormGroup>            
                <Label for="email" className= "d-flex justify-content-between" >Email
                <span className = "text-danger" > {this.props.errors.email ? this.props.errors.email : "" }</span>
                </Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Input mail here..."
                  value = {this.state.email}
                  onChange={this.hangdleOnchange}
                  invalid={this.props.errors.email ? true : false  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="password" className= "d-flex justify-content-between" >Password
                <span className = "text-danger" >{this.props.errors.password ? this.props.errors.password : "" }</span>
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Input password here..."
                  value = {this.state.password}
                  onChange={this.hangdleOnchange}
                  invalid={this.props.errors.password ? true : false  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="password2" className= "d-flex justify-content-between">Confirm Password
                <span className = "text-danger" >{this.props.errors.password2 ? this.props.errors.password2 : "" }</span>
                </Label>
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="Input Confirm password here..."
                  value = {this.state.password2}
                  onChange={this.hangdleOnchange}
                  invalid={this.props.errors.password2 ? true : false  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="userType">User Type</Label>
                <Input type="select" name="userType" id="userType" 
                value = {this.state.userType}
                onChange={this.hangdleOnchange} >
                  <option value = "-1">Select User Type</option>
                  <option value = "passenger">Passenger</option>
                  <option value = "driver">Driver</option>
                </Input>
              </FormGroup>
              <FormGroup>
                FullName
                <Input type="text" name="fullName" id="fullName"
                 placeholder="Input fullname here..."
                 value = {this.state.fullName}
                 onChange={this.hangdleOnchange}
                  />
              </FormGroup>
              <FormGroup>
              <Label for="phone"  className= "d-flex justify-content-between" >Phone
              <span className = "text-danger" >{this.props.errors.phone ? this.props.errors.phone : "" }</span>
              </Label>
              <Input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Input phone here..."
                  value = {this.state.phone}
                  onChange={this.hangdleOnchange}
                  invalid={this.props.errors.phone ? true : false  }
                />
              </FormGroup>
              <FormGroup>
              <Label for="DOB">Day of Bird</Label>
              <Input
                  type="date"
                  name="DOB"
                  id="DOB"
                  placeholder="Input DOB here..."
                  value = {this.state.DOB}
                  onChange={this.hangdleOnchange}
                />
              </FormGroup>
              <Button>Submit</Button>
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
export default connect(mapStateToProps,{register})(Register)


