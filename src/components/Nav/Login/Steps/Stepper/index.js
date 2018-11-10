import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";

const styles = theme => ({});
const LoginStepper = withStyles(styles, { withTheme: true })(
  ({
    theme,
    activeStep,
    handleBack,
    handleNext,
    isSubmitting,
    handleSubmit
  }) => (
    <MobileStepper
      variant="progress"
      steps={2}
      position="static"
      activeStep={activeStep}
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
      nextButton={
        <Button
          size="small"
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
        >
          {activeStep === 1 ? "UPDATE" : "NEXT"}
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
    />
  )
);

export default LoginStepper;
