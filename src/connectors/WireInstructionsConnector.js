// @flow
import type { Dispatch, State } from '../types/ReduxTypes'
import {POWERED_BY_LOGO, START_ROUTE} from '../constants/index'

import { WireInstructions } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'
import { showToast } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  const wireInformation = state.Transaction.wireInformation
  const buyOrder = state.Transaction.currentBuyOrder
  const message = []
  if(!wireInformation || !buyOrder) {
    return {
      poweredBy: POWERED_BY_LOGO,
      message,
      title: 'Bank transfer instructions'
    }
  }
  message.push('Please instruct your bank to do the following payment :')
  message.push('Amount: €' + buyOrder.input.amount)
  message.push('IBAN: ' + wireInformation.iban)
  message.push('Reference: ' + wireInformation.reference)
  message.push('Recipient: ' + wireInformation.recipient)
  message.push('')
  message.push('Additional Data:')
  message.push('Bank Address: ' + wireInformation.bank_address)
  message.push('Bank Code: ' + wireInformation.bank_code)
  message.push('Account: ' + wireInformation.account_number)
  message.push('SWIFT BIC: ' + wireInformation.swift_bic)

  return {
    poweredBy: POWERED_BY_LOGO,
    message,
    title: 'Bank transfer instructions'
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(START_ROUTE)
  },
  onCopy: (arg: string) => dispatch(showToast(arg))
})
export const WireInstructionsConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(WireInstructions)
