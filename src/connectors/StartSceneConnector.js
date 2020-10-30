// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { StartScene } from '../scenes/StartScene.js'
import { THANK_YOU_ROUTE } from '../constants/index'
import { connect } from 'react-redux'
import { initInfo } from '../actions/indexActions'

const mapStateToProps = (state: State) => {
  return {
    accountStatus: state.Bity.status,
    iban: state.Bity.iban,
    bic_swift: state.Bity.bic_swift,
    owner: state.Bity.owner,
    address1: state.Bity.address1,
    address2: state.Bity.address2,
    city: state.Bity.city,
    country: state.Bity.country,
    state: state.Bity.state,
    zip: state.Bity.zip,
    poweredBy: {
      email: 'support@wyre.com',
      logo: require('../assets/poweredByLogo.png')
    }
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(THANK_YOU_ROUTE)
  },
  initInfo: () => dispatch(initInfo())
})
export const StartSceneConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScene)
