// @flow
import { PoweredBy, PrimaryButton } from 'edge-plugin-screens-and-components'
import React, { Component } from 'react'
import {
  poweredByRow,
  sceneButtonBottom,
  sceneContainer,
  sceneMainContainer
} from '../styles/styles'

import type { PoweredByType } from '../types/AppTypes'
import THEME from '../constants/themeConstants'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

type Props = {
  history: Object,
  classes: Object,
  poweredBy: PoweredByType,
  onNext(string, string, Object): void
}
type State = {
  iban: string,
  swift: string
}

class BankAccountSceneComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      iban: '',
      swift: ''
    }
  }
  onNext = () => {
    this.props.onNext(this.state.iban, this.state.swift, this.props.history)
  }
  changeIban = (event) => {
    this.setState({
      iban: event.target.value
    })
  }
  changeSwift = (event) => {
    this.setState({
      swift: event.target.value
    })
  }
  render () {
    const { classes } = this.props
    return <div className={classes.container} >
      <div className={classes.containerMain}>
        <div className={classes.poweredByRow}>
          <PoweredBy poweredBy={this.props.poweredBy} useBlack/>
        </div>
        <div className={classes.inset} >
          <div className={classes.headerText} >
            Enter Bank Account Information.
          </div>
          <TextField
            id="standard-uncontrolled"
            label="IBAN"
            type="number"
            tabIndex='0'
            fullWidth
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}

            className={classes.textField}
            margin="normal"
            onChange={this.changeIban}
            autoFocus
          />
          <TextField
            id="standard-uncontrolled"
            label="Swift Code"
            type="number"
            tabIndex='1'
            fullWidth
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            className={classes.textField}
            margin="normal"
            onChange={this.changeSwift}
          />
        </div>
      </div>
      <div className={classes.containerBottom}>
        <PrimaryButton onClick={this.onNext} >Next </PrimaryButton>
      </div>
    </div>
  }
}
const styles = theme => ({
  container: {...sceneContainer, backgroundColor: THEME.COLORS.WHITE},
  poweredByRow: poweredByRow,
  containerMain: sceneMainContainer,
  containerBottom: sceneButtonBottom,
  inset: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    position: 'relative',
    selfAlign: 'center'
  },
  resize: {
    fontSize: 17
  },
  headerText: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 34,
    width: '100%',
    fontSize: 17,
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    color: THEME.COLORS.BLACK,
  },
})
const BankAccountScene = withStyles(styles)(BankAccountSceneComponent)
export { BankAccountScene }
