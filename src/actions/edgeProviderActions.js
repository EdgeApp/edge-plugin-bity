// @flow
import type { Dispatch, GetState } from '../types/ReduxTypes'

export const selectWallet = () => async (dispatch: Dispatch, getState: GetState) => {
  const currencyCode = await window.edgeProvider.chooseCurrencyWallet(['BTC'])
  if (currencyCode) {
    window.edgeProvider.consoleLog('We have vurrency code '+ currencyCode)
    const wallet = await window.edgeProvider.getCurrentWalletInfo()
    window.edgeProvider.consoleLog('We have wallet '+ wallet)
    dispatch({type: 'WALLET_LOADED', data: wallet})
  }
}
