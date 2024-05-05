const ndm = require("../../lib");
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
    const cert=`
    -----BEGIN CERTIFICATE-----
    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
    hnptBv8=
    -----END CERTIFICATE-----
    `
    const curCov = await coverage()

    const res = await curCov.process({
        "fhirPayload" : fhirPayload,
        "operation" : operation.COVERAGE_ELIGIBILITY_CHECK,
        "receipantPublicCert" : cert,
        "recipientCode" : "1000000121@sbx",
        "xHcxStatus" : "request.initiate"

    })

    // console.log(res)

}



outGoing()