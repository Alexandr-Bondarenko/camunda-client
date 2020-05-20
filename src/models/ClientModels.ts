export interface ClientInfo {
    iin: string,
    firstName: string,
    lastName: string,
    middleName: string,
    birthDate: string,
    maritalStatus: number,
    docNumber: string,
    docIssueDate: string,
    docExpireDate: string
}
export const defaultClientInfo:ClientInfo = {
    iin: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    maritalStatus: 0,
    docNumber: '',
    docIssueDate: '',
    docExpireDate: ''
}