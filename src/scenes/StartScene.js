// @flow
import React, { Component } from 'react'

import { BuySellConnector } from '../connectors/BuySellConnector'
import { BankAccountConnector } from '../connectors/BankAccountConnector'
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
  iban: string | null,
  bic_swift: string | null,
  owner: string | null,
  address1: string | null,
  city: string | null,
  country: string | null,
  state: string | null,
  zip: string | null,
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
    if (this.props.iban !== null && this.props.bic_swift !== null && this.props.owner !== null) {
      if (window.edgeProvider.deepQuery.type === 'sell') {
        if (this.props.address1 === null || this.props.city === null || this.props.country === null || this.props.state === null || this.props.zip === null) {
          return <BankAccountConnector history={this.props.history}/>
        }
      }  
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
