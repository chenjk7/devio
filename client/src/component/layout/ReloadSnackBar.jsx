import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getInfinitWall, getInitialWall } from "../redux/action/wall";

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: "#4CAF50",
   },
}));

function ReloadSnackBar({ wall, getInitialWall }) {
   const {
      wall: { user: wallUser, posts, hasMoreItems, page, pageCount },
      loading: isWallloading,
      newWallPosts,
   } = wall || {};
   const { _id: wallId } = wallUser || {};
   const [open, setOpen] = React.useState(false);
   const classes = useStyles();
   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }

      setOpen(false);
   };
   const handleConfirm = () => {
      // window.location.reload();
      window.scroll(0, 0);
      getInitialWall(wallId, 1);
   };

   return (
      <div>
         <Snackbar
            anchorOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
            ContentProps={{
               classes: {
                  root: classes.root,
               },
            }}
            open={newWallPosts}
            onClose={handleClose}
            message="Found new posts"
            action={
               <div className={classes.root}>
                  <Button
                     variant="contained"
                     size="small"
                     onClick={handleConfirm}
                  >
                     Reload
                  </Button>
                  <IconButton
                     size="small"
                     aria-label="close"
                     color="inherit"
                     onClick={handleClose}
                  >
                     <CloseIcon fontSize="small" />
                  </IconButton>
               </div>
            }
         />
      </div>
   );
}
const mapStateToProp = (state, ownProps) => {
   return {
      wall: state.wall,
   };
};
export default connect(mapStateToProp, { getInitialWall })(ReloadSnackBar);
