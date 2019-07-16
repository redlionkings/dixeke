const validator = require('validator');
const _ = require('lodash');
const {User} = require("../model/user")

 validatorRegisterInput = async (data) => {
    let error =  {};
    ///////////////////////
    //kiem tra xem input co bi bo trong hay khoong
    //neu input bi bo trong thi cho no la blank
    //data.email = data.email ? data.email : ""
    data.email = _.get(data,"email", "");
    data.password = _.get(data, "password", "");
    data.password2 = _.get(data, "password2", "");
    data.userType = _.get(data,"userType", "");
    data.DOB = _.get(data,"DOB", "");
    data.phone = _.get(data,"phone", "");
    data.fullName = _.get(data,"fullName", "");
    //validate
    //check co gui nhung la blank
    if(_.isEmpty(data.email))  //true is ok, false invalid
    {
        error.email = "email is required"
    }else if(!validator.isEmail(data.email)){
        error.email = "Email is Invalid"
    }else { 
        const user = await User.findOne({email : data.email})
        if(user) error.email = "Email exit"
    }

    if(_.isEmpty(data.phone))  //true is ok, false invalid
    {
        error.phone = "phone is required"
    }else { 
        const user = await User.findOne({phone : data.phone})
        if(user) error.phone = "phone exit"
    }


    //password
    if (_.isEmpty(data.password)) {
        error.password = "password is required"
    }else if(!validator.isLength(data.password, {min : 6}))
    {
        console.log(data.password)
        error.password = "password has at least 6 charators"
    }
    //password 2
    if (validator.isEmpty(data.password2)) {
        error.password2 = "confirm password is required"
    }else if(!validator.equals(data.password, data.password2))
    {
        error.password2 = "password not match "
    }
    return {
        // neu error la {} true, isValid = false khi error co thuoc tinh
        isValid : _.isEmpty(error),
        error
    }
}

// .toPairs // object ===> array
// .fromPairs // array===> object

// data (object) ==> data (array) = >> map (return tung element ==> array) ==> object 
//               _.toPairse           _.map                                ._fromPairs
//._fromPairs(_.fromPairS(data)).map)
// _.chain(data).toPairs().map().fromPairs() 

module.exports= validatorRegisterInput;