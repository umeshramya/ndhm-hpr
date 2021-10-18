const { Register, Patient } = require("ndhm-hpr")

const auth = async () => {
    const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBbFJiNVdDbThUbTlFSl9JZk85ejA2ajlvQ3Y1MXBLS0ZrbkdiX1RCdkswIn0.eyJleHAiOjE2MzQ1NTk5MzYsImlhdCI6MTYzNDU1OTMzNiwianRpIjoiM2Q1YzdjMTQtM2IwYS00M2YwLTg5NzktMzZmODE1NzVmYWRlIiwiaXNzIjoiaHR0cHM6Ly9kZXYubmRobS5nb3YuaW4vYXV0aC9yZWFsbXMvY2VudHJhbC1yZWdpc3RyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmYWZkNjA3YS1lZjAwLTQzM2MtYTQ4ZC1jOWJjMDcwNDkyNGUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJTQlhfMDAwNjc2Iiwic2Vzc2lvbl9zdGF0ZSI6ImJiNzM5YmU1LWQ0YjItNDQ4Zi1hOWRlLTk0OTY1ZDNhNDEzNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo5MDA3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImhpcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IlNCWF8wMDA2NzYiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJjbGllbnRJZCI6IlNCWF8wMDA2NzYiLCJjbGllbnRIb3N0IjoiMTAuMjMzLjY3LjM3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc2J4XzAwMDY3NiIsImNsaWVudEFkZHJlc3MiOiIxMC4yMzMuNjcuMzcifQ.iNgp9str3L6DDxLhqQdmezHLNBwHrS2RT3YikAkvf2yrxN_L5m5VUWI5dSd4tn7rvhN8B0urci6gUl55T6pbRFrmCDFzcbzUtqa1Og1FkorZqQJAOhHVBxkECzTyXoAWrJdmJK6YJCsW5Va5oaoHwSU3q_PtnLFG77tZxh6GQyhPH7JRoachlVxOb3MV0UMf2eAp2Vhhk5JxSpYzFfwiI71xP9KU5xt_Njx-_Fm7Z6jPZAKaAzxoTPV1XlNVkpMjHEzJfvHalD4HmQuQ9sXk3I_UhhgkS_1UKSSuUgyo7Pokyb6TWNtUYoElyiDFJVIGv4KFVCj23FtH9nk2jc0OxA"
    const authCode = "125285"
    const transactionId = "b5465803-443c-4b3e-b3ad-59706d02a2e6"
    const patient = new Patient("https://dev.ndhm.gov.in/", accessToken, "sbx")
    await patient.hipAuthConfirm({
        "authCode": authCode,
        "transactionId": transactionId,
    })

    await patient.hipPatientAddContext({
        "careContextAccessToken": "",
        "patientId": 123,
        "patinetDisplay": "Umesh R Bilagi",
        "careContextId": 5678,
        "careContextDisplay": "OPD"
    })

}



auth()