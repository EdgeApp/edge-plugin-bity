// @flow
import type { Dispatch, State } from '../types/ReduxTypes'
import {POWERED_BY_LOGO, TRANSACTION_SUCCESS_ROUTE} from '../constants/index'

import { TransactionConfirmationScreen } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'
import { placeOrder } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  const wallet = state.Wallet.wallet
  const estimate = state.Transaction.estimate
  if(!estimate){
    return {
      wallet,
      isSell: false,
      cryptoAmount: null,
      fiatAmount: null,
      fiatSymbol: '€',
      withdrawFrom: null,
      depositTo: null,
      fees: null,
      total: null,
      onOfCurrencyCodeInFiat: null,
      buyOrSell: null,
      poweredBy: POWERED_BY_LOGO
    }
  }
  const isSell = state.Transaction.type === 'sell'
  const cryptoAmount = isSell ? estimate.input.amount : estimate.output.amount
  const fiatAmount = isSell ? estimate.output.amount : estimate.input.amount
  const account = state.Bity.iban ? 'accnt: ' + state.Bity.iban : ''
  const walletName = wallet && wallet.name ? wallet.name : ''
  const withdrawFrom = isSell && wallet ? walletName : account
  const depositTo = isSell ? account : walletName
  const total = isSell ? cryptoAmount : fiatAmount

  return {
    wallet,
    isSell,
    cryptoAmount,
    fiatAmount,
    withdrawFrom,
    fiatSymbol: '€',
    depositTo,
    fees: null,
    total,
    onOfCurrencyCodeInFiat: '€' + estimate.pricePerBTC,
    buyOrSell: state.Transaction.type,
    poweredBy: POWERED_BY_LOGO
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => dispatch(placeOrder(history))
})
export const TransactionConfirmationConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionConfirmationScreen)
