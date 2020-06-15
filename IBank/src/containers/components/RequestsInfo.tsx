import React from 'react'
import { Grid, GridRow, Segment, GridColumn, Button, Table, TableHeader, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';
import { IRequestInfo, IRequest } from '../../models/RequestInfo';

interface IProps {
    requestInfo: IRequest[],
    onChange: any
}

export class RequestsInfo extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <GridRow>
                    <Segment size='massive' tertiary fluid>
                        Информация о заявках
                    </Segment>
                </GridRow>
                <GridRow columns='3'>
                    <Table>
                        <TableHeader>
                            <TableHeaderCell>№</TableHeaderCell>
                            <TableHeaderCell>Номер заявки</TableHeaderCell>
                            <TableHeaderCell>ФИО клиента</TableHeaderCell>
                            <TableHeaderCell>Менеджер</TableHeaderCell>
                        </TableHeader>
                        {this.props.requestInfo.map((item, index) => <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.requestId}</TableCell>
                            <TableCell>{item.clientName}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <Button onClick={(e) => this.props.onChange(index)} color='red'>Удалить</Button>
                        </TableRow>)}
                    </Table>
                </GridRow>
            </Grid>
        )
    }
}