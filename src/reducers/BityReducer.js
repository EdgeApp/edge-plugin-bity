// @flow
import type { Action } from '../types/ReduxTypes'

export type BityState = {
  iban: string | null,
  bic_swift: string | null,
  bank_reference: string | null,
  status: string | null,
  exchangeRates: Object,
  cryptoAmount: string | null,
  fiatAmount: string | null
}

export const initialState = {
  iban: null,
  bic_swift: null,
  bank_reference: null,
  status: null,
  exchangeRates: {},
  cryptoAmount: null,
  fiatAmount: null
}

export const BityReducer = (state: BityState = initialState, action: Action): BityState => {
  switch (action.type) {
   /*  case 'SET_AMOUNTS':
      return {...state, cryptoAmount: action.data.cryptoAmount, fiatAmount: action.data.fiatAmount}
 */
    case 'LOCAL_DATA_INIT':
      return {
        ...state,
        iban: action.data.iban,
        bic_swift: action.data.bic_swift,
        bank_reference: action.data.bank_reference,
        status: action.data.status
      }
   /*  case 'ON_EXCHANGE_RATE':
      return {...state , exchangeRates: action.data} */
    default:
      // window.edgeProvider.consoleLog('Wyre Reducer Default')
      return state
  }
}
