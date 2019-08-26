// @flow
import type { Dispatch, State } from '../types/ReduxTypes'
import { NOT_STARTED, THANK_YOU_ROUTE } from '../constants/index'

import { StartScene } from 'edge-plugin-screens-and-components'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  return {
    accountStatus: NOT_STARTED,
    poweredBy: {
      email: 'support@wyre.com',
      logo: '../assets/poweredByLogo.png'
    }
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(THANK_YOU_ROUTE)
  },
  initInfo: () => {

  }
})
export const StartSceneConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScene)
