// @flow
import type { Dispatch, GetState } from '../types/ReduxTypes'

export const selectWallet = () => async (dispatch: Dispatch, getState: GetState) => {
  const currencyCode = await window.edgeProvider.chooseCurrencyWallet(['BTC'])
  if (currencyCode) {
    const wallet = await window.edgeProvider.getCurrentWalletInfo()
    dispatch({type: 'WALLET_LOADED', data: wallet})
  }
}
export const showToast = (arg: string) => async (dispatch: Dispatch, getState: GetState) => {
  await window.edgeProvider.displayToast(arg)
}
