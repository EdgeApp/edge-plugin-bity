// @flow
import { APPROVED, INITIAL_KEYS, NOT_STARTED } from "../constants";
import type { Dispatch, GetState } from '../types/ReduxTypes'
import {TRANSACTION_CONFIRM_ROUTE, TRANSACTION_SUCCESS_ROUTE} from '../constants/index'
import { apiEstimate, currentFiatDivider } from '../api/api'

export const placeOrder = (history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  window.edgeProvider.consoleLog('Call the boss')
  const signedTransaction = await window.edgeProvider.signMessage('message')
  window.edgeProvider.consoleLog('signedTransaction')
  window.edgeProvider.consoleLog(signedTransaction)

  history.push(TRANSACTION_SUCCESS_ROUTE)
}

export const getEstimate = (fiat: string, history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  // clear any existing estimate
  dispatch({type: 'CLEAR_ESTIMATE'})
  history.push(TRANSACTION_CONFIRM_ROUTE)
  const state = getState()
  const isSell = state.Transaction.type === 'sell'
  try {
    const inputFix = {
      currency: 'BTC',
      amount: '1.00000000'
    }
    const outputFix = {
      currency: 'EUR'
    }
    const payload1 = {input: inputFix, output: outputFix}
    const fiatDividerEst = await apiEstimate(payload1)
    const fiatDivider = fiatDividerEst.output.amount
    const inputCurrency = isSell ? 'BTC' : 'EUR'
    const outputCurrency = inputCurrency === 'BTC' ? 'EUR' : 'BTC'
    const math = Math.round( Number(fiat) / Number(fiatDivider) * 100000000) / 100000000
    const amount = isSell ? math.toString() : fiat
    const input = {
      currency: inputCurrency,
      amount: amount
    }
    const output = {
      currency: outputCurrency
    }
    const payload = {input, output}
    const estimate = await apiEstimate(payload)
    estimate.pricePerBTC = fiatDividerEst.output.amount
    dispatch({type: 'ON_ESTIMATE', data: estimate})
  } catch (e) {
    window.edgeProvider.consoleLog('ERROR')
    window.edgeProvider.consoleLog(e)
  }
}
