import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { getProfiles } from '../redux/action/profiles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import NavigationIcon from '@material-ui/icons/Navigation';
import {
   Chip,
   Card,
   CardContent,
   CardMedia,
   IconButton,
   Typography,
   CardHeader,
   CardActions,
   Collapse,
   Avatar,
   Tooltip,
} from '@material-ui/core';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
   main: {
      padding: 15,
   },
   root: {
      display: 'flex',
      marginTop: theme.spacing(2),
   },

   cover: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      borderRadius: '50%',
      padding: theme.spacing(2),
   },

   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: 'rotate(180deg)',
   },
   avatar: {
      backgroundColor: red[500],
   },
   LinkBTN: theme.LinkBTN,
   cardcontent: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',

      [theme.breakpoints.down('sm')]: {
         flexDirection: 'column',
      },
   },
   large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
   },
   details: { width: '100%' },
   skills: {
      '& > *': {
         margin: theme.spacing(0.5),
      },
   },
   name: {
      fontWeight: 'bold',
   },
}));

const Developersitem = ({
   auth: { loading, user, isAuthenticated },
   profile,
   getProfiles,
}) => {
   const {
      user: profile_user,
      status,
      company,
      location,
      bio,
      skills,
   } = profile;
   const { _id, name, avatar, date } = profile_user || {};
   const classes = useStyles();
   const theme = useTheme();
   const [expanded, setExpanded] = React.useState(false);
   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   return (
      profile_user && (
         <Card className={classes.root}>
            <div className={classes.details}>
               <Link to={`/developers/${_id}`} className={classes.LinkBTN}>
                  <CardHeader
                     avatar={
                        <IconButton>
                           <Avatar className={classes.large}>
                              <CardMedia
                                 className={classes.cover}
                                 image={avatar}
                                 title="Live from space album cover"
                              />
                           </Avatar>
                        </IconButton>
                     }
                     title={<div className={classes.name}>{name}</div>}
                     subheader={
                        <p>
                           Registered since{' '}
                           <Moment format="YYYY/MM/DD">{date}</Moment>
                        </p>
                     }
                     action={
                        !loading &&
                        isAuthenticated &&
                        user._id == _id && (
                           <Link to="/edit-profile" className={classes.LinkBTN}>
                              <Tooltip title="Edit your profile">
                                 <IconButton aria-label="settings">
                                    <i className="fas fa-user-edit"></i>
                                 </IconButton>
                              </Tooltip>
                           </Link>
                        )
                     }
                  />
               </Link>
               <CardContent className={classes.cardcontent}>
                  <div>
                     <Typography variant="h6" color="primary">
                        Status:
                     </Typography>
                     <Typography variant="subtitle1">
                        {status} at {company}
                     </Typography>
                  </div>
                  <div className={classes.skills}>
                     {profile.skills.map((skill) => (
                        <Chip size="small" label={skill} color="primary" />
                     ))}
                  </div>
               </CardContent>
               {bio && (
                  <Fragment>
                     <CardActions disableSpacing>
                        <IconButton
                           className={clsx(classes.expand, {
                              [classes.expandOpen]: expanded,
                           })}
                           onClick={handleExpandClick}
                           aria-expanded={expanded}
                           aria-label="show more"
                        >
                           <NavigationIcon />
                        </IconButton>
                     </CardActions>
                     <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                           {bio && (
                              <Fragment>
                                 <Typography variant="h6" color="primary">
                                    Biography:
                                 </Typography>
                                 <Typography paragraph>{bio}</Typography>
                              </Fragment>
                           )}
                        </CardContent>
                     </Collapse>
                  </Fragment>
               )}
            </div>
         </Card>
      )
   );
};

Developersitem.propTypes = {};

const mapStateToProp = (state, ownProps) => {
   return {
      profiles: state.profiles.profiles,
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { getProfiles })(Developersitem);
