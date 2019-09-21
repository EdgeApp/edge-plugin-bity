// @flow

import {BANK_CONNECT_ROUTE, MAIN_LOGO, POWERED_BY_LOGO_DARK} from '../constants'
import type { Dispatch, State } from '../types/ReduxTypes'

import {IntroScene} from 'edge-plugin-screens-and-components'
// import { TestScene } from '../scenes/TestScene'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  const logo = MAIN_LOGO
  const cards = [
    {
      title: 'Bity ',
      body: 'Bity is fiat to crypto exchange allowing users to safely buy and sell cryptocurrency with a bank account directly from Edge',
      list: []
    },
    {
      title: 'No KYC Needed',
      body: 'You can trade up to 5K a day without KYC',
      list: []
    }
  ]
  return {
    logo,
    cards,
    poweredBy: POWERED_BY_LOGO_DARK
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(BANK_CONNECT_ROUTE)
  }
})
export const IntroConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroScene)
