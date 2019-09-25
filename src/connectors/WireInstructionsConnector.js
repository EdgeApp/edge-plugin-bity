// @flow
import type { Dispatch, State } from '../types/ReduxTypes'
import {POWERED_BY_LOGO, START_ROUTE} from '../constants/index'

import { WireInstructions } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  const wireInformation = state.Transaction.wireInformation
  const message = []
  if(!wireInformation) {
    return {
      poweredBy: POWERED_BY_LOGO,
      message
    }
  }
  message.push('To complete your purchase. Send funds to Bity.  You must include the reference')
  message.push('Recipient: ' + wireInformation.recipient)
  message.push('Bank Address: ' + wireInformation.bank_address)
  message.push('Bank Code: ' + wireInformation.bank_code)
  message.push('Account: ' + wireInformation.account)
  message.push('IBAN: ' + wireInformation.iban)
  message.push('SWIFT BIC: ' + wireInformation.swift_bic)
  message.push('Reference: ' + wireInformation.reference)
  return {
    poweredBy: POWERED_BY_LOGO,
    message
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(START_ROUTE)
  }
})
export const WireInstructionsConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(WireInstructions)
