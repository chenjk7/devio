import React, { Fragment, useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Tabs, Tab, Box } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import SchoolIcon from '@material-ui/icons/School';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Moment from 'react-moment';
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      // minHeight: 200,
      transition: 'height .5s ease',
   },
   grid: {},
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
      wordWrap: 'anywhere',
      display: 'flex',
      marginBottom: theme.spacing(2),

      '&>:first-child': {
         marginRight: theme.spacing(1),
      },
   },
}));
function a11yProps(index) {
   return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
   };
}
function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

const DeveloperAbout = ({ profile }) => {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);
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
   const aboutRef = useRef(null);
   const [menuHeight, setMenuHeight] = useState(300);
   const handleChange = (event, newValue) => {
      setValue(newValue);
      // setMenuHeight(;
   };

   useEffect(() => {
      setMenuHeight(
         aboutRef.current?.firstChild.offsetHeight > 300
            ? aboutRef.current?.firstChild.offsetHeight
            : 300
      );
   }, [value]);
   const edu = education ? education[0] : null;
   const overview = (
      <Fragment>
         {status && (
            <Typography variant="body1" className={classes.overview}>
               <WorkIcon />
               <Typography variant="subtitle1" color="initial">
                  {status} at {company}
               </Typography>
            </Typography>
         )}
         {edu && (
            <Typography variant="body1" className={classes.overview}>
               <SchoolIcon />
               <Typography variant="subtitle1" color="initial">
                  {`Studied at ${edu.school}`}
                  <div>
                     {' '}
                     {edu && `Major in ${edu.major} from `}
                     <Moment format="YYYY">{edu.from}</Moment> to{' '}
                     <Moment format="YYYY">{edu.to}</Moment>{' '}
                  </div>
               </Typography>
            </Typography>
         )}
         {address && (
            <Fragment>
               <Typography variant="body1" className={classes.overview}>
                  <HomeIcon />
                  <Typography variant="subtitle1" color="initial">
                     {address}
                  </Typography>
               </Typography>
               <Typography variant="body1" className={classes.overview}>
                  <ChatIcon />
                  <Typography variant="subtitle1" color="initial">
                     {bio}
                  </Typography>
               </Typography>
            </Fragment>
         )}
      </Fragment>
   );
   const Education = (
      <Fragment>
         {education ? (
            education.map((edu) => (
               <Typography variant="body1" className={classes.overview}>
                  <SchoolIcon />
                  <Typography variant="subtitle1" color="initial">
                     {edu && `Studied at ${edu.school}`}
                     <div>
                        {' '}
                        {edu && `Major in ${edu.major} from `}
                        <Moment format="YYYY">{edu.from}</Moment> to{' '}
                        <Moment format="YYYY">{edu.to}</Moment>{' '}
                     </div>
                  </Typography>
               </Typography>
            ))
         ) : (
            <div>No education found.</div>
         )}
      </Fragment>
   );
   const Address = (
      <Fragment>
         {address ? (
            <Typography variant="body1" className={classes.overview}>
               <HomeIcon />
               <Typography variant="subtitle1" color="initial">
                  {address}
               </Typography>
            </Typography>
         ) : (
            <div>You need update your profile.</div>
         )}
      </Fragment>
   );
   const Experience = (
      <Fragment>
         {experience ? (
            experience.map((exp) => (
               <Typography variant="body1" className={classes.overview}>
                  <WorkIcon />
                  <Typography variant="subtitle1" color="initial">
                     {exp && `${exp.title} at ${exp.company}`}
                     <div>{exp.description}</div>
                     <div>
                        <Moment format="YYYY">{exp.from}</Moment> to{' '}
                        <Moment format="YYYY">{exp.to}</Moment>{' '}
                     </div>
                  </Typography>
               </Typography>
            ))
         ) : (
            <div>No work experience found.</div>
         )}
      </Fragment>
   );
   //     PhoneIcon
   //  EmailIcon
   //  TwitterIcon
   //  InstagramIcon
   //  LinkedInIcon
   const Contact = (
      <Fragment>
         {!contact && !socialMedia && <div>You need update your profile.</div>}
         {contact ? (
            <Fragment>
               {contact.phone && (
                  <Typography variant="body1" className={classes.overview}>
                     <PhoneIcon />
                     <Typography variant="subtitle1" color="initial">
                        {contact.phone}
                     </Typography>
                  </Typography>
               )}{' '}
               {contact.email && (
                  <Typography variant="body1" className={classes.overview}>
                     <EmailIcon />
                     <Typography variant="subtitle1" color="initial">
                        {contact.email}
                     </Typography>
                  </Typography>
               )}
            </Fragment>
         ) : (
            ''
         )}

         {socialMedia ? (
            <Fragment>
               {socialMedia.linkedin && (
                  <Typography variant="body1" className={classes.overview}>
                     <LinkedInIcon />
                     <Typography variant="subtitle1" color="initial">
                        {socialMedia.linkedin}
                     </Typography>
                  </Typography>
               )}
               {socialMedia.facebook && (
                  <Typography variant="body1" className={classes.overview}>
                     <FacebookIcon />
                     <Typography variant="subtitle1" color="initial">
                        {socialMedia.facebook}
                     </Typography>
                  </Typography>
               )}{' '}
               {socialMedia.instagram && (
                  <Typography variant="body1" className={classes.overview}>
                     <InstagramIcon />
                     <Typography variant="subtitle1" color="initial">
                        {socialMedia.instagram}
                     </Typography>
                  </Typography>
               )}
            </Fragment>
         ) : (
            ''
         )}
      </Fragment>
   );
   return (
      <div
         className={classes.root}
         style={{ height: menuHeight }}
         ref={aboutRef}
      >
         <Grid container spacing={5} justify="stretch">
            <Grid
               item
               xs={12}
               sm={3}
               alignContent="flex-start"
               className={classes.grid}
            >
               <Tabs
                  orientation="vertical"
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  onClick={onclick}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}
               >
                  <Tab label="Overview" {...a11yProps(0)} />
                  <Tab label="Education" {...a11yProps(1)} />
                  <Tab label="Work Experience" {...a11yProps(2)} />
                  <Tab label="Location" {...a11yProps(3)} />
                  <Tab label="Contact info" {...a11yProps(4)} />
               </Tabs>
            </Grid>
            <Grid item xs={12} sm={9}>
               <TabPanel value={value} index={0}>
                  {overview}
               </TabPanel>
               <TabPanel value={value} index={1}>
                  {Education}
               </TabPanel>
               <TabPanel value={value} index={2}>
                  {Experience}
               </TabPanel>
               <TabPanel value={value} index={3}>
                  {Address}
               </TabPanel>
               <TabPanel value={value} index={4}>
                  {Contact}
               </TabPanel>
            </Grid>
         </Grid>
      </div>
   );
};

export default DeveloperAbout;
