// @flow
import { APPROVED, INITIAL_KEYS, NOT_STARTED } from "../constants";
import type { Dispatch, GetState } from '../types/ReduxTypes'
import { apiEstimate, currentFiatDivider } from '../api/api'

import {TRANSACTION_CONFIRM_ROUTE} from '../constants/index'

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
    // window.edgeProvider.consoleLog('fiatDividerEst -s')
    // window.edgeProvider.consoleLog(fiatDividerEst)
    // window.edgeProvider.consoleLog('fiatDividerEst - f')
    const fiatDivider = fiatDividerEst.output.amount
    // window.edgeProvider.consoleLog('fiatDivider -- ' + fiatDividerEst.output.amount)
    const inputCurrency = isSell ? 'BTC' : 'EUR'
    // window.edgeProvider.consoleLog('inputCurrency -- ' + inputCurrency)
    const outputCurrency = inputCurrency === 'BTC' ? 'EUR' : 'BTC'
    // window.edgeProvider.consoleLog('outputCurrency -- ' + outputCurrency)
    const math = Math.round( Number(fiat) / Number(fiatDivider) * 100000000) / 100000000
    // window.edgeProvider.consoleLog('math -- ' + math.toString())
    const amount = isSell ? math.toString() : fiat
    // window.edgeProvider.consoleLog('amount -- ' + amount)
    const input = {
      currency: inputCurrency,
      amount: amount
    }
    const output = {
      currency: outputCurrency
    }
    const payload = {input, output}
    //window.edgeProvider.consoleLog('payload -s ')
   // window.edgeProvider.consoleLog(payload)
    //window.edgeProvider.consoleLog('payload -f ')
    const estimate = await apiEstimate(payload)
    estimate.pricePerBTC = fiatDividerEst.output.amount
    window.edgeProvider.consoleLog('ESTIMATE')
    window.edgeProvider.consoleLog(estimate)
    dispatch({type: 'ON_ESTIMATE', data: estimate})
  } catch (e) {
    window.edgeProvider.consoleLog('ERROR')
    window.edgeProvider.consoleLog(e)
  }

  // format object to get quote
  // call api
  // get back quote
  // set up
  //
  /* const input = {
    currency: 'EUR',
    amount: fiat
  }
  const output = {
    currency: 'BTC'
  } */
  /* const input = {
    currency: 'BTC',
    amount: '1.00000000'
  }
  const output = {
    currency: 'EUR'
  }
  const payload = {input, output}
  try {
    const estimate = await apiEstimate(payload)
    window.edgeProvider.consoleLog('ESTIMATE')
    window.edgeProvider.consoleLog(estimate)
    dispatch({type: 'ON_ESTIMATE', data: estimate})

    // load up the estimate into redux -
  } catch (e) {
    window.edgeProvider.consoleLog('ERROR')
    window.edgeProvider.consoleLog(e)
  } */
}
