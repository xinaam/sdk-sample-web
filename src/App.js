import React from 'react';
import Init from './components/Init';
import Auth from './components/Auth';
import './app.css';
import RewardSection from './components/RewardSection';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { MzaaloAuth } from 'mzaalo-web-sdks';
import { ToastsStore } from 'react-toasts';

function getSteps() {
  return ['Initialize the SDK', 'Login to Mzaalo System', 'Register Reward and Fetch Balance  '];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Init />
    case 1:
      return <Auth />
    case 2:
      return <RewardSection />
    default:
      return 'Unknown step';
  }
}

export default function App(props) {

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleLogout = () => {
    MzaaloAuth.logout()
    .then(res => {
      ToastsStore.success('Logged Out Successfully');
    })
    .catch(error => ToastsStore.error(error))
  }

  return (
    <>
      <h2>Mzaalo SDK Demo</h2>
      <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    // className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    // className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} >
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      )}
    </div>
      {/* <div>
        <Init />
        <Auth />
        <RewardSection />
      </div> */}
    </>
  );
}
