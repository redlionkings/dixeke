import Fingerprint2 from 'fingerprintjs2'

function getFingerPrint(callback) {
    Fingerprint2.getV18({}, fingerprint => {
        console.log('callback', fingerprint)
        callback(fingerprint)
        }) 
}

export default getFingerPrint