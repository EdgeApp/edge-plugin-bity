// @flow
import type { Dispatch, State } from '../types/ReduxTypes'

import { IntroScene } from 'edge-plugin-screens-and-components'
import {THANK_YOU_ROUTE} from '../constants'
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  const logo = require('../assets/logo.png')
  const cards = [
    {
      title: 'Headline',
      body: 'The following fees are applied for buying and selling cryptocurrency with Wyre:',
      list: []
    },
    {
      title: 'Headline',
      body: 'The following fees are applied for buying and selling cryptocurrency with Wyre:',
      list: [
        'Edge Wallet 0.5%',
        'Wyre 0.5%'
      ]
    }
  ]
  return {
    logo,
    cards,
    poweredBy: {
      email: 'support@wyre.com',
      logo: '../assets/poweredByLogo.png'
    }
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNext: (history: Object) => {
    history.push(THANK_YOU_ROUTE)
  }
})
export const IntroConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroScene)
