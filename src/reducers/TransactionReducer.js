// @flow

import type { Estimate, Transaction } from '../types/AppTypes'

import type { Action } from '../types/ReduxTypes'

export type TransactionState = {
  transactions:Array<Transaction>,
  type: string | null,
  cryptoAmount: string | null,
  fiatAmount: string | null,
  estimate: Estimate | null,
  processing: boolean

}

export const initialState = {
  transactions: [],
  type: null,
  cryptoAmount: null,
  fiatAmount: null,
  estimate: null,
  processing: false
}

export const TransactionReducer = (state: TransactionState = initialState, action: Action): TransactionState => {
  switch (action.type) {
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
