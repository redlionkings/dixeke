import axios from 'axios'
import _ from 'lodash';
import getFingerPrint from '../helpers/getFingerprint';
import jwtDecode from 'jwt-decode';
import setHeader from '../helpers/setHeader'
import { ToastsStore} from 'react-toasts';
export const getErrors = (err) => {
    console.log(err)
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
            history.push("/")
            alert("register success")
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
            axios({
              //defaut
              method: "POST",
              url: "/api/user/login",
              data: { email , password, fingerprint }
            })
              .then(res => {
                const token = res.data.token;
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token); //redux store          
                //
                dispatch(setUserCurrent(decoded))
                //set header
                setHeader(token, fingerprint)
                history.push("/")
                ToastsStore.success("Hey, you just clicked!123123")
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
        console.log(id)
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