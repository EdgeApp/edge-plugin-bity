// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { BankAccountInfoSceneMin }  from 'edge-plugin-screens-and-components'
import { POWERED_BY_LOGO_DARK } from '../constants/index'
import { connect } from 'react-redux'
import { updateBankInfo } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  window.edgeProvider.consoleLog('Edit the thing ')
  window.edgeProvider.consoleLog(state.Bity)
  return {
    poweredBy: POWERED_BY_LOGO_DARK,
    iban: state.Bity.iban,
    owner: state.Bity.owner,
    swift: state.Bity.bic_swift,
    address1: state.Bity.address1,
    address2: state.Bity.address2,
    city: state.Bity.city,
    country: state.Bity.country,
    state: state.Bity.state,
    zip: state.Bity.zip,
    requireAddress: window.edgeProvider.deepQuery.type === 'sell'
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (arg: {iban:string, swift: string, owner: string, address1: string, address2: string, city: string, country: string, state: string, zip: string, history: Object}) => {
    dispatch(updateBankInfo(arg.iban, arg.swift, arg.owner, arg.address1, arg.address2 = '', arg.city, arg.country, arg.state, arg.zip, arg.history))
  }
})
export const EditBankAccountConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountInfoSceneMin)
