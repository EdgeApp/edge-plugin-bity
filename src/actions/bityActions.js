// @flow

import type { Dispatch, GetState } from '../types/ReduxTypes'
import {TRANSACTION_CONFIRM_ROUTE, TRANSACTION_SUCCESS_ROUTE} from '../constants/index'
import { apiEstimate, apiOrder, apiSendSignedTransaction } from '../api/api'

import type { OrderDetail } from '../types/AppTypes'
export const placeOrder = (history: Object) => async (dispatch: Dispatch, getState: GetState) => {
  dispatch({ type: 'START_CONFIRM_TRANSACTION' })
  const state = getState()
  const estimate = state.Transaction.estimate
  if(!estimate) {
    return
  }
  const input = estimate.input
  const output = estimate.output
  if (!input || !output) {
    return
  }
  const isSell = state.Transaction.type === 'sell'
  const cryptoAmount = isSell ? input.amount : output.amount
  const fiatAmount = isSell ? output.amount : input.amount
  const address = state.Wallet.wallet ? state.Wallet.wallet.receiveAddress.publicAddress : ''
  const walletName = state.Wallet.wallet ? state.Wallet.wallet.name : 'Bad Wallet Name'
  const buyCryptoOrder = {
    output: {
      currency: 'BTC',
      type: 'crypto_address',
      crypto_address: address
    },
    input: {
      amount: fiatAmount,
      currency: 'EUR',
      type: 'bank_account',
      iban: state.Bity.iban,
      bic_swift: state.Bity.bic_swift,
      owner: {
        name: state.Bity.owner
      }
    }
  }
  const sellCryptoOrder = {
    input: {
      amount: cryptoAmount,
      currency: 'BTC',
      type: 'crypto_address',
      crypto_address: address
    },
    output: {
      iban: state.Bity.iban,
      bic_swift: state.Bity.bic_swift,
      currency: 'CHF',
      type: 'bank_account',
      owner: {
        name: state.Bity.owner
      }
    }
  }
  const orderObject = isSell ? sellCryptoOrder : buyCryptoOrder
  const order: OrderDetail = await apiOrder(orderObject)
    if (!order.input && !order.output) {
      const error = new Error('Problem confirming transaction: Code:15')
      window.edgeProvider.displayError(error)
      dispatch({ type: 'END_CONFIRM_TRANSACTION' })
      return
    }
    if (order.message_to_sign) {
      try {
        const {signature_submission_url, body} = order.message_to_sign
        await apiSendSignedTransaction(signature_submission_url, body, address)
        history.push(TRANSACTION_SUCCESS_ROUTE)
        dispatch(recordOrder(order.id))
        dispatch({ type: 'END_CONFIRM_TRANSACTION' })
      } catch (e) {
        window.edgeProvider.displayError(e)
        dispatch({ type: 'END_CONFIRM_TRANSACTION' })
      }
      return
    }
    const info = {
      currencyCode: 'BTC',
      publicAddress: order.payment_details.cryptoAddress,
      nativeAmount: cryptoAmount
    }
    const metadata = {
      name: 'Bity',
      category: 'Exchange: Sell BTC',
      notes: 'Sell BTC from ' + walletName +' to Bity at address: ' + order.payment_details.cryptoAddress +'. Sell amount ' + fiatAmount +'. For assistance, please contact support@bity.com.'
    }
    try {
      await window.edgeProvider.requestSpend([info], { metadata })
      dispatch(recordOrder(order.id))
      history.push(TRANSACTION_SUCCESS_ROUTE)
      dispatch({ type: 'END_CONFIRM_TRANSACTION' })
    } catch (e) {
      window.edgeProvider.displayError('Cancelled')
      dispatch({ type: 'END_CONFIRM_TRANSACTION' })
    }
}

export const recordOrder = (arg: string) => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const orderIds = state.Bity.orderIds
  const newObject = {
    orderIds: orderIds.push(arg)
  }
  await window.edgeProvider.writeData(newObject)
  dispatch({type: 'ADD_TRANSACTION', data: arg})
}

export const getEstimate = (fiat: string, history: Object) => async (dispatch: Dispatch, getState: GetState) => {
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
    window.edgeProvider.displayError(e)
  }
}
