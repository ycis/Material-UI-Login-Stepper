import React from "react";
import { Formik } from "formik";
import SwipeableViews from "react-swipeable-views";
import ResponsiveDialog from "./Steps/Dialog";
import StepOne from "./Steps/One";
import StepTwo from "./Steps/Two";
import LoginStepper from "./Steps/Stepper";

const LoginDialog = ({
  state: {
    open,
    values,
    activeStep,
    showPassword,
    titleChecked,
    timer: { displayText }
  },
  validate,
  handleSubmitMain,
  handleCloseDialog,
  handleTitleClick,
  handlePasswordClick,
  requestPIN,
  handleBack,
  handleNext,
  tempLogin
}) => (
  <ResponsiveDialog open={open}>
    <Formik
      initialValues={values}
      enableReinitialize={false}
      validate={validate}
      onSubmit={handleSubmitMain}
      render={({ values, handleSubmit, isSubmitting, handleReset }) => (
        <form onSubmit={handleSubmit}>
          <SwipeableViews index={activeStep} disabled>
            <StepOne
              handleCloseDialog={handleCloseDialog}
              handleTitleClick={handleTitleClick}
              showPassword={showPassword}
              titleChecked={titleChecked}
              handlePasswordClick={handlePasswordClick}
              requestPIN={requestPIN}
              tempLogin={tempLogin}
            />
            <StepTwo displayText={displayText} requestPIN={requestPIN} />
          </SwipeableViews>
          {!titleChecked && (
            <LoginStepper
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          )}
        </form>
      )}
    />
  </ResponsiveDialog>
);

export default LoginDialog;
