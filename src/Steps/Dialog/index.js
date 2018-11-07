import React from "react";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = props => <Slide direction="up" {...props} />;
const ResponsiveDialog = withMobileDialog({ breakpoint: "xs" })(
  ({ fullScreen, open, children }) => (
    <Dialog
      maxWidth={"xs"}
      scroll="body"
      keepMounted
      aria-labelledby="responsive-dialog-title"
      fullScreen={fullScreen}
      open={open}
      TransitionComponent={Transition}
    >
      {children}
    </Dialog>
  )
);

export default ResponsiveDialog;
