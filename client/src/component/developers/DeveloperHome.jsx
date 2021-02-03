import React, { Fragment, useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DeveloperHomeIntro from './DeveloperHomeIntro';
import DeveloperHomeWall from './DeveloperHomeWall';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      // minHeight: 200,
      width: '100%',
      transition: 'height .5s ease',
   },
   grid: {
      width: '100%',
   },
   paper: {
      margin: 'auto',
      maxWidth: 500,
   },
   image: {
      width: 128,
      height: 128,
   },
   img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
   },
   tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
   },
   overview: {
      display: 'flex',
      marginBottom: theme.spacing(2),

      '&>:first-child': {
         marginRight: theme.spacing(1),
      },
   },
}));

const DeveloperHome = ({ profile, wallId }) => {
   const {
      experience,
      education,
      company,
      status,
      address,
      bio,
      socialMedia,
      contact,
   } = profile;
   const classes = useStyles();
   return (
      <div
         className={classes.root}
         // style={{ height: menuHeight }}
         // ref={aboutRef}
      >
         <Grid container spacing={5}>
            <Grid
               item
               sm={12}
               md={5}
               alignContent="flex-start"
               className={classes.grid}
            >
               <DeveloperHomeIntro profile={profile} />
            </Grid>
            <Grid item sm={12} md={7}>
               <DeveloperHomeWall wallId={wallId} />
            </Grid>
         </Grid>
      </div>
   );
};

export default DeveloperHome;
