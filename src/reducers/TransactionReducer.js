// @flow
import type { Action } from '../types/ReduxTypes'
import type { Transaction } from '../types/AppTypes'

export type TransactionState = {
  transactions:Array<Transaction>,
  type: string | null
}

export const initialState = {
  transactions: [],
  type: null
}

export const TransactionReducer = (state: TransactionState = initialState, action: Action): TransactionState => {
  switch (action.type) {
    case 'ON_TRANSACTION_HISTORY':
      return {...state, transactions: action.data}
    default:
      return state
  }
}
