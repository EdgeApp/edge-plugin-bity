// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { POWERED_BY_LOGO } from '../constants/index'
import { TransactionConfirmationScreen } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'
import { placeOrder } from '../actions/indexActions'

const trimAccountNumber = (arg: string) => {
  return arg.substring(arg.length - 4, arg.length);
}

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
      buyOrSell: state.Transaction.type,
      poweredBy: POWERED_BY_LOGO,
      processing: false,
      termsOfService: '',
      link: '',
      linkText: ''
    }
  }
  const isSell = state.Transaction.type === 'sell'
  const cryptoAmount = isSell ? estimate.input.amount : estimate.output.amount
  const fiatAmount = isSell ? estimate.output.amount : estimate.input.amount
  const account = state.Bity.iban ? 'account ending in: ' + trimAccountNumber(state.Bity.iban) : ''
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
    poweredBy: POWERED_BY_LOGO,
    processing: state.Transaction.processing,
    termsOfService: 'By creating this order, you are agreeing to Bity\'s terms of service. The order will be executed by Bity. ',
    link: 'https://bity.com/legal/',
    linkText: 'Terms of Service'
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => dispatch(placeOrder(history))
})
export const TransactionConfirmationConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionConfirmationScreen)
