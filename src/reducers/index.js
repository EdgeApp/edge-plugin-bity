// @flow
import { BityReducer as Bity, type BityState } from './BityReducer.js'
import { type Reducer, combineReducers } from 'redux'
import { TransactionReducer as Transaction, type TransactionState } from './TransactionReducer.js'
import { WalletReducer as Wallet, type WalletState } from './WalletReducer.js'

import { type Action } from '../types/ReduxTypes.js'

export type RootState = {
  +Wallet: WalletState,
  +Transaction: TransactionState,
  +Bity: BityState
}

export const rootReducer: Reducer<RootState, Action> = combineReducers({
  Wallet,
  Transaction,
  Bity
})
