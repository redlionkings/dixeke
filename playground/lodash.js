const _ = require('lodash');

//is Empty
//check xem object/arry co  phan tu nao hay ko

const obj = {}
console.log("TCL: obj.key(obj).length", Object.keys(obj).length === 0)

console.log("check empty with:", _.isEmpty(obj))


// .get
let obj2 = {}
//=========== obj2 = result
// can lay obj2.content.attributes.id
//check co ton tai k
const id = obj2.content && obj2.content.attributes && obj2.content.attributes.id
console.log(id)

console.log("lay id voi lodash" , _.get(obj2, "content.attributes.id","k ton tai"))

// _.set
_.set(obj2,"content.attributes.id","2")
console.log(obj2)