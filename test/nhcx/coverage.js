const ndm = require("../../lib");
const {getCert} = require('./participate')
const dotenv = require('dotenv')

dotenv.config()

const { getToken } = require("../accessToken");

const operation = ndm.Nhcx_opertions

const coverage = async ()=>{
    const accessToken = await getToken()
    const ret = new ndm.NhcxOutGoingRequest({
        "accessToken" : accessToken,
        "participantCode" : "1000000423@sbx",
        "protocolBasePath" : process.env.NHCX_COVERAGE_ELIGIBILITY_SERVICE_URL
    })
    return ret;
}
const fhirPayload={
    "entry": [
      {
        "fullUrl": "CoverageEligibilityRequest/c2922d4d-4efa-4be5-bade-6cdd7bbdd432",
        "resource": {
          "created": "2024-04-30T03:28:16.398Z",
          "enterer": {
            "reference": "Practitioner/28de92ca-3ba4-4c7b-b97c-94ec21d2b60c"
          },
          "facility": {
            "reference": "Location/efedcb58-5ed6-4010-b4a0-c7557b6699d2"
          },
          "id": "c2922d4d-4efa-4be5-bade-6cdd7bbdd432",
          "identifier": [
            {
              "system": "https://healthid.ndhm.gov.in/health-number",
              "type": {
                "coding": [
                  {
                    "code": "MR",
                    "display": "Medical record number",
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                  }
                ]
              },
              "value": "umesh105@sbx"
            }
          ],
          "insurance": [
            {
              "coverage": {
                "reference": "Coverage/088bf993-8be3-4b0b-8036-1fc370ef740b"
              },
              "extension": [
                {
                  "url": "http://hcp.org/codes/insurance-company-owners",
                  "valueString": "1"
                }
              ],
              "focal": true
            }
          ],
          "insurer": {
            "reference": "Organization/a2c27179-0c54-4cf2-ae20-93e574a7c49f"
          },
          "item": [
            {
              "category": {
                "coding": [
                  {
                    "code": "781087000",
                    "display": "Medical care",
                    "system": "http://snomed.info/sct"
                  }
                ],
                "text": "Medical care"
              },
              "diagnosis": [
                {
                  "diagnosisCodeableConcept": {
                    "coding": [
                      {
                        "code": "Z71.9.",
                        "display": "FEVER",
                        "system": "http://hl7.org/fhir/sid/icd-10"
                      }
                    ],
                    "text": "FEVER"
                  }
                }
              ],
              "productOrService": {
                "coding": [
                  {
                    "code": "416113008",
                    "display": "Febrile disorder",
                    "system": "http://snomed.info/sct"
                  }
                ],
                "text": "Febrile disorder"
              }
            }
          ],
          "language": "en",
          "meta": {
            "lastUpdated": "2024-04-30T03:28:17.397491+00:00",
            "profile": [
              "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityRequest.html"
            ],
            "versionId": "MTcxNDQ0NzY5NzM5NzQ5MTAwMA"
          },
          "patient": {
            "reference": "Patient/6edcef1a-bea8-4d57-823f-67ac1a56722d"
          },
          "priority": {
            "coding": [
              {
                "code": "normal",
                "display": "Normal",
                "system": "http://terminology.hl7.org/ValueSet/processpriority"
              }
            ],
            "text": "With best effort."
          },
          "provider": {
            "reference": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d"
          },
          "purpose": [
            "benefits"
          ],
          "resourceType": "CoverageEligibilityRequest",
          "servicedDate": "2024-04-30",
          "status": "active",
          "text": {
            "div": "\n  <div xmlns=\"http://www.w3.org/1999/xhtml\"><p>\n  Patient Name : Umesh Ramachandra Bilagi \n  Policy Id : BEN 456577 \n  Insurance: Bajaj Allianz General Insurance Co. Ltd. \n  Subscribeer Id : SUB 45656 \n  Diagnosis : FEVER \n  Discreption : FEVER \n  </p></div>\n  ",
            "status": "generated"
          }
        }
      },
      {
        "fullUrl": "Patient/6edcef1a-bea8-4d57-823f-67ac1a56722d",
        "resource": {
          "birthDate": "1969-09-29",
          "gender": "male",
          "id": "6edcef1a-bea8-4d57-823f-67ac1a56722d",
          "identifier": [
            {
              "system": "http://gicofIndia.com/beneficiaries",
              "type": {
                "coding": [
                  {
                    "code": "SN",
                    "display": "Subscriber Number",
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                  }
                ]
              },
              "value": "BEN 456577"
            }
          ],
          "meta": {
            "profile": [
              "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"
            ]
          },
          "name": [
            {
              "text": "Umesh Ramachandra Bilagi"
            }
          ],
          "resourceType": "Patient",
          "telecom": [
            {
              "system": "phone",
              "value": "9343403620"
            }
          ]
        }
      },
      {
        "fullUrl": "Coverage/088bf993-8be3-4b0b-8036-1fc370ef740b",
        "resource": {
          "beneficiary": {
            "reference": "Patient/6edcef1a-bea8-4d57-823f-67ac1a56722d"
          },
          "id": "088bf993-8be3-4b0b-8036-1fc370ef740b",
          "identifier": [
            {
              "system": "http://hcp.org/codes/insurance-company-owners",
              "value": "POL 11111"
            }
          ],
          "meta": {
            "lastUpdated": "2024-04-30T03:28:16.966370+00:00",
            "profile": [
              "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-Coverage.html"
            ],
            "versionId": "MTcxNDQ0NzY5Njk2NjM3MDAwMA"
          },
          "payor": [
            {
              "reference": "Organization/a2c27179-0c54-4cf2-ae20-93e574a7c49f"
            }
          ],
          "relationship": {
            "coding": [
              {
                "code": "parent",
                "display": "Parent",
                "system": "http://terminology.hl7.org/ValueSet/subscriber-relationship"
              }
            ],
            "text": "The Beneficiary is a parent of the Subscriber"
          },
          "resourceType": "Coverage",
          "status": "active",
          "subscriberId": "SUB 45656",
          "text": {
            "div": "\n  <div xmlns=\"http://www.w3.org/1999/xhtml\"><p>\n  Patient Name : Umesh Ramachandra Bilagi \n  Policy Id : BEN 456577 \n  Insurance: Bajaj Allianz General Insurance Co. Ltd. \n  Subscribeer Id : SUB 45656 \n  Diagnosis : FEVER \n  Discreption : FEVER \n  </p></div>\n  ",
            "status": "generated"
          }
        }
      },
      {
        "fullUrl": "Practitioner/28de92ca-3ba4-4c7b-b97c-94ec21d2b60c",
        "resource": {
          "id": "28de92ca-3ba4-4c7b-b97c-94ec21d2b60c",
          "identifier": [
            {
              "system": "http://abdm.gov.in/facilities",
              "type": {
                "coding": [
                  {
                    "code": "MD",
                    "display": "Medical License number",
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                  }
                ]
              },
              "value": "Unknown"
            }
          ],
          "meta": {
            "profile": [
              "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner"
            ]
          },
          "name": [
            {
              "text": "Dr Rajesh Patil MS Ortho"
            }
          ],
          "resourceType": "Practitioner"
        }
      },
      {
        "fullUrl": "Organization/fd6464c1-a8ef-4e95-aa2a-d5eac433b85d",
        "resource": {
          "address": [
            {
              "city": "Dharwad",
              "country": "India",
              "text": "Near Nehru Stadium Main Gate\nOppos Krishna Bhavan Hotel\nLamington Road\nHubli 580020"
            }
          ],
          "id": "fd6464c1-a8ef-4e95-aa2a-d5eac433b85d",
          "identifier": [
            {
              "system": "http://abdm.gov.in/facilities",
              "type": {
                "coding": [
                  {
                    "code": "AC",
                    "display": "Jeevan Jyoti Hospital",
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                  }
                ]
              },
              "value": "IN2910000001"
            }
          ],
          "meta": {
            "profile": [
              "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization"
            ]
          },
          "name": "Jeevan Jyoti Hospital",
          "resourceType": "Organization"
        }
      },
      {
        "fullUrl": "Organization/a2c27179-0c54-4cf2-ae20-93e574a7c49f",
        "resource": {
          "id": "a2c27179-0c54-4cf2-ae20-93e574a7c49f",
          "identifier": [
            {
              "system": "http://irdai.gov.in/insurers",
              "type": {
                "coding": [
                  {
                    "code": "AC",
                    "display": "Bajaj Allianz General Insurance Co. Ltd.",
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203"
                  }
                ]
              },
              "value": "Bajaj Allianz General Insurance Co. Ltd."
            }
          ],
          "meta": {
            "profile": [
              "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization"
            ]
          },
          "name": "Bajaj Allianz General Insurance Co. Ltd.",
          "resourceType": "Organization"
        }
      }
    ],
    "id": "0ddacbf5-34d7-47e4-b95c-88a07ee6b78c",
    "identifier": {
      "system": "http://hcp.org/codes/insurance-company-owners",
      "value": "BEN 456577"
    },
    "meta": {
      "lastUpdated": "2024-04-30T03:28:20.343666+00:00",
      "profile": [
        "https://ig.hcxprotocol.io/v0.7.1/StructureDefinition-CoverageEligibilityRequestBundle.html"
      ],
      "versionId": "MTcxNDQ0NzcwMDM0MzY2NjAwMA"
    },
    "resourceType": "Bundle",
    "timestamp": "2024-04-30T03:28:19.006Z",
    "type": "collection"
  }

const outGoing = async()=>{
    const recipientCode = "1000000251@sbx" //"1000000121@sbx"

    let curCert = await getCert(recipientCode);
    console.log(curCert)
    const curCov = await coverage()

    const res = await curCov.process({
        "fhirPayload" : fhirPayload,
        "operation" : operation.COVERAGE_ELIGIBILITY_CHECK,
        "receipantPublicCert" : curCert,
        "recipientCode" : recipientCode,
        "xHcxStatus" : "request.initiate"

    })

    // console.log(res)

}



outGoing()