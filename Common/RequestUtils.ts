import { Request } from './Request';
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
}