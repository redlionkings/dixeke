import axios from 'axios'
function setHeaders(token, fingerPrint){
   
    if (token && fingerPrint) {
        axios.defaults.headers.common["Authorization"] = token;
        axios.defaults.headers.common["fingerprint"] = fingerPrint;
        console.log(4444,'setheader')
    }else {
        delete axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["fingerprint"];
        console.log(55554444,'setheader',fingerPrint)
    }
}
export default setHeaders;
