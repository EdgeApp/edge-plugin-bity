// @flow
import type { Action } from '../types/ReduxTypes'

export type BityState = {
  iban: string | null,
  bic_swift: string | null,
  bank_reference: string | null,
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
  bank_reference: null,
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
    case 'LOCAL_DATA_INIT':
      return {
        ...state,
        iban: action.data.iban,
        bic_swift: action.data.bic_swift,
        bank_reference: action.data.bank_reference,
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
    default:
      return state
  }
}
