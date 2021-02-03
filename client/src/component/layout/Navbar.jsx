import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PeopleIcon from '@material-ui/icons/People';
import ContactsIcon from '@material-ui/icons/Contacts';
import Tooltip from '@material-ui/core/Tooltip';
import Search from './Search';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/action/auth';
import { Hidden, Button, Avatar } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
   navbar: {
      paddingLeft: 10,
      paddingRight: 10,
      // position: 'fixed',
      // zIndex: 1,
      // margin: 'auto',
      // backgroundColor: 'white',
      ///================================================================================
      backgroundColor: 'white',
      // display:'block',
      [theme.breakpoints.up('lg')]: {
         zIndex: 1,
         position: 'fixed',
         width: '100vw',
         display: 'grid',
         // margin: 'auto 5px',
         backgroundColor: 'white',
         gridTemplateColumns:
            'minmax(auto,200px) minmax(1000px,auto) minmax(auto,200px)',
         maxHeight: 50,
      },
      maxHeight: 50,
   },
   appbar: {
      borderStyle: 'none',
      borderColor: 'hidden',
      WebkitBoxShadow: 'none',
      height: 50,
      margin: 0,
   },
   toolbar: {
      // padding: theme.spacing(1),
      minHeight: 50,
      marginTop: 0,
      borderStyle: 'none',
      borderColor: 'red',
      padding: 0,
   },
   grow: {
      flexGrow: 1,
      display: 'flex',
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'block',
      },
   },
   Tooltip: {},
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'transparent',
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.45),
         transition: 'ease .5s',
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: 600,
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing(3),
         // width: '550px',
      },
   },

   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },

   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'flex',
      },
   },
   sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
         display: 'none',
      },
   },
   navBtn: {
      marginTop: 0,
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: '10px',
   },
   LinkBTN: theme.LinkBTN,
   root: {
      flexGrow: 1,
      // overflowY: 'scroll',
   },
   body: {
      // backgroundColor: 'white',
      // maxWidth: 1000,
      width: '100%',
      [theme.breakpoints.down('md')]: {
         // padding: '15px',
         // height: '100vh',
      },
   },
   logo: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      borderRadius: '10px',
      '&:hover': {
         backgroundColor: '#EFEFEF',
      },
      padding: theme.spacing(1),
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 4,
      paddingBottom: 4,
      marginTop: 0,
   },
   avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
   },
}));

const Navbar = ({
   auth: { isAuthenticated, loading, user },
   logout,
   onSetHeight,
}) => {
   const classes = useStyles();
   const history = useHistory();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
   const { avatar, email } = user || {};
   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };
   const handleLogout = () => {
      handleMenuClose();
      logout(history);
   };

   const menuId = 'primary-search-account-menu';

   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <Link to="/dashboard" className={classes.LinkBTN}>
            <MenuItem onClick={handleMenuClose}>
               <IconButton>
                  <ContactsIcon />
               </IconButton>
               Dashboard
            </MenuItem>
         </Link>
         {user && (
            <Link
               to={{
                  pathname: `/developers/${user._id}`,
                  // key: uuidv4(),
                  state: {
                     applied: true,
                  },
               }}
               className={classes.LinkBTN}
            >
               <MenuItem onClick={handleMenuClose}>
                  <IconButton aria-label="" color="inherit">
                     {avatar ? (
                        <Avatar
                           className={classes.avatar}
                           src={avatar}
                        ></Avatar>
                     ) : (
                        <AccountCircle />
                     )}
                  </IconButton>
                  My account
               </MenuItem>
            </Link>
         )}
         <MenuItem onClick={handleLogout}>
            <IconButton aria-label="" color="inherit">
               <ExitToAppIcon />
            </IconButton>
            Log out
         </MenuItem>
      </Menu>
   );
   const logoutMenuMobile = (
      <Fragment>
         <Link to="/register" className={classes.LinkBTN}>
            <MenuItem onClick={handleMenuClose}>
               <IconButton aria-label="" color="inherit">
                  <i className="fas fa-user-plus fa-xs"></i>
               </IconButton>
               Register
            </MenuItem>
         </Link>
         <Link to="/login" className={classes.LinkBTN}>
            <MenuItem onClick={handleMenuClose}>
               <IconButton aria-label="" color="inherit">
                  <i className="fas fa-sign-in-alt fa-xs"></i>
               </IconButton>
               Sign in
            </MenuItem>
         </Link>
      </Fragment>
   );
   const mobileMenuId = 'primary-search-account-menu-mobile';
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         {isAuthenticated && (
            <Link to="/create-post" className={classes.LinkBTN}>
               <MenuItem onClick={handleMenuClose}>
                  <IconButton aria-label="" color="inherit">
                     <PostAddIcon />
                  </IconButton>
                  Add a post
               </MenuItem>
            </Link>
         )}

         <Link
            to={{
               pathname: `/posts`,
               key: uuidv4(),
               state: {
                  applied: true,
               },
            }}
            className={classes.LinkBTN}
         >
            <MenuItem onClick={handleMenuClose}>
               <IconButton aria-label="" color="inherit">
                  <img src="https://img.icons8.com/material/24/000000/summary-list.png" />
               </IconButton>
               Posts
            </MenuItem>
         </Link>
         <Link to="/developers" className={classes.LinkBTN}>
            <MenuItem onClick={handleMenuClose}>
               <IconButton aria-label="" color="inherit">
                  <PeopleIcon />
               </IconButton>
               Developers
            </MenuItem>
         </Link>
         {!loading &&
            (isAuthenticated ? (
               <div>
                  <MenuItem onClick={handleProfileMenuOpen}>
                     <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                     >
                        {avatar ? (
                           <Avatar
                              className={classes.avatar}
                              src={avatar}
                           ></Avatar>
                        ) : (
                           <AccountCircle />
                        )}
                     </IconButton>
                     <p>Profile</p>
                  </MenuItem>
               </div>
            ) : (
               logoutMenuMobile
            ))}
      </Menu>
   );

   return (
      <div className={classes.navbar} id="Navbar">
         {/* <Grid container className={classes.root} justify="center" spacing={12}>
            <Hidden mdDown>
               <Grid item xs={12} lg={2}></Grid>
            </Hidden>
            <Grid item xs={12} lg={8} className={classes.body}></Grid>
            <Hidden mdDown>
               <Grid item xs={12} lg={2}></Grid>
            </Hidden>
         </Grid> */}

         <div></div>
         {!loading && (
            <AppBar
               position="static"
               color="transparent"
               className={classes.appbar}
            >
               <Toolbar className={classes.toolbar}>
                  {/* <IconButton
                     edge="start"
                     className={classes.menuButton}
                     color="inherit"
                     variant="extended"
                     href="/"
                  > */}
                  <Link to="/" className={classes.LinkBTN}>
                     <div className={classes.logo}>
                        <i className="fab fa-dev fa-2x"></i>
                        <Typography variant="h6" noWrap>
                           &nbsp;io
                        </Typography>
                        {/* <div
                           style={{ marginLeft: '1rem' }}
                           className={classes.sectionDesktop}
                        ></div> */}
                     </div>
                  </Link>
                  {/* </IconButton> */}

                  {/* TODO, implement search function in the future */}
                  {/* <div className={classes.search}>
                     <div className={classes.searchIcon}>
                        <SearchIcon />
                     </div>
                     <Search onSetHeight={onSetHeight} />
                  </div> */}

                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                     {isAuthenticated && (
                        <Tooltip title="Add a new post">
                           <Link to="/create-post" className={classes.LinkBTN}>
                              <IconButton
                                 aria-label=""
                                 color="inherit"
                                 className={classes.navBtn}
                              >
                                 <PostAddIcon />
                              </IconButton>
                           </Link>
                        </Tooltip>
                     )}

                     <Tooltip title="Posts">
                        <Link
                           to={{
                              pathname: `/posts`,
                              key: uuidv4(),
                              state: {
                                 applied: true,
                              },
                           }}
                           className={classes.LinkBTN}
                        >
                           <IconButton
                              aria-label=""
                              color="inherit"
                              className={classes.navBtn}
                           >
                              <img src="https://img.icons8.com/material/24/000000/summary-list.png" />
                           </IconButton>
                        </Link>
                     </Tooltip>
                     <Tooltip title="Developers" className={classes.Tooltip}>
                        <IconButton
                           aria-label=""
                           href="/developers"
                           color="inherit"
                           className={classes.navBtn}
                        >
                           <PeopleIcon />
                        </IconButton>
                     </Tooltip>
                     <div>
                        {isAuthenticated ? (
                           <Tooltip title={`You are login as ${email}`}>
                              <IconButton
                                 edge="end"
                                 aria-label="account of current user"
                                 aria-controls={menuId}
                                 aria-haspopup="true"
                                 onClick={handleProfileMenuOpen}
                                 color="inherit"
                                 className={classes.navBtn}
                              >
                                 {avatar ? (
                                    <Avatar
                                       className={classes.avatar}
                                       src={avatar}
                                    ></Avatar>
                                 ) : (
                                    <AccountCircle />
                                 )}
                              </IconButton>
                           </Tooltip>
                        ) : (
                           <div className={classes.grow}>
                              <IconButton
                                 aria-label=""
                                 color="inherit"
                                 className={classes.navBtn}
                              >
                                 <Link
                                    to="/register"
                                    className={classes.LinkBTN}
                                 >
                                    <Typography variant="subtitle1">
                                       Register
                                    </Typography>
                                 </Link>
                              </IconButton>
                              <IconButton
                                 aria-label=""
                                 color="inherit"
                                 className={classes.navBtn}
                              >
                                 <Link to="/login" className={classes.LinkBTN}>
                                    <Typography variant="subtitle1">
                                       Sign in
                                    </Typography>
                                 </Link>
                              </IconButton>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className={classes.sectionMobile}>
                     <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                     >
                        <MoreIcon />
                     </IconButton>
                  </div>
               </Toolbar>
            </AppBar>
         )}
         {renderMobileMenu}
         {renderMenu}
         <div></div>
      </div>
   );
};

Navbar.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { logout })(Navbar);
