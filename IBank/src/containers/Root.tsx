import React from 'react'
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import { FormDefault } from './forms/Form.Default';
import { StartForm } from './forms/StartForm';
import { ClientData } from './components/ClientData';
import { FormExecutor } from '../api/FormExecutor';
import { LoanData } from './components/LoanData';
import { LoanApproved } from './components/LoanApproved';
//import { Switch, Route } from 'react-router-dom'

const history = createBrowserHistory();
const Root = () => {

    return (
        <Router history={history}>
            <Route exact path="/" component={/*FormDefault*/StartForm} />
            <Route path="/startProcess" component={StartForm} />
            <Route path="/clientData/:businessKey/:processDefinitionId/:processInstanceId" component={ClientData} />
            <Route path="/loanData/:businessKey/:processDefinitionId/:processInstanceId" component={LoanData} />
            <Route path="/loanApproved/:businessKey/:processDefinitionId/:processInstanceId" component={LoanApproved} />
            <Route path="/formExecutor/:instanceId/:businessKey" component={FormExecutor} />
        </Router>
    )
}

export default Root;