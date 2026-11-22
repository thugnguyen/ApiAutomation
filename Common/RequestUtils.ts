import { Request } from './Request';
import { JsonUtils } from './JsonUtils';
import * as fs from 'fs';
export interface ApiResponse<Tresponse> {
    status: number;
    responseBody?: Tresponse;
}
export class RequestUtils {
    async executeRequest<Tbody, Tresponse>(request: Request<Tbody>): Promise<ApiResponse<Tresponse>> {
        const response = await fetch(request.url, {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                ...request.headers,
            },
            body: request.requestBody ? JSON.stringify(request.requestBody) : undefined,
        });
        const statusCode: number = response.status;
        return{
            status: statusCode,
            responseBody: await response.json()
        };
    }

    /**
     * 
     * @param requestBodyFilePath: /Users/thunt/Tài liệu/0AutomationClass/2Projects/0Git/ApiAutomation/testdata/Account/AuthorizedRequestBody.json
     * @param key 
     * @param value 
     * @returns 
     */
    updateRequestBody(orignalRequestFilePath: string, key: string, value: string): string {
        let result: string = "";
        const copyRequestFilePath = orignalRequestFilePath.replace('.json', '_copy.json');
        const jsonUtils: JsonUtils = new JsonUtils();
        jsonUtils.copyFile(orignalRequestFilePath, copyRequestFilePath);
        const copyRequestData = jsonUtils.readDataFromJson(copyRequestFilePath);
        result = jsonUtils.changeValueByKey(copyRequestData, key, value);
        fs.writeFileSync(copyRequestFilePath, result);
        return result;
    }
}
