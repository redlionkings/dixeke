import Fingerprint2 from 'fingerprintjs2'

function getFingerPrint(callback) {
    Fingerprint2.getV18({}, fingerprint => {
        callback(fingerprint)
        }) 
}

export default getFingerPrint