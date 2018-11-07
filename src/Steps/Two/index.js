import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Phone, AccountBox, LockOpen } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MaskedInput from "react-text-mask";
import { Field as FormikField } from "formik";
import { TextField as FormikMui } from "formik-material-ui";
import StepTwoTitle from "./Title";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing.unit
  },
  fieldPadding: {
    padding: theme.spacing.unit
  }
});

const PhoneAdorn = props => (
  <InputAdornment variant="outlined" position="end">
    <Phone />
  </InputAdornment>
);
const PinAdorn = props => (
  <InputAdornment variant="outlined" position="end">
    <LockOpen />
  </InputAdornment>
);

const PhoneMask = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
    />
  );
};

PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired
};

const PinMask = props => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
    />
  );
};

PinMask.propTypes = {
  inputRef: PropTypes.func.isRequired
};

const StepTwo = withStyles(styles)(
  ({ classes: { fieldPadding, container }, displayText, requestPIN }) => (
    <div>
      <StepTwoTitle displayText={displayText} />
      <div className={container}>
        <Grid container spacing={8}>
          <Grid item xs={6} className={fieldPadding}>
            <FormikField
              fullWidth
              margin="dense"
              component={FormikMui}
              variant="outlined"
              label="First Name"
              name="firstname"
              InputProps={{
                endAdornment: <AccountBox />
              }}
            />
          </Grid>
          <Grid item xs={6} className={fieldPadding}>
            <FormikField
              component={FormikMui}
              fullWidth
              margin="dense"
              variant="outlined"
              label="Last Name"
              name="lastname"
              InputProps={{
                endAdornment: <AccountBox />
              }}
            />
          </Grid>
          <Grid item xs={7} className={fieldPadding}>
            <FormikField
              fullWidth
              margin="dense"
              component={FormikMui}
              variant="outlined"
              label="Phone Number"
              name="phonenumber"
              InputProps={{
                inputComponent: PhoneMask,
                endAdornment: <PhoneAdorn />
              }}
            />
          </Grid>
          <Grid item xs={5} className={fieldPadding}>
            <FormikField
              fullWidth
              component={FormikMui}
              margin="dense"
              variant="outlined"
              label="PIN"
              name="pin"
              placeholder="12345"
              InputProps={{
                inputComponent: PinMask,
                endAdornment: <PinAdorn />
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={requestPIN}
              color="primary"
            >
              resend PIN
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              onClick={requestPIN}
              color="primary"
            >
              Verify PIN
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" align="center">
              Account Resets: VERIFY PIN to retrieve information.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
);

export default StepTwo;
