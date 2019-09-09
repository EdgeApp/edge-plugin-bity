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
      title: 'BIty is cool',
      body: 'The following fees are applied for buying and selling cryptocurrency with Bity:',
      list: []
    },
    {
      title: 'KYC-Less',
      body: '5 K a day without KYC :',
      list: [
        'Edge Wallet 0.5%',
        'Bity 0.5%'
      ]
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
