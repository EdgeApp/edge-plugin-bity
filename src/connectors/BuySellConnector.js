// @flow

import type { Dispatch, State } from '../types/ReduxTypes'
import { POWERED_BY_LOGO, TRANSACTION_AMOUNT_ROUTE } from '../constants'
import { getPreviousOrders, selectWallet } from '../actions/indexActions'

import { BuySellScene } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  const wallet = state.Wallet.wallet
  const isBuyDisabled = wallet === null
  const isSellDisabled = wallet === null
  return {
    wallet,
    transactions: state.Transaction.transactions,
    isBuyDisabled,
    isSellDisabled,
    partnerName: 'Bity',
    poweredBy: POWERED_BY_LOGO,
    isSellTransaction: window.edgeProvider.deepQuery.type === 'sell'
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSellClick: (history: Object) => {
    dispatch({type: 'SELECT_SELL'})
    history.push(TRANSACTION_AMOUNT_ROUTE)
  },
  selectWallet: () => dispatch(selectWallet()),
  onBuyClick: (history: Object) => {
    dispatch({type: 'SELECT_BUY'})
    history.push(TRANSACTION_AMOUNT_ROUTE)
  },
  getPreviousOrders: () => {
    window.edgeProvider.consoleLog('In the connector and getting orders')
    dispatch(getPreviousOrders())
  },
  openLink: (arg: string, history: Object) => {
    window.edgeProvider.consoleLog('trying to link' + arg)
    window.edgeProvider.openURL(arg)
  }
})
export const BuySellConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySellScene)
