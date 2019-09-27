// @flow
import THEME from '../constants/themeConstants'
export const styles = {
  primaryButton: {
    height: '50px'
  },
  secondaryButton: {
    backgroundColor: '#909091'
  }

}
export const buttonStyle = {
  textTransform: 'none',
  paddingRight: '15px',
  paddingLeft: '15px',
  height: '50px',
  borderRadius: '5px'
}
export const buttonStyleHollow = {
  textTransform: 'none',
  borderRadius: '5px'
}
export const poweredByRow = {
  display: 'flex',
  flexShrink: 1,
  position: 'relative',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-end',
  height: 50,
  marginTop: 10
}
export const sceneContainer = {
  display: 'flex',
  flex: 1,
  height: '100%',
  alignItems: 'center',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 20
}
export const sceneContainerNoHeight = {
  display: 'flex',
  flex: 1,
  minHeight: '100%',
  width:'100%',
  alignItems: 'center',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 20
}

export const sceneMainContainer = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  flex: 3,
  width: '100%'
}

export const containerSpinner = {
  display: 'flex',
  flex: 1,
  width: '100%',
  minHeight: '100vh',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around'
}
export const logo = {
  position: 'relative',
  width: '100%'
}

