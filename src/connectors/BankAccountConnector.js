// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { BankAccountInfoSceneMin }  from 'edge-plugin-screens-and-components'
import { POWERED_BY_LOGO_DARK } from '../constants/index'
import { connect } from 'react-redux'
import { saveBankInfo } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  return {
    poweredBy: POWERED_BY_LOGO_DARK
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (arg: {iban:string, swift: string, owner: string, history: Object}) => dispatch(saveBankInfo(arg.iban, arg.swift, arg.owner, arg.history))
})
export const BankAccountConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountInfoSceneMin)
