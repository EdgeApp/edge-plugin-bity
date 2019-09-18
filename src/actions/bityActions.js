// @flow
import { APPROVED, INITIAL_KEYS, NOT_STARTED } from '../constants';
import type { Dispatch, GetState } from '../types/ReduxTypes'
import {TRANSACTION_CONFIRM_ROUTE, TRANSACTION_SUCCESS_ROUTE} from '../constants/index'
import { apiEstimate, apiOrder, apiSendSignedTransaction, currentFiatDivider } from '../api/api'

export const placeOrder = (history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  // lets get the actual order ->
  const state = getState()
  const estimate = state.Transaction.estimate
  const isSell = state.Transaction.type === 'sell'
  const cryptoAmount = isSell ? estimate.input.amount : estimate.output.amount
  const fiatAmount = isSell ? estimate.output.amount : estimate.input.amount

  const address = state.Wallet.wallet ? state.Wallet.wallet.receiveAddress.publicAddress : ''
  window.edgeProvider.consoleLog('Address ' + address)
  // state.Transaction.type
  /* const orderObject = {
    input: {
      amount: state.Transaction.cryptoAmount,
      currency: 'BTC',
      type: 'crypto_address',
      crypto_address: address
    },
    output: {
      iban: '871509600',// state.Bity.bic_swift,
      bic_swift: 'COBADEFF', //state.Bity.bic_swift,
      currency: 'EUR',
      type: 'bank_account'
    }
  } */
  const orderObject = {
    output: {
      currency: 'BTC',
      type: 'crypto_address',
      crypto_address: address // '0xf35074bbd0a9aee46f4ea137971feec024ab7048'
    },
    input: {
      amount: '30',
      currency: 'CHF',
      type: 'bank_account',
      iban: 'CH3600000000000000000',
      bic_swift: 'XXXXCHXXXXX',
      owner: {
        name: 'John Doe'
      }
    }
  }

  // get return value and trace, look at response.headers
  // response.headers.get('location') == what I am looking for,
  window.edgeProvider.consoleLog('order Object')
  window.edgeProvider.consoleLog(orderObject)
  const order = await apiOrder(orderObject)
  window.edgeProvider.consoleLog('order')
  window.edgeProvider.consoleLog(order)
  if (order.message_to_sign) {
    const {signature_submission_url, body} = order.message_to_sign
    // signature_submission_url
    // body
    const sigResult = await apiSendSignedTransaction(signature_submission_url, body, address)
    // const signed result =
    return
  }
  /* const signedTransaction = await window.edgeProvider.signMessage('message')
  window.edgeProvider.consoleLog('signedTransaction')
  window.edgeProvider.consoleLog(signedTransaction)
*/
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
    window.edgeProvider.consoleLog(' BEfore estimate  ')
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
