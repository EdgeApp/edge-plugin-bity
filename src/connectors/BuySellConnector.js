// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { BuySellScene } from 'edge-plugin-screens-and-components'
import { TRANSACTION_AMOUNT_ROUTE } from '../constants'
import { connect } from 'react-redux'
import { selectWallet } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  const wallet = state.Wallet.wallet
  const isBuyDisabled = wallet === null
  const isSellDisabled = wallet === null
  return {
    wallet,
    transactions: state.Transactions.transactions,
    isBuyDisabled,
    isSellDisabled,
    partnerName: 'Bity',
    poweredBy: {
      email: 'support@bity.com',
      logo: require('../assets/poweredByLogo.png')
    }
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSellClick: (history: Object) => {
    dispatch({type: 'SELECT_BUY'})
    history.push(TRANSACTION_AMOUNT_ROUTE)
  },
  selectWallet: () => dispatch(selectWallet()),
  onBuyClick: (history: Object) => {
    dispatch({type: 'SELECT_SELL'})
    history.push(TRANSACTION_AMOUNT_ROUTE)
  }
})
export const BuySellConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySellScene)
