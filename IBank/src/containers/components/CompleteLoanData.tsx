import React, { useContext } from 'react'
import { Segment, Button } from 'semantic-ui-react'
import { InfoContext } from './LoanData';
import { request, RedirectTo, urls } from '../../api';
import { CreditModel } from '../../models/CreditModel';

export const CompleteLoanData = () => {

    const { businessKey, processDefinitionId, processInstanceId, creditModel } = useContext(InfoContext);

    const completeTask = () => {

        var variables = {
            creditModel: {
                value: JSON.stringify(creditModel),
                type: 'Json'
            }
        }

        const data = {
            id: processInstanceId,
            definitionId: processDefinitionId,
            nextDefinitionKey: 'loanApproved',
            businessKey: businessKey,
            variables: JSON.stringify(variables)
        }
        console.log('data', data);

        request(urls.nextStep, data)
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