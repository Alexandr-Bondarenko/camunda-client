export interface ProcessInfo {
    id: string,
    definitionId: string,
    businessKey: string,
    processName: string,
    errorMessage: string,
    startDate: string,
    startTime: string
}
export const defaultProcessInfo: ProcessInfo = {
    id: '',
    definitionId: '',
    businessKey: '',
    processName: '',
    errorMessage: '',
    startDate: '',
    startTime: ''
}