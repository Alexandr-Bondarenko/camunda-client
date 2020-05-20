import React, { useContext } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { InfoContext } from '../forms/StartForm';
import { request, RedirectTo, urls } from '../../api';

export const CompleteStartForm = () => {

    const { processInfo, changeProcessInfo } = useContext(InfoContext);

    const completeTask = () => {

        processInfo.startDate = new Date().toLocaleDateString();
        processInfo.startTime = new Date().toLocaleTimeString();

        var variables = {
            processInfo: {
                value: JSON.stringify(processInfo),
                type: 'Json'
            }
        }
        console.log('variables', variables);

        const data = {
            variables: JSON.stringify(variables)
        }

        request(urls.startProcess, data)
            .then(response => {
                console.log('response', response);

                RedirectTo(`/formExecutor/${response.data.id}/${response.data.businessKey}`);

            }).catch(error => {
                console.log('catch', error);
            })
    }

    return (
        <Segment size='big' style={{ backgroundColor: '#87CEEB' }}>
            <Button floated='left' style={{ color: 'white' }} color='facebook' onClick={completeTask}>Новая заявка</Button>
        </Segment>
    )
}