import axios from 'axios'
import _ from 'lodash';
import getFingerPrint from '../helpers/getFingerprint';
import Fingerprint2 from 'fingerprintjs2';
import jwtDecode from 'jwt-decode';
import setHeader from '../helpers/setHeader'
export const getErrors = (err) => {
    return {
        type :"GET_ERRORS",
        payload : err 
    }
}

export const register = (data,history) => {
    return (dispatch) => {
        axios({
            //defaut
            method : 'POST',
            url : '/api/user/register',
            data: data
        })
        .then(res => {
            console.log("res: ", res);
            dispatch(getErrors(_.get(e, "response.data")))
            history.push("/")
            alert("dang ky thanh cong")
        })
        .catch(e  => {  
            if(e){
           dispatch(
               getErrors(_.get(e, "response.data")))
           }
        })
    }
}
 
export const login = (data, history) => {
    const {email,password} = data
    return (dispatch) => {
        getFingerPrint( fingerprint => {
            axios.defaults.headers.common["fingerprint"] = fingerprint;
            axios({
              //defaut
              method: "POST",
              url: "/api/user/login",
              data: { email , password, fingerprint }
            })
              .then(res => {
                console.log("res: ", res);
                const token = res.data.token;
                localStorage.setItem("token", token);
      
                const decoded = jwtDecode(token); //redux store
                
                //
                dispatch(setUserCurrent(decoded))
                //set header
                setHeader(token, fingerprint)
                axios.defaults.headers.common["Authorization"] = token;
                axios.defaults.headers.common["fingerprint"] = fingerprint;
                history.push("/")
                alert("dang nhap thanh cong");
              })         
              .catch(err => {
                  if (err) {
                      dispatch(getErrors(_.get(err,"response.data")))
                  }         
              });
          });
    }
}

  //test private
export const testPrivate = () => {
    const token = localStorage.getItem("token")
    getFingerPrint( fingerprint => {
      axios.defaults.headers.common["Authorization"] = token;
      axios.defaults.headers.common["fingerprint"] = fingerprint;
      axios.get('api/user/test-private')
      .then(res => console.log(res))
      .catch(err => {console.log(err)})
    }) 
  }

  export const logout = ()=> {
    return (dispatch) => {
        localStorage.removeItem("token")
        dispatch(setUserCurrent({}))
        setHeader()
    }
  }

  export const setUserCurrent = (data) => {
      return {
          type : "SET_CURRENT_USER",
          payload : data
      }
  }

  export const getMyProfile = (id, callback) => {
    return (dispatch) => {
        axios.get(`/api/user/${id}`)
        .then(res => {
            console.log(res.data)
            dispatch(setUserCurrent(res.data))
            callback(res.data)
        })
        .catch(err => {
            if (err) {
                dispatch(getErrors(_.get(err, "response.data")))
            }
        })
    }  

  }