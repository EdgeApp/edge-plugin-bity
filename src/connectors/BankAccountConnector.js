// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { BankAccountScene } from '../scenes/BankAccountScene'
import { connect } from 'react-redux'
import { saveBankInfo } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  return {
    poweredBy: {
      email: 'support@wyre.com',
      logo: require('../assets/poweredByLogo.png')
    }
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (iban:string, swift: string, history: Object) => dispatch(saveBankInfo(iban, swift, history))
})
export const BankAccountConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountScene)
