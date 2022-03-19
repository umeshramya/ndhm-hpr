// const extractCmId=(healthId)=>{
//     let index=  healthId.lastIndexOf("@")
//     return healthId.substring(index+1)

// }

// console.log(extractCmId("umeshbilagi@ndhm"))
var newDateObj = new Date(new Date().getTime() + 10*60000).toISOString();

console.log( new Date().toISOString(),newDateObj)