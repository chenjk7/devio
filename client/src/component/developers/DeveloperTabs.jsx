import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
   Button,
   Typography,
   Paper,
   Tabs,
   Tab,
   IconButton,
   Menu,
   Toolbar,
   Fab,
   MenuItem,
   Hidden,
   useMediaQuery,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import EditIconModal from './EditIconModal';
import { useHistory, Link } from 'react-router-dom';
import DeveloperAbout from './DeveloperAbout';
import DeveloperHome from './DeveloperHome';
import DeveloperFollows from './DeveloperFollows';
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   tabsbar: {},
   toolbar: {
      marginLeft: 'auto',
      marginRight: 0,
   },
   edit: {
      borderRadius: 8,
   },
   more: {
      borderRadius: 8,
   },
   tab: {
      width: 50,
      margin: 0,
      padding: 0,
   },
   tabdown: {
      display: 'flex',
      alignItems: 'baseline',
   },
   deleteacc: {
      color: 'red',
   },
   LinkBTN: theme.LinkBTN,
}));

const DeveloperTabs = ({
   auth,
   profiles,
   match,
   handleOpenCoverModal,
   children,
}) => {
   const { profile, loading, myprofile } = profiles;
   const history = useHistory();
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const desktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [anchorTab, setAnchorTab] = React.useState(null);

   const [openModal, setOpenModal] = React.useState(false);

   const handleOpenModal = () => {
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   const linkToTab = desktop
      ? {
           home: 0,
           about: 1,
           follows: 2,
        }
      : {
           home: 0,
           about: 1,
           follows: 1,
        };

   const [tabSelected, setTabSelected] = useState('');
   const [value, setValue] = useState(linkToTab[match.params.page]);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClickTabList = (event) => {
      setAnchorTab(event.currentTarget);
   };
   const handleClose = (e) => {
      setAnchorEl(null);
   };
   useEffect(() => {
      if (!match.params.page) {
         setTabSelected('home');
         setValue(linkToTab['home']);
      } else {
         setValue(linkToTab[match.params.page]);
         setTabSelected(match.params.page);
      }
   }, [desktop]);
   const onSelect = (tab) => {
      history.push(`/developers/${match.params.id}/${tab}`);
      setTabSelected(tab);
      setValue(linkToTab[tab]);
   };
   const onTabChange = (event, value) => {
      // switch (desktop) {
      //    case true:
      //       if (value == 2) {
      //          setAnchorTab(event.currentTarget);
      //       } else {
      //          setValue(value);
      //       }
      //    case false:
      //       if (value == 1) {
      //          setAnchorTab(event.currentTarget);
      //       } else {
      //          setValue(value);
      //       }
      // }
   };

   const handleCloseTabList = (e) => {
      setAnchorTab(null);
   };
   const HandleDelete = () => {
      // window.confirm('Are you sure?');
      setOpen(false);
   };

   const handleCancel = () => {
      setOpen(false);
   };

   const onDeleteAcc = () => {
      setOpen(true);
   };
   const DeleteAccDialog = (
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            {'Account removal agreement:'}
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Are you sure to delete your account! There is no reverse.
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button color="secondary" onClick={handleCancel}>
               Cancel
            </Button>
            <Button onClick={HandleDelete} color="primary" autoFocus>
               OK
            </Button>
         </DialogActions>
      </Dialog>
   );
   const tabMenu = (
      <Menu
         id="simple-menu"
         anchorEl={anchorEl}
         keepMounted
         open={Boolean(anchorEl)}
         onClose={handleClose}
         PaperProps={{
            style: {
               // width: '200px',
               marginTop: '60px',
            },
         }}
      >
         <Hidden mdUp>
            <Link to="/edit-profile" className={classes.LinkBTN}>
               <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
            </Link>
         </Hidden>
         <MenuItem
            onClick={() => {
               handleOpenModal();
               handleClose();
            }}
         >
            Edit profile icon
         </MenuItem>
         <Hidden mdUp>
            <MenuItem
               onClick={() => {
                  handleClose();
                  handleOpenCoverModal();
               }}
            >
               Edit Cover Photo
            </MenuItem>
         </Hidden>

         <MenuItem className={classes.deleteacc} onClick={onDeleteAcc}>
            Delete Account
         </MenuItem>
      </Menu>
   );
   const moreTabs = (
      <Menu
         id="simple-menu"
         anchorEl={anchorTab}
         keepMounted
         open={Boolean(anchorTab)}
         onClose={handleCloseTabList}
         PaperProps={{
            style: {
               // width: '200px',
               marginTop: '60px',
            },
         }}
      >
         {!desktop && (
            <MenuItem
               selected={tabSelected == 'about'}
               onClick={() => {
                  onSelect('about');
                  handleCloseTabList();
               }}
            >
               About
            </MenuItem>
         )}

         <MenuItem
            selected={tabSelected == 'follows'}
            onClick={() => {
               onSelect('follows');
               handleCloseTabList();
            }}
         >
            {/* <Link to="/Follows" className={classes.LinkBTN}> */}
            FOLLOWING
            {/* </Link> */}
         </MenuItem>
      </Menu>
   );
   return (
      <Fragment>
         <Paper className={classes.root}>
            <Tabs
               value={value}
               indicatorColor="primary"
               textColor="primary"
               onChange={onTabChange}
               className={classes.tabsbar}
            >
               <Tab onClick={() => onSelect('home')} name="home" label="Home" />

               {desktop && (
                  <Tab
                     onClick={() => onSelect('about')}
                     name="about"
                     label="About"
                  />
               )}

               <Tab
                  id="home"
                  className={classes.tab}
                  onClick={handleClickTabList}
                  label={
                     <span className={classes.tabdown}>
                        <p>More</p>&nbsp;
                        <i className="fas fa-sort-down fa-2x"></i>
                     </span>
                  }
               />
               {moreTabs}
               {!loading &&
               auth &&
               auth.user &&
               profile &&
               auth.user._id == profile.user._id ? (
                  <div className={classes.toolbar}>
                     <Toolbar className={classes.toolbar}>
                        <Hidden smDown>
                           <Link to="/edit-profile" className={classes.LinkBTN}>
                              <IconButton size="small" className={classes.edit}>
                                 <EditIcon />
                                 Edit Profile
                              </IconButton>
                           </Link>
                        </Hidden>
                        <IconButton
                           aria-label="more"
                           aria-controls="long-menu"
                           aria-haspopup="true"
                           className={classes.more}
                           onClick={handleClick}
                        >
                           <MoreHorizIcon />
                        </IconButton>
                        {tabMenu}
                     </Toolbar>
                     <EditIconModal
                        openModal={openModal}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        avatar={auth.user.avatar}
                     />
                  </div>
               ) : (
                  ''
               )}
            </Tabs>
            {DeleteAccDialog}
            {(tabSelected == 'home' || tabSelected == '') && (
               <TabPanel
                  linkToTab={linkToTab}
                  tabSelected={tabSelected}
                  tab="home"
                  index={linkToTab[tabSelected]}
               >
                  <DeveloperHome profile={profile} wallId={match.params.id} />
               </TabPanel>
            )}
            {tabSelected == 'about' && (
               <TabPanel
                  linkToTab={linkToTab}
                  tabSelected={tabSelected}
                  tab="about"
                  index={linkToTab[tabSelected]}
               >
                  <DeveloperAbout profile={profile} />
               </TabPanel>
            )}
            {tabSelected == 'follows' && auth && auth.isAuthenticated && (
               <TabPanel
                  linkToTab={linkToTab}
                  tabSelected={tabSelected}
                  tab="follows"
                  index={linkToTab[tabSelected]}
               >
                  {auth.user._id == profile.user._id ? (
                     <DeveloperFollows profile={myprofile} />
                  ) : (
                     <DeveloperFollows profile={profile} />
                  )}
               </TabPanel>
            )}
         </Paper>
         {children}
      </Fragment>
   );
};
function TabPanel(props) {
   const { children, linkToTab, tabSelected, tab, index, ...other } = props;
   const value = linkToTab[tabSelected];
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === linkToTab[tab] && <Typography>{children}</Typography>}
      </div>
   );
}
DeveloperTabs.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      profiles: state.profiles,
   };
};
export default connect(mapStateToProp)(DeveloperTabs);
