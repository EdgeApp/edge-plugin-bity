// @flow
import React, { Component } from 'react'

import { BuySellConnector } from '../connectors/BuySellConnector'
import CircularProgress from '@material-ui/core/CircularProgress'
import { IntroConnector } from '../connectors/IntroConnector'
import { NOT_STARTED } from '../constants/index'
// import { PendingConnector } from '../connectors/PendingConnector'
import {
  containerSpinner
} from '../styles/styles'
import { withStyles } from '@material-ui/core/styles'

type Props = {
  history: Object,
  classes: Object,
  accountStatus: string | null,
  initInfo(): void,
  onNext(Object): void
}
type State = {
}

class StartSceneComponent extends Component<Props, State> {
  componentDidMount = async () => {
    this.props.initInfo()
  }
  onNext = () => {
    this.props.onNext(this.props.history)
  }
  render () {
    window.edgeProvider.consoleLog('Sign In Screen Props: ')
    window.edgeProvider.consoleLog(this.props.accountStatus)
    const classes = this.props.classes
    if (!this.props.accountStatus) {
      return <div className={classes.containerSpinner}>
      <CircularProgress size={60} />
    </div>
    }
    // return <IntroConnector history={this.props.history}/>
    if(this.props.accountStatus === NOT_STARTED) {
      return <IntroConnector history={this.props.history}/>
    }
    /* if(this.props.accountStatus === PENDING) {
      return <PendingConnector history={this.props.history}/>
    } */
    return <BuySellConnector history={this.props.history}/>
  }
}
const styles = theme => ({
  containerSpinner: containerSpinner
})
const StartScene = withStyles(styles)(StartSceneComponent)
export { StartScene }
