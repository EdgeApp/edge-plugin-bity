// @flow

import { APPROVED, INITIAL_KEYS, NOT_STARTED, TRANSACTION_AMOUNT_ROUTE } from "../constants";
import type { Dispatch, GetState } from '../types/ReduxTypes'

import type { LocalStorage } from '../types/AppTypes'

export const initInfo = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  if(state.Bity.status === APPROVED) {
    return
  }
  const localStore: LocalStorage = await window.edgeProvider.readData(INITIAL_KEYS)
  if (localStore.status === APPROVED) {
    dispatch({type: 'LOCAL_DATA_INIT', data: localStore})
    return
  }
  const newObject = {
    iban: null,
    bic_swift: null,
    bank_reference: null,
    owner: null,
    status: NOT_STARTED,
    orderIds: []
  }

  if (!localStore.status) {
    await window.edgeProvider.writeData({status: NOT_STARTED})
  }
  dispatch({type: 'LOCAL_DATA_INIT', data: newObject})
}

export const saveBankInfo = (iban:string, swift: string, owner: string, history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  const newObject = {
    iban: iban,
    bic_swift: swift,
    bank_reference: null,
    owner: owner,
    status: APPROVED
  }
  await window.edgeProvider.writeData(newObject)
  dispatch({type: 'LOCAL_DATA_INIT', data: newObject})
  history.push('/')
}
export const updateBankInfo = (iban:string, swift: string, owner: string, history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  const newObject = {
    iban: iban,
    bic_swift: swift,
    bank_reference: null,
    owner: owner,
  }
  await window.edgeProvider.writeData(newObject)
  dispatch({type: 'UPDATE_BANK_INFO', data: newObject})
  history.push(TRANSACTION_AMOUNT_ROUTE)
}
