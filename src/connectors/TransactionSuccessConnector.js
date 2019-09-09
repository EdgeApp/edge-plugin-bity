// @flow
import type { Dispatch, State } from '../types/ReduxTypes'
import {POWERED_BY_LOGO, START_ROUTE} from '../constants/index'

import { TransactionSuccess } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  return {
    poweredBy: POWERED_BY_LOGO
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(START_ROUTE)
  }
})
export const TransactionSuccessConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionSuccess)
