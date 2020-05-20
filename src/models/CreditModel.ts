//import { ClientInfo, defaultClientInfo } from './ClientModels'
import { GraficResult } from './GraficModel'

export interface LoanModel {
    amount: number,
    term: number,
    payDay: number,
    commIssueLoan: number,
    paymentMethod: ICodeName,
    grafic: GraficResult
}

export const defaultLoanModel: LoanModel = {
    amount: 0,
    term: 0,
    payDay: 0,
    commIssueLoan: 0,
    paymentMethod: { code: '', name: '' },
    grafic: { dates: [], debts: [], monthlyPayments: [], monthlyPercents: [], singlePayments: [], total: 0 }
}

export interface ICodeName {
    code: string,
    name: string
}
export interface CodeNameDesc extends ICodeName {
    desc: string
}

export interface CreditModel {
    taskId: string,
    program: ICodeName,
    loanInfo: LoanModel
}
export const defaultCreditModel: CreditModel = {
    taskId: '',
    program: { code: '', name: '' },
    loanInfo: defaultLoanModel
}