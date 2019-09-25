// @flow
import {
  BANK_CONNECT_ROUTE,
  EDIT_BANK_CONNECT_ROUTE,
  START_ROUTE,
  TRANSACTION_AMOUNT_ROUTE,
  TRANSACTION_CONFIRM_ROUTE,
  TRANSACTION_SUCCESS_ROUTE,
  WIRE_INSTRUCTIONS_ROUTE
} from '../constants/index'
import React, { Component } from 'react'
import { Route, HashRouter as Router } from 'react-router-dom'

import { BankAccountConnector } from '../connectors/BankAccountConnector.js'
import { EditBankAccountConnector } from '../connectors/EditBankAccountConnector.js'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { StartSceneConnector } from '../connectors/StartSceneConnector.js'
import { TransactionAmountConnector } from '../connectors/TransactionAmountConnector.js'
import { TransactionConfirmationConnector } from '../connectors/TransactionConfirmationConnector.js'
import { TransactionSuccessConnector } from '../connectors/TransactionSuccessConnector.js'
import { WireInstructionsConnector } from '../connectors/WireInstructionsConnector.js'
import { createMuiTheme } from '@material-ui/core/styles'
import history from '../history/history';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4876a4',
      main: '#0e4b75',
      dark: '#002449',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Source Sans Pro', sans-serif !important"
  },
  shadows: ['none']
})

export const routes = [{
  path: START_ROUTE,
  main: StartSceneConnector,
  exact: true
}, {
  path: BANK_CONNECT_ROUTE,
  main: BankAccountConnector,
  exact: true
},
{
  path: EDIT_BANK_CONNECT_ROUTE,
  main: EditBankAccountConnector,
  exact: true
},
{
  path: TRANSACTION_AMOUNT_ROUTE,
  main: TransactionAmountConnector,
  exact: true
}, {
  path: TRANSACTION_CONFIRM_ROUTE,
  main: TransactionConfirmationConnector,
  exact: true
}, {
  path: TRANSACTION_SUCCESS_ROUTE,
  main: TransactionSuccessConnector,
  exact: true
}, {
  path: WIRE_INSTRUCTIONS_ROUTE,
  main: WireInstructionsConnector,
  exact: true
}/* , {
  path: PHONE_ROUTE,
  main: PhoneConnector,
  exact: true
}, {
  path: SIGNATURE_ROUTE,
  main: SignatureConnector,
  exact: true
}, {
  path: SOCIAL_ROUTE,
  main: SocialConnector,
  exact: true
}, {
  path: THANK_YOU_ROUTE,
  main: ThankYouConnector,
  exact: true
} */]

type AppProps = {}

class Navigation extends Component<AppProps> {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default Navigation
