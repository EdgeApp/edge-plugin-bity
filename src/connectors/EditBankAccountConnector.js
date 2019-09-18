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
    swift: state.Bity.bic_swift
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (arg: {iban:string, swift: string, owner: string, history: Object}) => {
    dispatch(updateBankInfo(arg.iban, arg.swift, arg.owner, arg.history))
  }
})
export const EditBankAccountConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountInfoSceneMin)
