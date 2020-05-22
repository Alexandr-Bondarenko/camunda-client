import React, { useState, useContext } from 'react'
import {
    Button,
    Segment,
    Input,
    Grid,
    GridRow,
    GridColumn,
    Container,
    Label
} from 'semantic-ui-react'
import { request, useVariables, urls } from '../../api'
import { ClientInfo, defaultClientInfo } from '../../models/ClientModels';
import { CreditModel, defaultCreditModel } from '../../models/CreditModel';
import { useParams } from 'react-router';
import { CompleteStartForm } from './CompleteStartForm';
import { CompleteClientData } from './CompleteClientData';

export const InfoContext = React.createContext({

    processDefinitionId: '',
    processInstanceId: '',
    businessKey: '',
    clientInfo: defaultClientInfo
});

interface IProps {
    state: CreditModel,
    setState: any
}

export const ClientData = () => {
    const { processDefinitionId, processInstanceId, businessKey } = useParams();
    const { processInfo, clientInfo, setClientInfo } = useVariables(String(processInstanceId));
    const [iin, setIin] = useState('');
    const [stateClientInfo, setStateClientInfo] = useState<ClientInfo>(clientInfo);

    const defaultContext = {
        processDefinitionId: String(processDefinitionId),
        processInstanceId: String(processInstanceId),
        businessKey: String(businessKey),
        clientInfo: stateClientInfo
    }




    const searchClient = (iin: string) => {

        request(urls.clientInfo + iin)
            .then((response) => {
                if (response.code == 0 && response.data) {
                    setStateClientInfo(response.data);
                }
                else {
                    setStateClientInfo({ ...defaultClientInfo })
                }
            })
    }

    return (

        <Segment placeholder inverted color='blue' secondary style={{ minHeight: 800 }}>
            <Container>
                <InfoContext.Provider value={defaultContext}>
                    <Segment placeholder color='blue' secondary >
                        <Segment size='massive' color='blue' secondary>
                            Информация о клиенте
                </Segment>
                        <Grid>
                            <GridRow columns='3'>
                                <GridColumn floated='right'>
                                    <Segment>
                                        <span>Номер заявки: {businessKey}</span><br />
                                        <span>Дата: {processInfo.startDate}</span><br />
                                        <span>Время: {processInfo.startTime}</span><br />
                                    </Segment>
                                </GridColumn>
                            </GridRow>
                            <GridRow columns='3'>
                                <GridColumn></GridColumn>
                                <GridColumn>
                                    <Input onChange={(e) => {
                                        setIin(e.target.value);
                                    }} fluid />
                                    <Button onClick={() => searchClient(iin)} primary fluid>Поиск клиента</Button>
                                </GridColumn>
                                <GridColumn></GridColumn>
                            </GridRow>
                            {
                                stateClientInfo.iin && <>
                                    <GridRow columns='2'>
                                        <GridColumn>
                                            <Input label='ИИН' value={stateClientInfo.iin} />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow columns='3'>
                                        <GridColumn>
                                            <Input label='Фамилия' value={stateClientInfo.lastName} />
                                        </GridColumn>
                                        <GridColumn>
                                            <Input label='Имя' value={stateClientInfo.firstName} />
                                        </GridColumn>
                                        <GridColumn>
                                            <Input label='Отчество' value={stateClientInfo.middleName} />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow columns='3'>
                                        <GridColumn>
                                            <Input label='Номер документа' value={stateClientInfo.docNumber} />
                                        </GridColumn>
                                        <GridColumn>
                                            <Input label='Дата выдачи' value={stateClientInfo.docIssueDate} />
                                        </GridColumn>
                                        <GridColumn>
                                            <Input label='Дата окончания' value={stateClientInfo.docExpireDate} />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow columns='3'>
                                        <GridColumn>
                                            <Input label='Дата рождения' value={stateClientInfo.birthDate} />
                                        </GridColumn>
                                        <GridColumn>
                                            <Input label='Семейное положение' value={stateClientInfo.maritalStatus === 1 ? 'Женат/замужем' : 'Холост/незамужем'} />
                                        </GridColumn>
                                    </GridRow>
                                </>
                            }
                        </Grid>
                        <CompleteClientData />
                    </Segment>
                </InfoContext.Provider>
            </Container>
        </Segment>
    )
}