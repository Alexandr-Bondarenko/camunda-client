export interface IRequest {
    requestId: string,
    clientName: string,
    userName: string
}

export interface IRequestInfo {
    requests: IRequest[]
}