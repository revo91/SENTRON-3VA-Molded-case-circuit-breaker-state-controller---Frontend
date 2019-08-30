import React from 'react';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import TweenLite from 'gsap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { changeState, disableButtons, checkState } from './actions/manageBreakerState';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/mindsphere-comb-structure_large.jpeg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    minHeight: '100vh',
    maxHeight: '300vh',
    height: 'auto'
  },
  grid: {
    padding: '16px'
  },
  whiteColor: {
    color: 'white'
  },
  greenBackgroundColor: {
    backgroundColor: '#07b91f',
    padding: '40px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  redBackgroundColor: {
    backgroundColor: '#ff0000',
    padding: '40px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  gridGradient: {
    background: 'linear-gradient(to right,#50bebe 0,#099 50%,#0099b0 83%,#0099cb 100%)',
    padding: '20px 3.75% 40px'
  },
  gridContainer: {
    paddingTop: '0px'
  },
  svgMaxHeight: {
    maxHeight: '700px',
    marginTop: '20px',
    marginBottom: '20px'
  }
}));

function App({ stateClosed, stateOpened, stateTripped, manageBreakerState, changeState, disabledButtons, disableButtons, checkState }) {
  const classes = useStyles();
  const circuitRef = React.createRef();
  const MCCBRef = React.createRef();

  const manageSwitch = (desiredState) => {
    checkState()
    changeState(desiredState)
    disableButtons(true)
    setTimeout(() => {
      changeState(desiredState, true)
      disableButtons(false)
    }, 2000)
  }

  const setBreakerState = () => {
    if (stateClosed === true) {
      TweenLite.to(circuitRef.current, 1, { rotation: 45, transformOrigin: "100% 100%" })
      TweenLite.to(MCCBRef.current, 1, { y:-6})
    }
    else if (stateTripped === true) {
      TweenLite.to(circuitRef.current, 1, { rotation: 0, transformOrigin: "100% 100%" })
      TweenLite.to(MCCBRef.current, 1, { y:0 })
    }
    else {
      TweenLite.to(circuitRef.current, 1, { rotation: 0, transformOrigin: "100% 100%" })
      TweenLite.to(MCCBRef.current, 1, { y:10 })
    }
  }

  const colorizeCircuit = () => {
    if (stateClosed === true) {
      return 'stateClosed'
    }
    else if (stateTripped === true) {
      return 'stateTripped'
    }
    else {
      return 'stateOpened'
    }
  }

  useEffect(() => {
    setInterval(() => {
      checkState()
    }, 500)
  })

  useEffect(() => {
    setBreakerState()
  }, [stateClosed, stateOpened, stateTripped]);

  return (
    <div className={classes.root}>
      <Grid className={classes.gridGradient}
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Typography align="center" className={classes.whiteColor} variant="h3" gutterBottom>Sterowanie wyłącznikiem 3VA2 przez przeglądarkę</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.gridContainer}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        
        <Grid item xs={6} md={2} align="center" style={{padding:'10px'}}>
          <Button fullWidth disabled={disabledButtons} onClick={() => manageSwitch('close')} className={classes.greenBackgroundColor} variant="contained" ><span className={classes.whiteColor}>Załącz</span></Button>
        </Grid>
        <Grid item xs={6} md={2} align="center" style={{padding:'10px'}}>
        <Button fullWidth disabled={disabledButtons} onClick={() => manageSwitch('open')} className={classes.redBackgroundColor} variant="contained" ><span className={classes.whiteColor}>Wyłącz</span></Button>
        </Grid>
        <Grid item xs={12} md={4} align="center" style={{padding:'10px'}} className='mobileBorder'>
          <svg className={colorizeCircuit()} id="Warstwa_1" data-name="Warstwa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.1 465">
            <line x1="87.68" y1="294" x2="87.68" y2="465" fill="none" strokeMiterlimit="10" strokeWidth="7" />
            <line ref={circuitRef} x1="1.41" y1="209.73" x2="87.68" y2="296" fill="none" strokeMiterlimit="10" strokeWidth="7" />
            <line x1="87.68" x2="87.68" y2="179" fill="none" strokeMiterlimit="10" strokeWidth="7" />
            <line x1="63.68" y1="202" x2="111.68" y2="154" fill="none" strokeMiterlimit="10" strokeWidth="7" />
            <line x1="111.68" y1="202" x2="63.68" y2="154" fill="none" strokeMiterlimit="10" strokeWidth="7" />
          </svg>
        </Grid>
        <Grid item xs={12} md={4} style={{padding:'10px'}} align="center">
          <svg className={classes.svgMaxHeight} id="Warstwa_2" data-name="Warstwa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.37 103.47">
            <path d="M479.51,218.14H454.29V200.87h25.22Zm-25-.23h24.78V201.1H454.51Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <rect x="0.43" y="0.43" width="59.52" height="102.62" fill="#a6c7d5" />
            <path d="M482.2,245.38H421.83V141.91H482.2Zm-59.52-.85h58.67V142.76H422.68Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <path
              d="M471.92,160.63l-.34,0-.34-.06-.33-.11-.32-.16-.28-.2-.25-.23-.22-.27-.18-.3-.1-.21-.12-.45,0-.34,0-.44.06-.33.11-.31.21-.4.28-.34.23-.22.37-.24.31-.14.32-.1.44-.06h.11l.43,0,.33.08.31.12.29.17.35.27.28.33.23.38.16.42.06.33,0,.43,0,.34-.12.45-.15.32-.27.38-.24.24-.27.21-.3.18-.33.13-.34.08Zm-.06-4.71-.4,0-.29.07-.29.12-.27.15-.3.25-.2.21-.22.34-.16.38-.08.29,0,.39,0,.31.07.31.15.4.17.27.27.31.23.21.27.17.39.16.31.07.31,0h.31l.31-.06.3-.1.29-.15.33-.25.28-.3.18-.26L474,159l.11-.41,0-.31,0-.39-.06-.3-.14-.38-.21-.35-.26-.3-.31-.24-.36-.2-.39-.12-.4,0Z"
              transform="translate(-421.83 -141.91)" fill="#005f87" />
            <path
              d="M432.23,160.63l-.34,0-.34-.06-.33-.11-.31-.16-.29-.2-.25-.23-.21-.27-.13-.19-.19-.43-.11-.46,0-.33,0-.44.07-.32.13-.32.23-.38.21-.25.24-.22L431,156l.31-.14.32-.1.43-.06h.11l.44,0,.32.08.32.12.29.17.34.27.22.24.24.37.15.31.11.43,0,.43,0,.45-.09.34-.13.33-.18.3-.22.26-.25.23-.28.21-.31.16-.34.11-.45.07Zm-.06-4.71-.39,0-.3.07-.28.12-.27.15-.38.32-.3.4-.21.46-.08.39,0,.3,0,.3.09.42.18.39.24.33.21.23.25.19.28.15.4.15.42.07h.2l.3,0,.32-.07.39-.17.35-.23.22-.21.2-.24.21-.37.11-.3.06-.31,0-.31,0-.39-.11-.39-.12-.28-.23-.34-.2-.22-.31-.24-.36-.2-.39-.12-.39,0Z"
              transform="translate(-421.83 -141.91)" fill="#005f87" />
            <rect x="0.43" y="90.18" width="59.52" height="0.23" fill="#005f87" />
            <rect x="4.73" y="62.96" width="25.85" height="11.11" fill="#e5f5f9" />
            <path d="M461.94,215.64h-4.76v-4.76h4.76Zm-4.54-.22h4.31v-4.31H457.4Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <path d="M461.94,210h-4.76v-4.76h4.76Zm-4.54-.22h4.31v-4.31H457.4Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <path
              d="M432.23,223.9h-.34l-.34-.07-.33-.11-.31-.16-.29-.2-.25-.23-.21-.26-.23-.41-.16-.44-.06-.46v-.11l0-.43.07-.32.13-.32.23-.38.21-.25.24-.22.37-.25.31-.14.32-.1.43-.06h.11l.44,0,.32.08.32.13.29.16.34.27.22.24.24.37.15.31.11.43,0,.43,0,.45-.09.35-.13.32-.18.3-.22.27-.25.23-.28.2-.31.16-.34.11-.45.08Zm-.06-4.7-.39,0-.3.08-.28.11-.27.15-.38.32-.3.4-.21.47-.08.39,0,.29,0,.31.09.41.18.39.18.26.27.3.25.19.28.16.4.14.42.07h.2l.3,0,.32-.08.39-.16.35-.24.22-.21.2-.24.21-.37.11-.3.06-.31,0-.31,0-.39-.11-.39-.12-.28-.23-.34-.27-.28-.24-.18-.36-.19-.39-.13-.39-.05Z"
              transform="translate(-421.83 -141.91)" fill="#005f87" />
            <path d="M467.61,210h-4.77v-4.76h4.77Zm-4.54-.22h4.31v-4.31h-4.31Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <rect x="47.5" y="67.35" width="1.3" height="1.3" fill="#e5f5f9" />
            <rect x="47.5" y="65.48" width="1.3" height="1.3" fill="#e5f5f9" />
            <rect x="47.5" y="63.61" width="1.3" height="1.3" fill="#e5f5f9" />
            <rect x="37.24" y="52.17" width="1.8" height="1.8" fill="#a6c7d5" />
            <path d="M461,196h-2v-2h2Zm-1.8-.23h1.57v-1.57h-1.57Z" transform="translate(-421.83 -141.91)" fill="#005f87" />
            <path
              d="M471.92,223.9h-.34l-.34-.07-.33-.11-.32-.16-.28-.2-.25-.23-.22-.26-.18-.31-.1-.21-.12-.45,0-.34,0-.43.06-.33.11-.32.21-.39.28-.35.24-.22.36-.24.31-.14.32-.1.44-.06h.11l.43,0,.33.08.31.13.29.16.35.28.28.32.23.38.16.42.06.33,0,.43,0,.35-.12.44-.15.32-.27.38-.24.24-.27.22-.3.17-.33.13-.34.08Zm-.06-4.7-.4,0-.29.08-.29.11-.27.15-.3.25-.2.22-.22.34-.16.37-.08.29,0,.4,0,.31.07.31.15.39.17.28.27.31.23.2.27.17.39.16.31.08.31,0,.31,0,.31-.06.3-.1.29-.15.33-.24.28-.3.18-.27.14-.29.11-.41,0-.31,0-.39-.06-.29-.14-.39-.21-.35-.26-.29-.31-.25-.36-.19-.39-.13-.4-.05Z"
              transform="translate(-421.83 -141.91)" fill="#005f87" />
            <polygon
              points="59.95 53.55 40.84 53.55 40.84 26.7 59.95 26.7 59.95 26.93 41.07 26.93 41.07 53.33 59.95 53.33 59.95 53.55"
              fill="#005f87" />
            <polygon
              points="19.53 53.55 0.42 53.55 0.42 53.33 19.3 53.33 19.3 26.93 0.42 26.93 0.42 26.7 19.53 26.7 19.53 53.55"
              fill="#005f87" />
            <path d="M467.61,215.64h-4.77v-4.76h4.77Zm-4.54-.22h4.31v-4.31h-4.31Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <rect x="0.42" y="13.04" width="59.53" height="0.23" fill="#005f87" />
            <rect x="0.42" y="19.27" width="59.53" height="0.23" fill="#005f87" />
            <rect x="0.42" y="24.94" width="59.53" height="0.23" fill="#005f87" />
            <path d="M458.42,195.94H445.61v-27.8h12.81Zm-12.58-.23H458.2V168.37H445.84Z" transform="translate(-421.83 -141.91)"
              fill="#005f87" />
            <rect x="0.42" y="54.97" width="59.53" height="0.23" fill="#005f87" />
            <rect x="0.42" y="58.96" width="59.53" height="0.23" fill="#005f87" />
            <rect x="0.53" y="76" width="59.3" height="0.23" fill="#005f87" />
            <g id="handle" ref={MCCBRef}>
              <rect x="22.84" y="36.45" width="14.68" height="3.99" fill="#a6c7d5" />
              <path d="M459.47,182.47H444.56v-4.22h14.91Zm-14.68-.23h14.46v-3.76H444.79Z" transform="translate(-421.83 -141.91)"
                fill="#005f87" />
              <rect x="22.77" y="37.52" width="14.72" height="1.86" fill="#d9e7ed" />
              <path d="M459.47,182.47H444.56v-4.22h14.91Zm-14.68-.23h14.46v-3.76H444.79Z" transform="translate(-421.83 -141.91)"
                fill="#005f87" />
              <rect x="22.77" y="37.4" width="14.72" height="0.23" fill="#005f87" />
              <rect x="22.77" y="39.26" width="14.72" height="0.23" fill="#005f87" />
            </g>
            <rect x="2.12" y="19.39" width="14.74" height="3.97" fill="#005f87" />
          </svg>
        </Grid>
      </Grid>
    </div>
  );

}
const mapStateToProps = (state) => {
  return {
    stateClosed: state.breakerStateReducer.stateClosed,
    stateOpened: state.breakerStateReducer.stateOpened,
    stateTripped: state.breakerStateReducer.stateTripped,
    disabledButtons: state.breakerStateReducer.disabledButtons
  }
}

const mapDispatchToProps = {
  changeState,
  disableButtons,
  checkState
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
