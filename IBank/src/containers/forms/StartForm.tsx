import React from 'react'
import { Segment, Container, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react'
import { RequestsInfo } from '../components/RequestsInfo'
import { CompleteStartForm } from '../components/CompleteStartForm'
import { ProcessInfo, defaultProcessInfo } from '../../models/ProcessInfo'
import { IRequestInfo, IRequest } from '../../models/RequestInfo'
import { Counter } from '../components/Counter'

export const InfoContext = React.createContext({

    processInfo: defaultProcessInfo,
    changeProcessInfo: () => { }
});

interface IProps {

}

interface IState {
    requestsInfo: IRequest[]
}


export class StartForm extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        let requests = [{ requestId: '111', clientName: 'Бондаренко А.', userName: 'some manager1' },
                        { requestId: '222', clientName: 'Мацукевич В.', userName: 'some manager2' },
                        { requestId: '333', clientName: 'Джумашев И.', userName: 'some manager3' }
        ];
        this.state = { requestsInfo: requests };

        this.deleteRequest = this.deleteRequest.bind(this);
    }

    deleteRequest(index: number) {        
        let state = this.state.requestsInfo;
        delete state[index];
        this.setState({
            requestsInfo: state
        });
    }

    render() {
        return (
            <Segment placeholder inverted color='blue' secondary style={{ minHeight: 800 }}>
                <Container>
                    {/* <InfoContext.Provider value={defaultContext}> */}
                    <Segment placeholder color='blue' secondary>
                        <RequestsInfo requestInfo={this.state.requestsInfo} onChange={this.deleteRequest} />
                        <CompleteStartForm />
                    </Segment>
                    {/* </InfoContext.Provider> */}
                </Container>
                <Counter />
            </Segment>
        )
    }
}