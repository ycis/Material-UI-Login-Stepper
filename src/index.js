import React from "react";
import ReactDOM from "react-dom";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import SwipeableViews from "react-swipeable-views";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Formik } from "formik";
import { getDuration, decrementTimer } from "./timer";
import ResponsiveDialog from "./Steps/Dialog";
import StepOne from "./Steps/One";
import StepTwo from "./Steps/Two";
import LoginStepper from "./Steps/Stepper";

// import { Debug } from "./Debug";
// import LinearProgress from "@material-ui/core/LinearProgress";

const initialValues = {
  email: "",
  firstname: "",
  lastname: "",
  phonenumber: "",
  password: "",
  confirm: "",
  pin: ""
};
const onSubmit = (values, actions) => {
  sleep(300).then(() => {
    window.alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  });
};
const App = () => (
  <div className="App">
    <CssBaseline />
    <Base initialValues={initialValues} onSubmit={onSubmit} />
  </div>
);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
class Base extends React.Component {
  static Page = ({ children }) => children;
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      values: props.initialValues,
      titleChecked: true,
      showPassword: false,
      serverStatus: {
        loading: false,
        success: false,
        message: ""
      },
      open: true,
      timer: { displayText: "" }
    };
  }
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }
  componentWillUnmount() {
    if (this.state.timer.id) clearTimeout(this.state.timer.id);
  }
  startTimer = () => this.setState(this.setTimer);
  setTimer = ({ timer }) => {
    if (timer.id) clearTimeout(timer.id);
    timer.expires = Date.now() + getDuration();
    timer.id = setTimeout(() => this.updateTimer(timer), 1000);
    return timer;
  };
  updateTimer = timer => this.setState(decrementTimer(timer, this.updateTimer));
  validate = values => {
    const { activeStep, titleChecked } = this.state;
    const validation = {
      0: ({ email, password, confirm }) => {
        const emailVal = [
          "^",
          "[a-zA-Z0-9_.+-]+(@sjvmail).net$",
          "|^w.daniel.rudolph@gmail.com$"
        ];
        const emailExp = new RegExp(emailVal.join(""));
        const errors = {};
        if (!emailExp.test(email)) errors.email = "Invalid SJV Email";
        if (!email) errors.email = "Required";
        if (!password) errors.password = "Required";
        if (!titleChecked) {
          if (confirm !== password) errors.confirm = "Passwords don't match";
          if (!confirm) errors.confirm = "Required";
        }
        return errors;
      },
      1: ({ phonenumber, pin }) => {
        const errors = {};
        if (!phonenumber) errors.phonenumber = "Required";
        if (!pin) errors.pin = "Required";
        return errors;
      }
    };
    return validation[activeStep](values);
  };
  handleNext = values => {
    this.requestPIN();
    this.setState(state => ({
      activeStep: state.activeStep + 1,
      values
    }));
  };
  handleBack = () =>
    this.setState(state => ({
      activeStep: Math.max(state.activeStep - 1, 0)
    }));

  handleSubmit = (values, bag) => {
    if (this.state.activeStep) {
      return this.props.onSubmit(values, bag);
    } else {
      this.handleNext(values);
      bag.setTouched({});
      bag.setSubmitting(false);
    }
  };
  handleTitleClick = checked => this.setState({ titleChecked: checked });
  handlePasswordClick = () =>
    this.setState(state => ({ showPassword: !state.showPassword }));
  requestPIN = () => {
    this.startTimer();
    this.setState(({ values }) => {
      values.pin = "123";
      return {
        values
      };
    });
  };
  render() {
    return (
      <ResponsiveDialog open={this.state.open}>
        <Formik
          initialValues={this.state.values}
          enableReinitialize={false}
          validate={this.validate}
          onSubmit={this.handleSubmit}
          render={({ values, handleSubmit, isSubmitting, handleReset }) => (
            <form onSubmit={handleSubmit}>
              <SwipeableViews index={this.state.activeStep} disabled>
                <StepOne
                  handleTitleClick={this.handleTitleClick}
                  showPassword={this.state.showPassword}
                  titleChecked={this.state.titleChecked}
                  handlePasswordClick={this.handlePasswordClick}
                  requestPIN={this.requestPIN}
                />
                <StepTwo
                  displayText={this.state.timer.displayText}
                  requestPIN={this.requestPIN}
                />
              </SwipeableViews>
              {!this.state.titleChecked && (
                <LoginStepper
                  activeStep={this.state.activeStep}
                  handleBack={this.handleBack}
                  handleNext={this.handleNext}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                />
              )}
            </form>
          )}
        />
      </ResponsiveDialog>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
