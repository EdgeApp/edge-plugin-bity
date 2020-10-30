// @flow

import { APPROVED, INITIAL_KEYS, NOT_STARTED, TRANSACTION_AMOUNT_ROUTE } from "../constants";
import type { Dispatch, GetState } from '../types/ReduxTypes'
import { isValidBIC, isValidIBAN } from 'ibantools'
import { asObject, asString, asOptional } from 'cleaners'

import type { LocalStorage } from '../types/AppTypes'

const asAddressInfo = asObject({
  address1: asString,
  address2: asOptional(asString),
  city: asString,
  country: asString,
  state: asString,
  zip: asString
})

export const initInfo = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  if(state.Bity.status === APPROVED) {
    return
  }
  const localStore: LocalStorage = await window.edgeProvider.readData(INITIAL_KEYS)
  if (localStore.status === APPROVED) {
    window.edgeProvider.consoleLog('localStore')
    window.edgeProvider.consoleLog(localStore)
    if(!localStore.orderIds) {
      localStore.orderIds = []
      await window.edgeProvider.writeData({orderIds: []})
    }
    if(!localStore.orders) {
      localStore.orders = []
      await window.edgeProvider.writeData({orders: []})
    }
    let addressInfo = {
      address1: null,
      address2: null,
      city: null,
      country: null,
      state: null,
      zip: null
    }
    try {
      addressInfo = asAddressInfo(localStore)
    } catch (e) {
      // Failure OK
    }
    Object.assign(localStore, addressInfo)
    window.edgeProvider.consoleLog('Local Object')
    window.edgeProvider.consoleLog(localStore)
    dispatch({type: 'LOCAL_DATA_INIT', data: localStore})
    // create transactions
    const transactions = []
    for(let i = 0; i < localStore.orders.length; i++) {
      const order = localStore.orders[i]
      const type = order.input.type === 'bank_account' ? 'Buy' : 'Sell'
      const sourceName = type === 'Buy' ? order.input.iban : order.input.crypto_address
      const destName = type === 'Sell' ? order.input.iban : order.input.crypto_address
      const transaction = {
        id: order.id,
        type,
        closedAt: new Date(order.timestamp_created),
        createdAt: new Date(order.timestamp_created),
        dest: 'dest',
        sourceCurrency: order.input.currency,
        destCurrency: order.output.currency,
        sourceAmount: order.input.amount,
        destAmount: order.output.amount,
        sourceName,
        destName,
        link: 'https://bity.com/exchange/#/order/' + order.id
      }
      transactions.push(transaction)
    }
    transactions.reverse()
    dispatch({type: 'ON_TRANSACTION_HISTORY', data: transactions})
    return
  }
  const newObject = {
    iban: null,
    bic_swift: null,
    owner: null,
    status: NOT_STARTED,
    orderIds: [],
    orders: []
  }

  if (!localStore.status) {
    await window.edgeProvider.writeData({status: NOT_STARTED})
  }
  dispatch({type: 'LOCAL_DATA_INIT', data: newObject})
}

export const saveBankInfo = (iban:string, swift: string, owner: string, address1: string, address2: string, city: string, country: string, state: string, zip: string, history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  // validate bank info.
  // if invalid throw error

  if(!isValidBIC(swift)) {
    window.edgeProvider.displayError('Invalid swift')
    return
  }
  if(!isValidIBAN(iban)) {
    window.edgeProvider.displayError('Invalid IBAN')
    return
  }

  const newObject = {
    iban: iban,
    bic_swift: swift,
    owner: owner,
    address1,
    address2,
    city,
    country,
    state,
    zip,
    status: APPROVED
  }
  await window.edgeProvider.writeData(newObject)
  dispatch({type: 'LOCAL_DATA_INIT', data: newObject})
  history.push('/')
}
export const updateBankInfo = (iban:string, swift: string, owner: string, address1: string, address2: string, city: string, country: string, state: string, zip: string, history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  const newObject = {
    iban: iban,
    bic_swift: swift,
    owner: owner,
    address1,
    address2,
    city,
    country,
    state,
    zip
  }
  await window.edgeProvider.writeData(newObject)
  dispatch({type: 'UPDATE_BANK_INFO', data: newObject})
  history.push(TRANSACTION_AMOUNT_ROUTE)
}
