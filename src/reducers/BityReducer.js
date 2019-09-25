// @flow
import type { Action } from '../types/ReduxTypes'

export type BityState = {
  iban: string | null,
  bic_swift: string | null,
  bank_reference: string | null,
  owner: string | null,
  status: string | null,
  exchangeRates: Object,
  orderIds: Array<string>,
  orders: Array<Object>
}

export const initialState = {
  iban: null,
  bic_swift: null,
  bank_reference: null,
  owner: null,
  status: null,
  exchangeRates: {},
  orderIds: [],
  orders: []

}

export const BityReducer = (state: BityState = initialState, action: Action): BityState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      const array = state.orders
      array.push(action.data)
      return {...state, orders: array}
    case 'UPDATE_BANK_INFO':
      return {
        ...state,
        iban: action.data.iban,
        bic_swift: action.data.bic_swift,
        bank_reference: action.data.bank_reference,
        owner: action.data.owner,
        status: action.data.status,
        orderIds: action.data.orderIds,
        orders: action.data.orders
      }
    case 'LOCAL_DATA_INIT':
      return {
        ...state,
        iban: action.data.iban,
        bic_swift: action.data.bic_swift,
        bank_reference: action.data.bank_reference,
        owner: action.data.owner,
        status: action.data.status,
        orderIds: action.data.orderIds,
        orders: action.data.orders
      }
    default:
      return state
  }
}
