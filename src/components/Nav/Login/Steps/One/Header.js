import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Switch from "react-switch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  userPlusIcon: {
    fontSize: 25,
    marginLeft: 3,
    marginTop: 2
  },
  signInIcon: {
    fontSize: 23,
    margin: 3,
    marginLeft: 2,
    marginTop: 2
  }
});

const fas = "fas fa-inverse";
const CheckedIcon = withStyles(styles)(({ classes: { signInIcon } }) => (
  <Icon className={classNames(`${fas} fa-sign-in-alt`, signInIcon)} />
));
const UncheckedIcon = withStyles(styles)(({ classes: { userPlusIcon } }) => (
  <PersonAdd className={userPlusIcon} />
));

const StepOneHeader = withStyles(styles)(
  ({
    classes: { appBar },
    titleChecked,
    handleTitleClick,
    handleCloseDialog
  }) => (
    <AppBar className={appBar}>
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          onClick={handleCloseDialog}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <Grid container row alignItems={"center"} justify={"space-between"}>
          {titleChecked ? (
            <Typography variant="h6" color="inherit">
              Sign in
            </Typography>
          ) : (
            <Typography variant="h6" color="inherit">
              Register/Reset
            </Typography>
          )}
          <Switch
            offColor={"#4286f4"}
            onChange={handleTitleClick}
            checked={titleChecked}
            uncheckedIcon={<CheckedIcon />}
            checkedIcon={<UncheckedIcon />}
          />
        </Grid>
      </Toolbar>
    </AppBar>
  )
);

export default StepOneHeader;
