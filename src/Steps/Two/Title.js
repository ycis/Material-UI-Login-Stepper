import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({ appBar: { position: "relative" } });
const StepTwoTitle = withStyles(styles)(
  ({ classes: { appBar }, displayText }) => (
    <AppBar className={appBar}>
      <Toolbar>
        <Grid container row alignItems={"center"} justify={"space-between"}>
          <Typography variant="h6" color="inherit">
            Account Info
          </Typography>
          <Typography variant="h6" color="inherit">
            {displayText}
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  )
);

export default StepTwoTitle;
