import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import StepContent from "@mui/material/StepContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Init from "../components/Init";
import Register from "../components/Register";
import Login from "../components/Login";
import Logout from "../components/Logout";
import LoginAsGuest from "../components/LoginAsGuest";
import Head from "next/head";
import ChangeUserType from "../components/ChangeUserType";
import GetBalance from "../components/GetBalance";
import GetTransactionHistory from "../components/GetTransactionHistory";
import GetRewardOffers from "../components/GetRewardOffers";
import { sdkURL } from "../config";

const steps = [
  "Initialize the SDK",
  "Login as Guest",
  "Register",
  "Login / Social Login",
  "Change User Type",
  "Get Balance",
  "Get Transaction History",
  "Get Reward Offers",
  "Logout",
];

const Home: NextPage = () => {
  useEffect(() => {
    if (!window.MzaaloSDK) toast.error("Mzaalo SDK not found");
  }, []);
  const [activeStep, setActiveStep] = useState(0);
  const [allowProceed, setAllowProceed] = useState(false);
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Init {...commonProps} />;
      case 1:
        return <LoginAsGuest {...commonProps} />;
      case 2:
        return <Register {...commonProps} />;
      case 3:
        return <Login {...commonProps} />;
      case 4:
        return <ChangeUserType {...commonProps} />;
      case 5:
        return <GetBalance {...commonProps} />;
      case 6:
        return <GetTransactionHistory {...commonProps} />;
      case 7:
        return <GetRewardOffers {...commonProps} />;
      case 8:
        return <Logout {...commonProps} />;
      default:
        return "Unknown step";
    }
  };
  const commonProps = { setAllowProceed };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setAllowProceed(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setAllowProceed(false);
  };

  const handleReset = () => setActiveStep(0);
  return (
    <>
      <Head>
        <title>Mzaalo Web SDK</title>
      </Head>
      <ToastContainer position="bottom-right" />
      <Script crossorigin="anonymous" src={sdkURL}></Script>
      <div className={styles.container}>
        <h1 className={styles.title}>Mzaalo SDK Demo</h1>
        <main className={styles.main}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div>
                    <div className="text-center">
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={!allowProceed}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <div className="text-center">
              <Paper square elevation={0}>
                <Typography>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </Paper>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
