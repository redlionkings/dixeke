import axios from 'axios'
function setHeaders(token, fingerPrint){
   
    if (token && fingerPrint) {
        axios.defaults.headers.common["Authorization"] = token;
        axios.defaults.headers.common["fingerprint"] = fingerPrint;
    }else {
        delete axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["fingerprint"];
    }
}
export default setHeaders;
