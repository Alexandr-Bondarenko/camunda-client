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
import { useParams } from 'react-router';
import { useVariables } from '../../api';

export const LoanApproved = () => {
    const { processDefinitionId, processInstanceId, businessKey } = useParams();
    const { processInfo, clientInfo, setClientInfo } = useVariables(String(processInstanceId));


    return (
        <Segment placeholder inverted color='blue' secondary style={{ minHeight: 800 }}>
            <Container>
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
                    </Grid>
                </Segment>
                <Grid>
                    <GridRow columns='3'>
                        <GridColumn></GridColumn>
                        <GridColumn><h2>Пацан к успеху пришел!</h2></GridColumn>
                        <GridColumn></GridColumn>
                    </GridRow>
                </Grid>
            </Container>
        </Segment>
    )
}