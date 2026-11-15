export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export interface Request <Tbody> {
    url: string;
    method: HttpMethod;
    requestBody?: Tbody;
    headers?: Record<string, string>;
    //response?: Tresponse;
}
