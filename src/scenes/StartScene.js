// @flow
import React, { Component } from 'react'

import { APPROVED } from '../constants/index'
import { BuySellConnector } from '../connectors/BuySellConnector'
import CircularProgress from '@material-ui/core/CircularProgress'
import { IntroConnector } from '../connectors/IntroConnector'
// import { PendingConnector } from '../connectors/PendingConnector'
import {
  localContainerSpinner
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
    const classes = this.props.classes
    if (!this.props.accountStatus) {
      return <div className={classes.containerSpinner}>
      <CircularProgress size={60} />
    </div>
    }
    // return <IntroConnector history={this.props.history}/>
    if(this.props.accountStatus === APPROVED) {
      return <BuySellConnector history={this.props.history}/>
    }
    /* if(this.props.accountStatus === PENDING) {
      return <PendingConnector history={this.props.history}/>
    } */
    return <IntroConnector history={this.props.history}/>
  }
}
const styles = theme => ({
  containerSpinner: localContainerSpinner
})
const StartScene = withStyles(styles)(StartSceneComponent)
export { StartScene }
