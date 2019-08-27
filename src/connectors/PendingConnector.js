// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import {ADDRESS_ROUTE} from '../constants/index'
import { PendingScene } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  return {
    poweredBy: {
      email: 'support@wyre.com',
      logo: '../assets/poweredByLogo.png'
    }
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(ADDRESS_ROUTE)
  }
})
export const PendingConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingScene)
