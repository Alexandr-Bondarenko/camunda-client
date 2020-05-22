import axios, { AxiosRequestConfig } from 'axios'
import React, { useState, useEffect } from 'react';
import { CreditModel, defaultCreditModel } from '../models/CreditModel';
import { ProcessInfo, defaultProcessInfo } from '../models/ProcessInfo';
import { CamundaActiveInstanceResponse } from '../models/CamundaActiveInstanceModel';
import { defaultClientInfo, ClientInfo } from '../models/ClientModels';



export interface ICamundaResponse {
    code: number,
    message: string,
    data: any
}
export const defaultCamundaResponse: ICamundaResponse = {
    code: 0,
    message: '',
    data: ''
}

export function request(url: string, data?: any): Promise<ServiceResponse> {
    const config = {
        headers: { 'Access-Control-Allow-Origin': '*' }
    };
    return new Promise<ServiceResponse>((resolve, reject) => {
        if (data) {
            axios.post(url, data, config)
                .then(response => {
                    console.log('response', response);

                    resolve(response.data);

                }).catch(error => console.log('Authorization failed : ' + error.message))
        } else {
            axios.get(url, config)
                .then(response => {
                    console.log('response', response);

                    resolve(response.data);
                })
                .catch(error => console.log('Authorization failed : ' + error.message))
        }
    })

}
export function loadAppState(instanceId: string): Promise<CamundaActiveInstanceResponse> {
    const config = {
        headers: { 'Access-Control-Allow-Origin': '*' }
    };
    var url = urls.loadActiveTask + instanceId;
    return new Promise<CamundaActiveInstanceResponse>((resolve, reject) => {

        axios.get(url, config)
            .then(response => {
                console.log('response', response);
                resolve(response.data.data as CamundaActiveInstanceResponse);
            })
            .catch(error => console.log('Authorization failed : ' + error.message))
    })

}

export interface ServiceResponse {
    code: number,
    message: string,
    data: any
}

export interface IModels {
    creditModel: CreditModel,
    setCreditModel: any,
    processInfo: ProcessInfo,
    setProcessInfo: any,
    clientInfo: ClientInfo,
    setClientInfo: any
}

export const useVariables = (instanceId: string): IModels => {
    const [processInfo, setProcessInfo] = useState<ProcessInfo>(defaultProcessInfo)
    const [creditModel, setCreditModel] = useState<CreditModel>(defaultCreditModel)
    const [clientInfo, setClientInfo] = useState<ClientInfo>(defaultClientInfo)

    const getVariables = (instanceId: string) => {

        request(urls.loadVariables + instanceId)
            .then(response => {

                console.log('response', response.data);
                try {
                    var variables = JSON.parse(response.data);
                } catch (error) {
                    console.log('error', error);
                }

                console.log('variables', variables);

                if (variables?.processInfo?.value)
                    setProcessInfo(JSON.parse(variables?.processInfo?.value));

                if (variables?.creditModel?.value)
                    setCreditModel(JSON.parse(variables?.creditModel?.value));

                if (variables?.clientInfo?.value)
                    setClientInfo(JSON.parse(variables?.clientInfo?.value));

            })
    }


    useEffect(() => {
        if (instanceId) {
            getVariables(instanceId);
        }
    }, [])

    return { creditModel, setCreditModel, processInfo, setProcessInfo, clientInfo, setClientInfo }
}

export const RedirectTo = (url: string) => {

    var a = document.createElement('a');
    a.href = url;
    a.click();
}
export const urls = {
    startProcess: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_CAMUNDA_START_PROCESS_URL}`,
    loadVariables: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_CAMUNDA_LOAD_VARIABLES_URL}`,
    loadActiveTask: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_CAMUNDA_LOAD_ACTIVE_TASK_URL}`,
    nextStep: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_CAMUNDA_NEXT_STEP_URL}`,
    grafic: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_GRAFIC_URL}`,
    clientInfo: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_CLIENT_INFO_URL}`,
    programs: `${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_PROGRAMS_URL}`
} 