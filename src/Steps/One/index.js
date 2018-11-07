import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Field as FormikField } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff, ContactMail } from "@material-ui/icons";
import { TextField as FormikMui } from "formik-material-ui";
import StepOneHeader from "./Header";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing.unit
  }
});

const PasswordAdorn = ({ showPassword, handlePasswordClick }) => (
  <InputAdornment variant="outlined" position="end">
    <IconButton
      style={{ marginRight: -11 }}
      aria-label="Toggle password visibility"
      onClick={handlePasswordClick}
    >
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  </InputAdornment>
);

const StepOne = withStyles(styles)(
  ({
    classes: { container },
    handleTitleClick,
    showPassword,
    titleChecked,
    handlePasswordClick,
    requestPIN
  }) => (
    <div>
      <StepOneHeader
        titleChecked={titleChecked}
        handleTitleClick={handleTitleClick}
      />
      <div className={container}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <FormikField
              fullWidth
              component={FormikMui}
              name="email"
              margin="dense"
              label="Email"
              variant="outlined"
              InputProps={{
                endAdornment: <ContactMail />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormikField
              fullWidth
              component={FormikMui}
              name="password"
              margin="dense"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <PasswordAdorn
                    showPassword={showPassword}
                    handlePasswordClick={handlePasswordClick}
                  />
                )
              }}
            />
          </Grid>
          {!titleChecked && (
            <Grid item xs={12}>
              <FormikField
                fullWidth
                component={FormikMui}
                name="confirm"
                margin="dense"
                label="Confirm Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
              />
            </Grid>
          )}
          {titleChecked && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={requestPIN}
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
);

export default StepOne;
