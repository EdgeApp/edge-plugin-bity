// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { POWERED_BY_LOGO } from '../constants/index'
import { TransactionAmountScreen } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'
import { getEstimate } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  const bankName = state.Bity.iban ? 'accnt:' + state.Bity.iban : ''
  return {
    wallet: state.Wallet.wallet,
    exchangeRatesFrom: 0,
    useExchangeRate: false,
    fiatSymbol: '€',
    buyOrSell: state.Transaction.type,
    cryptoAmount: state.Transaction.cryptoAmount,
    fiatAmount: state.Transaction.fiatAmount,
    bankName,
    poweredBy: POWERED_BY_LOGO
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getExchangeRate: () => {
    // dispatch(getExchangeRate())
  },
  confirmQuote: (crypto: string, fiat: string,  history: Object) => dispatch(getEstimate(fiat, history)),
  changeFiat: (amount: string, exchangeRate: number) => dispatch({type: 'CHANGE_FIAT', data: amount})
})
export const TransactionAmountConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionAmountScreen)