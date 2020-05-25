import React, { useContext } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { InfoContext } from './ClientData';
import { request, RedirectTo } from '../../api';
import { CreditModel } from '../../models/CreditModel';

export const CompleteClientData = () => {

    const { businessKey, processDefinitionId, processInstanceId, clientInfo } = useContext(InfoContext);

    const completeTask = () => {

        var variables = {
            clientInfo: {
                value: JSON.stringify(clientInfo),
                type: 'Json'
            }
        }

        const data = {
            id: processInstanceId,
            definitionId: processDefinitionId,
            nextDefinitionKey: 'loanData',
            businessKey: businessKey,
            variables: JSON.stringify(variables)
        }
        console.log('data', data);

        var url = `${process.env.REACT_APP_APIHOST_URL}${process.env.REACT_APP_APIHOST_NEXT_STEP}`;
        request(url, data)
            .then(response => {
                console.log('then', response);

                RedirectTo(`/formExecutor/${response.data.id}/${response.data.businessKey}`);

            }).catch(error => {
                console.log('catch', error);

            })

        console.log('variables', variables);
    }

    return (
        <Segment size='big'>
            <Button color='green' onClick={completeTask} floated='left'>Отправить</Button>
        </Segment>
    )
}