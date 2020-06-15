import React, { SyntheticEvent } from "react";
import { Segment, Container, Grid, GridRow, GridColumn, Input, Button } from "semantic-ui-react";
import { request, RedirectTo } from "../../api";

interface IProps {
    setAuth: any
}
interface IState {
    id: number,
    login: string,
    password: string
}
export class Login extends React.Component<IProps, IState> {
    login: any;
    password: any;

    constructor(props: any) {
        super(props);
        this.state = { id: 0, login: '', password: '' };
    }

    checkUser = () => {

        var url = `${process.env.REACT_APP_SERVICES_URL}${process.env.REACT_APP_SERVICES_AUTH}${this.state.login}/${this.state.password}`;
        request(url)
            .then(response => {
                if (response.data?.userId > 0) {
                    sessionStorage['userId'] = response.data.userId;
                    sessionStorage['login'] = response.data.login;
                    this.props.setAuth(true);
                }
            })
    }
    render() {
        return (
            <Segment placeholder inverted color='blue' secondary style={{ minHeight: 800 }}>
                <Container>
                    {/* <InfoContext.Provider value={defaultContext}> */}
                    <Segment placeholder color='blue' secondary>
                        <Grid>
                            <GridRow>
                                <Segment size='massive' tertiary fluid>
                                    Вход
                                </Segment>
                            </GridRow>
                            <GridRow >
                                <GridColumn>Login</GridColumn>
                                <GridColumn floated='left'>
                                    <Input name='login' value={this.state.login} onChange={(e) => {
                                        this.setState({ login: e.target.value });
                                    }}></Input>
                                </GridColumn>
                            </GridRow>
                            <GridRow>
                                <GridColumn>Password</GridColumn>
                                <GridColumn floated='left'>
                                    <Input name='password' value={this.state.password} onChange={(e) => {
                                        this.setState({ password: e.target.value });
                                    }}></Input>
                                </GridColumn>
                            </GridRow>
                            <GridRow>
                                <GridColumn></GridColumn>
                                <GridColumn floated='left'>
                                    <Button onClick={this.checkUser} primary>Войти</Button>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Segment>
                    {/* </InfoContext.Provider> */}
                </Container>
            </Segment>
        )
    }
}