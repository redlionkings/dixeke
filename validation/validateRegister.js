const validator = require('validator');
const _ = require('lodash');
const {User} = require("../model/user")

 validatorRegisterInput = async (data) => {
    let error =  {};
    data.email = _.get(data,"email", "");
    data.password = _.get(data, "password", "");
    data.password2 = _.get(data, "password2", "");
    data.userType = _.get(data,"userType", "");
    data.DOB = _.get(data,"DOB", "");
    data.phone = _.get(data,"phone", "");
    data.fullName = _.get(data,"fullName", "");
    //validate
    if(_.isEmpty(data.email))  //true is ok, false invalid
    {
        error.email = "Email is required"
    }else if(!validator.isEmail(data.email)){
        error.email = "Email is Invalid"
    }else { 
        const user = await User.findOne({email : data.email})
        if(user) error.email = "Email exit"
    }

    if(_.isEmpty(data.phone))  //true is ok, false invalid
    {
        error.phone = "Phone is required"
    }else { 
        const user = await User.findOne({phone : data.phone})
        if(user) error.phone = "Phone exit"
    }

    //password
    if (_.isEmpty(data.password)) {
        error.password = "Password is required"
    }else if(!validator.isLength(data.password, {min : 6}))
    {
        error.password = "Password has at least 6 charators"
    }
    //password 2
    if (_.isEmpty(data.password2)) {
        error.password2 = "Confirm password is required"
    }else if(!validator.equals(data.password, data.password2))
    {
        error.password2 = "Confirm password not match "
    }

    console.log(data)

    if (data.userType == '-1' || !data.userType){
        error.userType = 'User Type not selected'
    }

    return {
        isValid : _.isEmpty(error),
        error
    }
}
module.exports= validatorRegisterInput;