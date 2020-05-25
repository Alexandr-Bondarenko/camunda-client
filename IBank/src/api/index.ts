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
    var url = `${process.env.REACT_APP_APIHOST_URL}${process.env.REACT_APP_APIHOST_LOAD_ACTIVE_TASK}`;
    return new Promise<CamundaActiveInstanceResponse>((resolve, reject) => {

        axios.get(url + instanceId, config)
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

        var url = `${process.env.REACT_APP_APIHOST_URL}${process.env.REACT_APP_APIHOST_LOAD_VARIABLES}`;
        request(url + instanceId)
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
