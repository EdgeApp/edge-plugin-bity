// @flow

import type { BuyOrder, Estimate, Transaction, WireInformation } from '../types/AppTypes'

import type { Action } from '../types/ReduxTypes'

export type TransactionState = {
  transactions:Array<Transaction>,
  type: string | null,
  cryptoAmount: string | null,
  fiatAmount: string | null,
  estimate: Estimate | null,
  processing: boolean,
  wireInformation: WireInformation | null,
  currentBuyOrder: BuyOrder | null

}

export const initialState = {
  transactions: [],
  type: null,
  cryptoAmount: null,
  fiatAmount: null,
  estimate: null,
  processing: false,
  wireInformation: null,
  currentBuyOrder: null

}

export const TransactionReducer = (state: TransactionState = initialState, action: Action): TransactionState => {
  switch (action.type) {
    case 'ADD_WIRE_INFO':
    return {...state, wireInformation: action.data.payment_details, currentBuyOrder: action.data, processing: false}
    case 'START_CONFIRM_TRANSACTION':
      return {...state, processing: true}
    case 'END_CONFIRM_TRANSACTION':
      return {...state, processing: false}
    case 'ON_ESTIMATE':
      return {...state, estimate: action.data}
    case 'CLEAR_ESTIMATE':
      return {...state, estimate: null}
    case 'CHANGE_FIAT':
      return {...state, fiatAmount: action.data}
    case 'SELECT_BUY':
      return {...state, type: 'buy'}
    case 'SELECT_SELL':
      return {...state, type: 'sell'}
    case 'ON_TRANSACTION_HISTORY':
      return {...state, transactions: action.data}
    default:
      return state
  }
}
