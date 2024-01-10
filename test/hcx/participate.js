const ndm = require("../../lib");

const { getToken } = require("../accessToken");

const endpoint_url = `https://webhook.site/fc0bfb6b-f89d-479e-9573-9ad25bb006e7`
const create = async () => {
  const accessToken = await getToken();
  const participate = new ndm.Participant(accessToken);
  const res = await participate.create( {
    // 
    endpoint_url : endpoint_url,
    participant_name: `Jeevan Jyoti Hospital`,
    primaryEmail: `umeshbilagi@gmail.com`,
    phone: ["9343403620"],
    registryid: `IN2910000001`,
    // scheme_code : "Star health insurnace"
  });

  console.log(res.data);
};

const update =  async () => {
    const accessToken = await getToken();
    const participate = new ndm.Participant(accessToken);
    const res = await participate.update( {
      endpoint_url: endpoint_url,
      participant_name: `Jeevan Jyoti Hospital`,
      primaryEmail: `umeshbilagi@gmail.com`,
      phone: ["9343403620"],
      participant_code : "1000000423@sbx"
      // scheme_code : "Star health insurnace",
    });
  
    console.log(res.data);
  };


const getList = async ()=>{
    const accessToken = await getToken();
    const participate = new ndm.Participant(accessToken);
    const res = await participate.fetchPartipants("PAYER")
    console.log(res.data)
}

const getCert  = async()=>{
  const accessToken = await getToken();
  const participate = new ndm.Participant(accessToken);

  let  id="1000000023@sbx"
  // id= "1000000423@sbx"
  const res = await participate.fetchCert(id);

  const data = res.data.encryption_cert;
  const buffer = Buffer.from(data, 'binary');

// Encode the buffer to base64
const base64Encoded = buffer.toString('base64');

console.log(base64Encoded);
  
}
// create();
// update()
getList()
// getCert()


// let encodedData = "MCowBQYDK2VwAyEAfeyB5GnUMnUeqPfW180FGS+s7N8dWmH6X4ZG2x9Vd/Y=";
// let decodedData = atob(encodedData);

// console.log(decodedData);