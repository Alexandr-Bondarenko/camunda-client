import React, { useState, useEffect } from 'react'
import { loadAppState, RedirectTo } from '../../api';
import { formsList } from '../forms';
import { Redirect } from 'react-router';
import { Label } from 'semantic-ui-react';

interface IProps {
    instanceId: string,
    businessKey:string
}

export const LoadAppState = ({ instanceId, businessKey }: IProps) => {

    async function getState() {
        //debugger
        while (true) {
            var stateResponse = await loadAppState(instanceId);
            console.log('stateResponse', stateResponse);
            
            if (formsList.find(item => {
                if (item === stateResponse?.activityId) {
                    return true;
                }
            })) {
                break;
            }
            setTimeout(() => { }, 1000);
        }
        console.log('getState', stateResponse);

        RedirectTo(`/${stateResponse.activityId}
                    /${businessKey}
                    /${stateResponse.processDefinitionId}
                    /${stateResponse.processInstanceId}`);

        var a = document.createElement('a');
        a.href = '/' + stateResponse.activityId + '/' + businessKey + '/' + stateResponse.processDefinitionId + '/' + stateResponse.processInstanceId;
        a.click();
    }

    useEffect(() => {
        getState();
    }, [])

    return (
        <>
            <Label>Waiting...</Label>
        </>
    )
}