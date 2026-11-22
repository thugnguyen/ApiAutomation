import { test, expect, request} from '@playwright/test';
import { Request } from '../../Common/Request';
import { RequestUtils } from '../../Common/RequestUtils';
import { JsonUtils } from '../../Common/JsonUtils';

interface AuthorizedRequestBody {
    userName: string;
    password: string;
}

const authorizedRequest: Request<AuthorizedRequestBody> = {
    url: 'https://demoqa.com/Account/v1/Authorized',
    method: 'POST',
    requestBody: {
        userName: 'thunt',
        password: 'Nguyen@nt1'
    },
    headers:{
        'Content-Type': 'application/json',
    }
};
test('Account authorized is true', async () => {
    const requestUtils: RequestUtils = new RequestUtils();
    const response = await requestUtils.executeRequest(authorizedRequest);
    console.log(`request: ${JSON.stringify(authorizedRequest)}`);
    console.log(`response: ${JSON.stringify(response)}`);
    expect(response.status).toBe(200);
    expect(response.responseBody).toBe(true);
});
interface AuthorizedRequestBody {
    userName: string;
    password: string;
}

const unauthorizedRequest: Request<AuthorizedRequestBody> = {
    url: 'https://demoqa.com/Account/v1/Authorized',
    method: 'POST',
    requestBody: {
        userName: 'thunt1',
        password: 'Nguyen@nt1'
    },
    headers:{
        'Content-Type': 'application/json',
    }
};
test('Account authorized is false', async () => {
    const requestUtils: RequestUtils = new RequestUtils();
    const response = await requestUtils.executeRequest(unauthorizedRequest);
    console.log(`request: ${JSON.stringify(unauthorizedRequest)}`);
    console.log(`response: ${JSON.stringify(response)}`);
    expect(response.status).toBe(200);
    expect(response.responseBody).toBe(false);
});

// interface InvalidRequestBody {
//     userName: string;
//     password: string;
// }

// const invalidRequest: Request<InvalidRequestBody> = {
//     url: 'https://demoqa.com/Account/v1/Authorized',
//     method: 'POST',
//     requestBody: {
//         userName: '',
//         password: 'Nguyen@nt1'
//     },
//     headers:{
//         'Content-Type': 'application/json',
//     }
// };
const dataFileName = 'AuthorizedSingleValidation.csv';
const requestBodyFileName = 'AuthorizedRequestBody.json';
const jsonUtils: JsonUtils = new JsonUtils();
const dataFilePath = jsonUtils.buildDataPath('testdata', 'Account', dataFileName);
const requestBodyFilePath = jsonUtils.buildDataPath('testdata', 'Account', requestBodyFileName);
const data = jsonUtils.readDataFromCSV(dataFilePath);
const requestUtils: RequestUtils = new RequestUtils();
for (const row of data) {
    const { FieldName,Value,ExpectedStatusCode,ExpectedMessage } = row;
    const updatedRequestBody: string = requestUtils.updateRequestBody(requestBodyFilePath, row.FieldName, row.Value);

    test ('Account authorized with invalid request body', async () => {
        const requestUtils: RequestUtils = new RequestUtils();
        const response = await requestUtils.executeRequest();
        console.log(`request: ${JSON.stringify(invalidRequest)}`);
        console.log(`response: ${JSON.stringify(response)}`);
        expect(response.status).toBe(Number(row.ExpectedStatusCode));
        expect(response.responseBody).toBe(row.ExpectedMessage === 'true');

});}