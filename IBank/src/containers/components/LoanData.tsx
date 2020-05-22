import React, { useState, useContext, useEffect } from 'react'
import { Grid, GridRow, GridColumn, Input, Segment, Dropdown, FormGroup, Label, Container, Button, Table, TableHeaderCell, TableRow, TableCell, TableFooter } from 'semantic-ui-react'
import { CreditModel, defaultCreditModel } from '../../models/CreditModel'
import { request, useVariables, urls } from '../../api'
import { useParams } from 'react-router'
import { CompleteLoanData } from './CompleteLoanData'

export const InfoContext = React.createContext({

    processDefinitionId: '',
    processInstanceId: '',
    businessKey: '',
    creditModel: defaultCreditModel
});


export const LoanData = () => {

    const { processDefinitionId, processInstanceId, businessKey } = useParams();
    const { processInfo, creditModel, setCreditModel } = useVariables(String(processInstanceId));
    const [loanState, setLoanState] = useState(creditModel.loanInfo);
    const [programs, setPrograms] = useState([{ text: '', value: '' }]);
    const [grafic, setGrafic] = useState(creditModel.loanInfo.grafic);

    const defaultContext = {
        processDefinitionId: String(processDefinitionId),
        processInstanceId: String(processInstanceId),
        businessKey: String(businessKey),
        creditModel: creditModel
    }

    const loanOnChange = (e: any) => {
        const tState = { ...loanState, [e.target.name]: e.target.value };

        setLoanState(tState);
        setCreditModel({ ...creditModel, loanInfo: tState });
    }

    const loadPrograms = () => {

        request(urls.programs)
            .then(response => {
                setPrograms(response.data)
            })
    }

    const methods = [
        { text: 'Аннуитетный', value: 0 },
        { text: 'Дифференцированый', value: 1 }
    ]
    const getPaymentGrafic = () => {

        const data = {
            "methodCode": Number(loanState.paymentMethod.code),
            "amount": loanState.amount,
            "term": loanState.term
        }
        console.log(data);

        request(`${process.env.REACT_APP_BASE_SERVICE_URL}${process.env.REACT_APP_GRAFIC_URL}`, data)
            .then(response => {
                setGrafic(response.data);
                setCreditModel({ ...creditModel, loanInfo: { ...creditModel.loanInfo, grafic: response.data } })
            })

    }


    useEffect(() => {
        loadPrograms();
    }, [])

    return (
        <Segment placeholder inverted color='blue' secondary style={{ minHeight: 800 }}>
            <Container>
                <InfoContext.Provider value={defaultContext}>
                    <Segment placeholder color='blue' secondary>
                        <Segment size='massive' color='blue' tertiary>
                            <Grid>
                                <GridRow columns='4'>
                                    <GridColumn floated='left' textAlign='center' verticalAlign='middle'>
                                        Информация о займе
                                </GridColumn>
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
                                <GridColumn floated='right'>

                                </GridColumn>
                            </GridRow>
                            <GridRow >
                                <GridColumn>
                                    <FormGroup inline>
                                        <Label size='large'>Программа кредитования:</Label>
                                        <Dropdown selection
                                            options={programs}
                                            placeholder='Выбор...'
                                            onChange={(e, data) => {
                                                var item = programs.find((item) => item.value === data.value)
                                                creditModel.program = { code: String(item?.value), name: String(item?.text) };
                                                setCreditModel({ ...creditModel });
                                            }} />
                                    </FormGroup>
                                </GridColumn>
                            </GridRow>
                            {creditModel.program.code === '10010' &&
                                <>
                                    <GridRow columns='2'>
                                        <GridColumn>
                                            <FormGroup inline>
                                                <Label size='large'>Метод погашения:</Label>
                                                <Dropdown selection
                                                    options={methods}
                                                    placeholder='Выбор...'
                                                    onChange={(e, data) => {
                                                        var item = methods.find((item) => item.value === data.value)
                                                        const t = { ...loanState, paymentMethod: item ? { code: item.value.toString(), name: item.text.toString() } : { code: '', name: '' } }
                                                        setLoanState(t);
                                                        setCreditModel({ ...creditModel, loanInfo: t });
                                                    }} />
                                            </FormGroup>
                                        </GridColumn>
                                    </GridRow>
                                    {loanState.paymentMethod.code &&
                                        <><GridRow columns='2'>
                                            <GridColumn>
                                                <Input label='Сумма займа' name='amount' value={loanState.amount} onChange={loanOnChange} />
                                            </GridColumn>
                                            {/* <GridColumn>
                                                <Input label='Ежемесячный платеж' name='monthlyPayment' value={loanState.monthlyPayment} onChange={loanOnChange} />
                                            </GridColumn> */}
                                            <GridColumn>
                                                <Input label='Комиссия за выдачу займа' name='commIssueLoan' value={loanState.commIssueLoan} /*onChange={loanOnChange}*/ />
                                            </GridColumn>
                                        </GridRow>
                                            <GridRow columns='2'>
                                                <GridColumn>
                                                    <Input label='Срок займа (мес)' name='term' value={loanState.term} onChange={loanOnChange} />
                                                </GridColumn>
                                                <GridColumn>
                                                    <Input label='Дата платежа' name='payDay' value={loanState.payDay} onChange={loanOnChange} />
                                                </GridColumn>
                                            </GridRow>
                                            <GridRow columns='2'>
                                                <Button onClick={getPaymentGrafic}>
                                                    Расчитать
                                                </Button>
                                            </GridRow>
                                        </>
                                    }
                                </>
                            }
                        </Grid>
                        <Table celled>
                            {
                                grafic.monthlyPayments.length > 0 && <>
                                    <Table.Header>
                                        <Table.HeaderCell>Дата</Table.HeaderCell>
                                        <Table.HeaderCell>Ежемесячный платеж</Table.HeaderCell>
                                        <Table.HeaderCell>Проценты</Table.HeaderCell>
                                        <Table.HeaderCell>Тело займа</Table.HeaderCell>
                                        <Table.HeaderCell>Остаток</Table.HeaderCell>
                                    </Table.Header>
                                    {grafic.dates.map((item, i) => {
                                        return <Table.Row columns='4'>
                                            <Table.Cell>{item}</Table.Cell>
                                            <Table.Cell>{(grafic.monthlyPayments[i]).toFixed(2)}</Table.Cell>
                                            <Table.Cell>{(grafic.monthlyPercents[i].toFixed(2))}</Table.Cell>
                                            <Table.Cell>{(grafic.singlePayments[i].toFixed(2))}</Table.Cell>
                                            <Table.Cell>{(grafic.debts[i].toFixed(2))}</Table.Cell>
                                        </Table.Row>
                                    })
                                    }
                                    <TableFooter>
                                        <Table.Cell style={{font:'bold'}}>Итого</Table.Cell>
                                        <Table.Cell>{(grafic.total).toFixed(2)}</Table.Cell>
                                    </TableFooter>
                                </>}
                        </Table>
                        <CompleteLoanData />
                    </Segment>
                </InfoContext.Provider>
            </Container>
        </Segment>
    )
}