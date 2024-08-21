const ndm = require("../../lib");
const dotenv = require("dotenv");

dotenv.config();

const { getToken } = require("../accessToken");

const participate = async () => {
  const accessToken = await getToken();
  const ret = new ndm.Participant({
    _accessToken: accessToken,
    endpointUrl: process.env.NHCX_ENDPOINT_URL,
    url: process.env.NHCX_PARTICIPANT_HCX_SERVICE_URL,
  });
  return ret;
};

const createProvider = async () => {
  const curPart = await participate();

  const res = await curPart.create({
    linked_registry_codes: ["10001"],
    registryid: "IN2910000010",
    participant_name: "Jeevan Jyoti Hospital",
    scheme_code: "PMJAY",
    state: "Karnataka",
    district: "Dharawad",
    roles: ["10001"],
    primaryEmail: "umeshbilagi@gmail.com",
    phone: ["9343403620"],
    primaryMobile: "9343403620",
    signing_cert_path: "www.nicehms.com/api/hcx/public-key",
    encryption_cert:
      "MIID2TCCAsGgAwIBAgIUAo6Wdh2jnNW5aVz0gB13BnQpGdowDQYJKoZIhvcNAQELBQAwgZQxCzAJBgNVBAYTAklOMRIwEAYDVQQIDAlLYXJuYXRha2ExETAPBgNVBAcMCEh1YmJhbGxpMREwDwYDVQQKDAhOaWNlIEhNUzERMA8GA1UECwwITmljZSBITVMxFTATBgNVBAMMDFVtZXNoIEJpbGFnaTEhMB8GCSqGSIb3DQEJARYSYWFkbWluQG5pY2VobXMuY29tMB4XDTI0MDgyMTAzMDcyMVoXDTM0MDgxOTAzMDcyMVowgZQxCzAJBgNVBAYTAklOMRIwEAYDVQQIDAlLYXJuYXRha2ExETAPBgNVBAcMCEh1YmJhbGxpMREwDwYDVQQKDAhOaWNlIEhNUzERMA8GA1UECwwITmljZSBITVMxFTATBgNVBAMMDFVtZXNoIEJpbGFnaTEhMB8GCSqGSIb3DQEJARYSYWFkbWluQG5pY2VobXMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAgEAtwAGsTmA4BEWZp8OoPr5BiT9OTJ0F15lAacKEr6rh6wPcGf+H8TMy6iyZyUsCDHMqtkVx3ZjL4BsA9kdRw/tGcnN2zGkDbiaxbwyShivNsF3/iGH6MkXsQR9uaCJAyCNV/n60pS6WnrGCcCkpxdhXv9zzVlH8xP2No0cLQ7alfKdRCPJJnJmFoLKOzDZOq0ZvPi5sijjVNqbDS42lKVWqWkY4vIv4rZ3OTQT4SMXr/LdPexFPqzj4wNzJFGny1Qe/9WGGUYWpJR7mojP6yIvX/msuvSKUKt0lWo5o9bQwCxy+iEjwKe/Bqcbq8yA6ue3XNG8vVCuoMxuPMqDVo+CXlLiCfaafb7fDWdBQ4h+FeMrFffCLMA71TiHSnSFrfzdw9bJz7z8zdiy4kiepil8cqMIsiaxo1e8rWVU4VHtm6QVsBSXeJEqmOeTjJ9jFfP1j9tNmOWwJiqGu1VWJ0/M ZyQNgMaS6kooNdlLjJ8tA0J/yEw8OPT01cmx3uf+QSgetRJbHm0ZBElq1GpCeZ/KpTyJ0R0JRIzsJ/Z33+0siSdFsLwbxg52oYoSP0dFwIrrjEvXYCxMn4dG0vpVFnwuzX/nxIkI0bxDCPMQ/4LQXerq4Tcqp+SkehwrVQV+6rZThoiDmQR9+qhtg2T6xnJwKp+AuAJBX++YkwkzrIQLCcUCAwEAAaNTMFEwHQYDVR0OBBYEFNtFZxSeea6X1qdWJWeNj0FqFycdMB8GA1UdIwQYMBaAFNtFZxSeea6X1qdWJWeNj0FqFycdMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAAjELL1VTmqdu5Duyti42/uEt9/QI+vMmwDKZYgGLlC19rJzC3/02fBDWia3gXk+acM7hu2BVgQBNXCEmEOyeE3LnidWW8Lf8WOcItO6K1doUQDkQrRRfNSg3lnulywpWVPXlX+h5Jm7RRD/+f0gjZyVYLRs+rbGrWBb8cM73ux4YKF/t37N4gkWOGh5UoqK1rOBIaHBXhtw5VHKjgveqb5/EQ90wozuG+gm4QC2ELPUKBM61D7gMyh4ALUwBWPqNh58ayEHV6bD8wO686bTOj6bdsNNevYFhHrsX+z+xMIMZnHz+i3MjE+Q9d0oYJ4RMq/4afNsoOR1Yl65lI8ep+k=",
    endpoint_url: "webhook.site/e68c983f-7b9f-4d9f-8136-535ff81c0120",
  });

  console.log(res);
};

const createPayor = async () => {
  const curPart = await participate();
  const res = await curPart.create({
    encryption_cert: process.env.NHCX_PUBLIC_KEY,
    address: {
      description: "Physical address of the facility including its geolocation",
      default_address: {
        city: "Hubli",
        country: "India",
        description: "Default address details",
        postal_code: "580020",
        state: "Karnataka",
        street: "HNo 11, Near pilley school",
      },
    },
    scheme_code: "PMJAY",
    payment_details: {
      description: "Default payment details (UPI or A/C Number + IFSC Code)",
      default_payment: {
        description: "Default payment details",
        account_number: "1234567788",
        ifsc_code: "DFG123",
        UPI: "246567289@ybl",
      },
    },
    participant_name: "My TQP",
    registryid: "IN0000T457",
    phone: ["083622062624"],
    primaryEmail: "adbilagi@gmail.com",
    roles: ["10003"],
    state: "Karanataka",
    district: "Dharaead",
  });

  console.log(res);
};

const update = async () => {
  const curPart = await participate();
  const res = await curPart.update({
    "participant_code" : "1000003415@hcx",
    linked_registry_codes: ["10001"],
    registryid: "IN2910000010",
    participant_name: "Jeevan Jyoti Hospital",
    scheme_code: "PMJAY",
    state: "Karnataka",
    district: "Dharawad",
    roles: ["10001"],
    primaryEmail: "umeshbilagi@gmail.com",
    phone: ["9343403620"],
    primaryMobile: "9343403620",
    signing_cert_path: "www.nicehms.com/api/hcx/public-key",
    encryption_cert:
      "MIID2TCCAsGgAwIBAgIUAo6Wdh2jnNW5aVz0gB13BnQpGdowDQYJKoZIhvcNAQELBQAwgZQxCzAJBgNVBAYTAklOMRIwEAYDVQQIDAlLYXJuYXRha2ExETAPBgNVBAcMCEh1YmJhbGxpMREwDwYDVQQKDAhOaWNlIEhNUzERMA8GA1UECwwITmljZSBITVMxFTATBgNVBAMMDFVtZXNoIEJpbGFnaTEhMB8GCSqGSIb3DQEJARYSYWFkbWluQG5pY2VobXMuY29tMB4XDTI0MDgyMTAzMDcyMVoXDTM0MDgxOTAzMDcyMVowgZQxCzAJBgNVBAYTAklOMRIwEAYDVQQIDAlLYXJuYXRha2ExETAPBgNVBAcMCEh1YmJhbGxpMREwDwYDVQQKDAhOaWNlIEhNUzERMA8GA1UECwwITmljZSBITVMxFTATBgNVBAMMDFVtZXNoIEJpbGFnaTEhMB8GCSqGSIb3DQEJARYSYWFkbWluQG5pY2VobXMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAgEAtwAGsTmA4BEWZp8OoPr5BiT9OTJ0F15lAacKEr6rh6wPcGf+H8TMy6iyZyUsCDHMqtkVx3ZjL4BsA9kdRw/tGcnN2zGkDbiaxbwyShivNsF3/iGH6MkXsQR9uaCJAyCNV/n60pS6WnrGCcCkpxdhXv9zzVlH8xP2No0cLQ7alfKdRCPJJnJmFoLKOzDZOq0ZvPi5sijjVNqbDS42lKVWqWkY4vIv4rZ3OTQT4SMXr/LdPexFPqzj4wNzJFGny1Qe/9WGGUYWpJR7mojP6yIvX/msuvSKUKt0lWo5o9bQwCxy+iEjwKe/Bqcbq8yA6ue3XNG8vVCuoMxuPMqDVo+CXlLiCfaafb7fDWdBQ4h+FeMrFffCLMA71TiHSnSFrfzdw9bJz7z8zdiy4kiepil8cqMIsiaxo1e8rWVU4VHtm6QVsBSXeJEqmOeTjJ9jFfP1j9tNmOWwJiqGu1VWJ0/M ZyQNgMaS6kooNdlLjJ8tA0J/yEw8OPT01cmx3uf+QSgetRJbHm0ZBElq1GpCeZ/KpTyJ0R0JRIzsJ/Z33+0siSdFsLwbxg52oYoSP0dFwIrrjEvXYCxMn4dG0vpVFnwuzX/nxIkI0bxDCPMQ/4LQXerq4Tcqp+SkehwrVQV+6rZThoiDmQR9+qhtg2T6xnJwKp+AuAJBX++YkwkzrIQLCcUCAwEAAaNTMFEwHQYDVR0OBBYEFNtFZxSeea6X1qdWJWeNj0FqFycdMB8GA1UdIwQYMBaAFNtFZxSeea6X1qdWJWeNj0FqFycdMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAAjELL1VTmqdu5Duyti42/uEt9/QI+vMmwDKZYgGLlC19rJzC3/02fBDWia3gXk+acM7hu2BVgQBNXCEmEOyeE3LnidWW8Lf8WOcItO6K1doUQDkQrRRfNSg3lnulywpWVPXlX+h5Jm7RRD/+f0gjZyVYLRs+rbGrWBb8cM73ux4YKF/t37N4gkWOGh5UoqK1rOBIaHBXhtw5VHKjgveqb5/EQ90wozuG+gm4QC2ELPUKBM61D7gMyh4ALUwBWPqNh58ayEHV6bD8wO686bTOj6bdsNNevYFhHrsX+z+xMIMZnHz+i3MjE+Q9d0oYJ4RMq/4afNsoOR1Yl65lI8ep+k=",
    endpoint_url: "webhook.site/e68c983f-7b9f-4d9f-8136-535ff81c0120",
  });

  console.log(res);
};

const getList = async () => {
  try {
    const curPart = await participate();

    const res = await curPart.fetchPartipants("PAYER");
    console.log(JSON.stringify(res.data));
  } catch (error) {
    console.log(error.response.data);
  }

  // console.log(res.data.participantdetails.filter(el=> el.participantcode == "1000000423@sbx"))

  // get payer
  //

  //  console.log(res.data.participantdetails.filter(el=> el.participantcode == "1000000590@sbx"))
};

const getCert = async (id) => {
  const curPart = await participate();
  const res = await curPart.fetchCert(id);
  console.log(res)
};

const search = async (id) => {
  const curPart = await participate();
  res = await curPart.search(id);

  console.log(res);
};

const getPlicies = async () => {
  const curPart = await participate();
  const res = await curPart.getPolicies({
    identifiertype: "AbhaNumber",
    identifiervalue: "917113576778608",
  });
  console.log(res.data);
};
const updateCert = async () => {
  const fs = require("fs");
  const publicCert = fs.readFileSync("./keys/public_cert.pem", "utf8");

  const curPart = await participate();
  const res = await curPart.participantCertUpdtae({
    encryptioncert: "MIIDzzCCAregAwIBAgIUHbWsq3tUdgYxdBiYJLo8OzSElh0wDQYJKoZIhvcNAQEL BQAwgY8xCzAJBgNVBAYTAlVTMQ4wDAYDVQQIDAVTdGF0ZTENMAsGA1UEBwwEQ2l0 eTEVMBMGA1UECgwMT3JnYW5pemF0aW9uMQ0wCwYDVQQLDARVbml0MRQwEgYDVQQD DAtleGFtcGxlLmNvbTElMCMGCSqGSIb3DQEJARYWeW91cl9lbWFpbEBleGFtcGxl LmNvbTAeFw0yNDA1MDcxMzUzNTlaFw0yNTA1MDcxMzUzNTlaMIGPMQswCQYDVQQG EwJVUzEOMAwGA1UECAwFU3RhdGUxDTALBgNVBAcMBENpdHkxFTATBgNVBAoMDE9y Z2FuaXphdGlvbjENMAsGA1UECwwEVW5pdDEUMBIGA1UEAwwLZXhhbXBsZS5jb20x JTAjBgkqhkiG9w0BCQEWFnlvdXJfZW1haWxAZXhhbXBsZS5jb20wggEiMA0GCSqG SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDyjnu8welc9GdtbByv21J5mNBNN3s1CKZi rEGBUrJOkK8Rz4I3eDLN51rSKYlPnVu8piQRR898ArBF6SsV+Pn45WjMTHnfI4mK K1zl+FolE6he6XzpwV8eFsqJQYYl3CG03z3+nIUb/CKsYuJgrlOVbtkloI5ljSf0 Hw+kfjOM0FDBVQTt0UfeNuqbLBJ2YxPAbzb2IhrlzYuf60xCqbMnCRutAd3ZY8Yq D6SHSZg7eBLESnHU+tqsof42y+N/vFDROdc/fIfG34Amo8mUwBoQv9bxn0s5Jrff blxzBshP3q34ubKvhWUbWxXPts69v8OjJtOTqP7UWm9Y5EOMjhFhAgMBAAGjITAf MB0GA1UdDgQWBBR2/iJ52wm6WZxFNP08VtfrlUPZWjANBgkqhkiG9w0BAQsFAAOC AQEAYuYoCgnjF9d3Px2WVVKp/t348gWOS12OsBY2vANpavlJPIrUe2uu35WyYQ88 2K8SHbwufgixG0HN//jYNKkJL7lIgaiejJ9d9PVdGU509MO+0Z12O/ErzGJjhJcd NwFpmFoEHLZp6tCkWfwMeogsM30p5X/aFCE+JJ3trXzbK6y14/DEi/a3PSN49CZA xS6s+UvCiVt7TKS2/wVjKqgKNxVufWR8ntPVGdz0sKQORl6Lj9TbL+rbaHsaqubm zdU5pYXzI/ph8G4LcwQtdWvn3WkTNn6S7jgc3QBLIVMythpwvKqLKiOfXWq7/vg9 t6E0JJYh+AO9emEnGGVtvPAyBw==",
    endpointurl: "webhook.site/e68c983f-7b9f-4d9f-8136-535ff81c0120",
    participantcode: "1000003415@hcx",
  });

  console.log(res);
};

let  id="1000003415@hcx"

createProvider();

// createPayor();
// update()
// getList()

// getCert(id)
// search(id)
// getPlicies()
// updateCert()

// let encodedData = "MCowBQYDK2VwAyEAfeyB5GnUMnUeqPfW180FGS+s7N8dWmH6X4ZG2x9Vd/Y=";
// let decodedData = atob(encodedData);

// console.log(decodedData);

module.exports = { getCert };
