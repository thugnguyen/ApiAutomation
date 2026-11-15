import { test, expect, request} from '@playwright/test';
import { Request } from '../../Common/Request';
import { RequestUtils } from '../../Common/RequestUtils';

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