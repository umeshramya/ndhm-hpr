const { Register, Patient } = require("ndhm-hpr")

const auth = async()=>{
    const accessToken ="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBbFJiNVdDbThUbTlFSl9JZk85ejA2ajlvQ3Y1MXBLS0ZrbkdiX1RCdkswIn0.eyJleHAiOjE2MzQ0ODk5OTcsImlhdCI6MTYzNDQ4OTM5NywianRpIjoiNzA0NzA0ZDctY2JhOC00MzZmLTg3MzQtNDE3OTA5ZTk3MDYzIiwiaXNzIjoiaHR0cHM6Ly9kZXYubmRobS5nb3YuaW4vYXV0aC9yZWFsbXMvY2VudHJhbC1yZWdpc3RyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmYWZkNjA3YS1lZjAwLTQzM2MtYTQ4ZC1jOWJjMDcwNDkyNGUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJTQlhfMDAwNjc2Iiwic2Vzc2lvbl9zdGF0ZSI6Ijk0YTliYzA0LTRlMGYtNDhjZS04Yjk2LWVkMzJkMjYwYzUxMiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo5MDA3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImhpcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IlNCWF8wMDA2NzYiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJjbGllbnRJZCI6IlNCWF8wMDA2NzYiLCJjbGllbnRIb3N0IjoiMTAuMjMzLjY4LjQ4IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc2J4XzAwMDY3NiIsImNsaWVudEFkZHJlc3MiOiIxMC4yMzMuNjguNDgifQ.FukMkLUYK4P_Krzdp48wu-xFqN-belufw0deqECpE1ldEyEr1m-lFRAueIMxOSVB8wjjJPrujI2iT1MrNbUqR2A0rbKwNeiIpzTZMKJi5Yj8rrJDcGehjcF07JxdUF-KSUI6XvyHe4DiKMatWJIwWExyAhvcS-PWyJvfUxT--FnNdCnCe9Gxg7qq_TSOLt6d1L1QrG4kfKn95bF7UUPI8dThZdpBRtbY7Cum4rGxs86lgdhKXTJO-oKFqFBqcTyVuWglx9tzBbOaDItGQPV0lMuBAQVuHhYKilnfeQ5msVDiij5lvkUnLmGaqVv_N3cmw_FHZW2KpX1XJoJmeOxiVw"
    const authCode = "254241"
    const transactionId = "4b1412ef-de44-4abf-a255-66fe6bde2153"
    const xCmId="sbx"
    const patient = new Patient("https://dev.ndhm.gov.in/")
  await   patient.hipAuthConfirm({
        "accessToken" : accessToken,
        "authCode" : authCode,
        "transactionId" : transactionId,
        "xCmId" : xCmId
    })
    
}



auth()