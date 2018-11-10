import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import { getDuration, decrementTimer } from "../../utils/timer";
import LoginDialog from "./Login";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";

const menuOptions = {
  vertical: "top",
  horizontal: "right"
};

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <DeleteIcon />, name: "Delete" }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  speedDial: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  appBar: {
    position: "absolute",
    marginLeft: "auto",
    [theme.breakpoints.up("md")]: {
      zIndex: theme.zIndex.drawer + 1
    }
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

//sign-out-alt
//sign-in-alt
const FAIconOutline = withStyles(styles)(
  ({ classes: { leftIcon }, faName, fontSize }) => {
    if (!fontSize) fontSize = 25;
    return (
      <Icon
        className={classNames(leftIcon, `fas fa-${faName}`)}
        color="inherit"
        style={{ fontSize }}
      />
    );
  }
);

class PrimarySearchAppBar extends Component {
  state = {
    isLoggedIn: false,
    speedDialOpen: false,
    isAdmin: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
    activeStep: 0,
    titleChecked: true,
    showPassword: false,
    open: false,
    timer: { displayText: "" },
    serverStatus: {
      loading: false,
      success: false,
      message: ""
    },
    _id: "",
    values: {
      email: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      password: "",
      confirm: "",
      pin: ""
    }
  };

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
        if (!email) errors.email = "";
        if (!password) errors.password = "";
        if (!titleChecked) {
          if (confirm !== password) errors.confirm = "Passwords don't match";
          if (!confirm) errors.confirm = "";
        }
        return errors;
      },
      1: ({ lastname, firstname, phonenumber, pin }) => {
        const errors = {};
        if (!phonenumber) errors.phonenumber = "";
        if (!pin) errors.pin = "";
        return errors;
      }
    };
    return validation[activeStep](values);
  };
  tempLogin = () => this.setState({ isLoggedIn: true, open: false });
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
  mainSubmit = (values, actions) => {
    sleep(300).then(() => {
      window.alert(JSON.stringify(values, null, 2));
      this.login();
      actions.setSubmitting(false);
    });
  };
  handleSubmitMain = (values, bag) => {
    if (this.state.activeStep) {
      return this.mainSubmit(values, bag);
    } else {
      this.handleNext(values);
      bag.setTouched({});
      bag.setSubmitting(false);
    }
  };

  handleSdClick = () => {
    this.setState(state => ({
      speedDialOpen: !state.speedDialOpen
    }));
  };

  handleSdOpen = () => {
    if (!this.state.isLoggedIn) {
      this.setState({
        speedDialOpen: true
      });
    }
  };

  handleSdClose = () => {
    this.setState({
      speedDialOpen: false
    });
  };

  handleOpenDialog = () =>
    this.setState({ open: true, mobileMoreAnchorEl: null });
  handleCloseDialog = () => this.setState({ open: false });
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

  handleMobileMenuOpen = event =>
    this.setState({ mobileMoreAnchorEl: event.currentTarget });

  handleMobileMenuClose = () => this.setState({ mobileMoreAnchorEl: null });

  login = () => this.setState({ isLoggedIn: true, open: false });
  logout = () => this.setState({ isLoggedIn: false, mobileMoreAnchorEl: null });
  render() {
    const { mobileMoreAnchorEl, isLoggedIn } = this.state;
    const { classes, drawerToggle } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={menuOptions}
        transformOrigin={menuOptions}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.logout} className={classes.button}>
          <FAIconOutline faName={`sign-out-alt`} />
          Logout
        </MenuItem>
        <MenuItem className={classes.button}>
          <AccountCircle className={classes.leftIcon} />
          Update
        </MenuItem>
      </Menu>
    );

    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="headline"
            color="inherit"
            className={classes.grow}
            noWrap
          >
            Season of Hope
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button color="inherit">
              <AccountCircle className={classes.leftIcon} />
              Update
            </Button>
            <Button
              color="inherit"
              onClick={isLoggedIn ? this.logout : this.handleOpenDialog}
              className={classes.button}
            >
              <FAIconOutline faName={`sign-${isLoggedIn ? "out" : "in"}-alt`} />
              {isLoggedIn ? "Logout" : "Sign In"}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            {!isLoggedIn && (
              <Button
                color="inherit"
                onClick={this.handleOpenDialog}
                className={classes.button}
              >
                <FAIconOutline faName={`sign-in-alt`} fontSize={20} />
                Login
              </Button>
            )}
            {isLoggedIn && (
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            )}

            {renderMobileMenu}
          </div>
        </Toolbar>
        <LoginDialog
          initialValues={this.state.values}
          onSubmit={this.mainSubmit}
          state={this.state}
          validate={this.validate}
          handleSubmitMain={this.handleSubmitMain}
          handleCloseDialog={this.handleCloseDialog}
          handleTitleClick={this.handleTitleClick}
          handlePasswordClick={this.handlePasswordClick}
          requestPIN={this.requestPIN}
          handleBack={this.handleBack}
          tempLogin={this.tempLogin}
        />
        <div
          style={{
            zIndex: 1101,
            display: this.state.speedDialOpen ? "block" : "none",
            opacity: 0.4,
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "black",
            height: "100vh",
            width: "100vw"
          }}
        />
        <SpeedDial
          ariaLabel="SpeedDial icon"
          className={classes.speedDial}
          hidden={!isLoggedIn}
          icon={<SpeedDialIcon />}
          onBlur={this.handleSdClose}
          onClick={this.handleSdClick}
          onClose={this.handleSdClose}
          open={this.state.speedDialOpen}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={this.handleSdClick}
            />
          ))}
        </SpeedDial>
      </AppBar>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
