// @flow
import type {
  Estimate,
  LocalStorage,
  Transaction,
  WalletDetails
} from '../types/AppTypes'
export type Action =
  | { type: 'LOCAL_DATA_INIT', data:  LocalStorage}
  | { type: 'WALLET_LOADED', data:  WalletDetails}
  | { type: 'ON_EXCHANGE_RATE', data: Object}
  | { type: 'ON_CHAINS_ADDED', data: Object}
  | { type: 'CHANGE_FIAT', data: string}
  | { type: 'ON_TRANSACTION_HISTORY', data: Array<Transaction>}
  | { type: 'SELECT_BUY'}
  | { type: 'SELECT_SELL'}
  | { type: 'CLEAR_ESTIMATE'}
  | { type: 'START_CONFIRM_TRANSACTION'}
  | { type: 'END_CONFIRM_TRANSACTION'}
  | { type: 'CLEAR_ESTIMATE'}
  | { type: 'ON_ESTIMATE', data: Estimate}
  | { type: 'ON_EURO_DIVIDER', data: string}
  | { type: 'UPDATE_BANK_INFO', data: LocalStorage}
  | { type: 'ADD_TRANSACTION', data: string}

