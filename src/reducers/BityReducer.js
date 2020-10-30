// @flow
import type { Action } from '../types/ReduxTypes'

export type BityState = {
  iban: string | null,
  bic_swift: string | null,
  owner: string | null,
  address1: string | null,
  address2: string | null,
  city: string | null,
  country: string | null,
  state: string | null,
  zip: string | null,
  status: string | null,
  exchangeRates: Object,
  orderIds: Array<string>,
  orders: Array<Object>
}

export const initialState = {
  iban: null,
  bic_swift: null,
  owner: null,
  address1: null,
  address2: null,
  city: null,
  country: null,
  state: null,
  zip: null,
  status: null,
  exchangeRates: {},
  orderIds: [],
  orders: []

}

export const BityReducer = (state: BityState = initialState, action: Action): BityState => {
  if (action.type === 'ADD_TRANSACTION') {
    return {...state, orders: [...state.orders, action.data]}
  }
  if (action.type === 'UPDATE_BANK_INFO' || action.type === 'LOCAL_DATA_INIT') {
    return {
      ...state,
      iban: action.data.iban,
      bic_swift: action.data.bic_swift,
      owner: action.data.owner,
      address1: action.data.address1,
      address2: action.data.address2,
      city: action.data.city,
      country: action.data.country,
      state: action.data.state,
      zip: action.data.zip,
      status: action.data.status,
      orderIds: action.data.orderIds,
      orders: action.data.orders
    }
  }
  return state
}
