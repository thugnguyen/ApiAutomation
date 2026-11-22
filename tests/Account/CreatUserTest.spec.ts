import { test, expect } from '@playwright/test';
import { Request } from '../../Common/Request';
import { RequestUtils } from '../../Common/RequestUtils';
interface CreateUserRequestBody {
    userName: string;
    password: string;
}

const createUserRequest: Request<CreateUserRequestBody> = {
    url: 'https://demoqa.com/Account/v1/User',
    method: 'POST',
    requestBody: {
        userName: 'thunt3',
        password: 'Nguyen@nt1'
    },
    headers:{
        'Content-Type': 'application/json',
    }
};
test('Create user successfully', async () => {
    const requestUtils: RequestUtils = new RequestUtils();
    const response = await requestUtils.executeRequest(createUserRequest);
    console.log(`request: ${JSON.stringify(createUserRequest)}`);
    console.log(`response: ${JSON.stringify(response)}`);
    expect(response.status).toBe(201);
});