import { test, expect } from '@playwright/test';
import { Request } from '../../Common/Request';
import { RequestUtils } from '../../Common/RequestUtils';
interface GenerateTokenRequest{
    userName: string;
    password: string;
}
const generateTokenRequest: Request<GenerateTokenRequest> = {
    url: 'https://demoqa.com/Account/v1/GenerateToken',
    method: 'POST',
    requestBody: {
        userName: 'thunt',
        password: 'Nguyen@nt1'
    },
    headers:{
        'Content-Type': 'application/json',
    }
};

test ('Check GenerateToken successfully', async () => {
    const requestUtils: RequestUtils = new RequestUtils();
    const response = await requestUtils.executeRequest(generateTokenRequest);
    console.log(`request: ${JSON.stringify(generateTokenRequest)}`);
    console.log(`response: ${JSON.stringify(response)}`);
    expect(response.status).toBe(200);
    expect(response.responseBody).toHaveProperty('token');
})