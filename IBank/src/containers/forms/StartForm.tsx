import React from 'react'
import { Segment, Container, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react'
import { useVariables } from '../../api'
import { CompleteStartForm } from '../components/CompleteStartForm'
import { ProcessInfo, defaultProcessInfo } from '../../models/ProcessInfo'

export const InfoContext = React.createContext({

    processInfo: defaultProcessInfo,
    changeProcessInfo: (model: ProcessInfo) => { }
});

export const StartForm = () => {

    // const { processInfo, setProcessInfo } = useVariables('00001')

    // const defaultContext = {
    //     processInfo: processInfo,
    //     changeProcessInfo: (model: ProcessInfo) => {
    //         setProcessInfo(model);
    //     }
    // }

    return (
        <Segment placeholder inverted color='blue' secondary style={{ minHeight: 800 }}>
            <Container>
                {/* <InfoContext.Provider value={defaultContext}> */}
                <Segment placeholder color='blue' secondary>
                    <Grid>
                        <GridRow>
                            <Segment size='massive' tertiary fluid>
                                Информация о заявках
                            </Segment>
                        </GridRow>
                        <GridRow columns='3'>
                            <GridColumn>
                                Номер заявки
                            </GridColumn>
                            <GridColumn>
                                ФИО клиента
                            </GridColumn>
                            <GridColumn>
                                Действие <br />
                                <Button color='red'>Удалить</Button>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                    <CompleteStartForm />
                </Segment>
                {/* </InfoContext.Provider> */}
            </Container>
        </Segment>
    )
}
//export default StartForm