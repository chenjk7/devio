import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import ChatIcon from '@material-ui/icons/Chat';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
   root: {
      // minWidth: 275,
      width: '100%',
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },

   intro: {
      display: 'flex',
      marginBottom: theme.spacing(2),

      '&>:first-child': {
         marginRight: theme.spacing(1),
      },
   },
   textwrap: {
      wordWrap: 'anywhere',
   },
}));

export default function DeveloperHomeIntro({
   profile: { bio, socialMedia, homepage, contact },
}) {
   const classes = useStyles();
   const { facebook, linkedin, instagram } = socialMedia || {};
   const { email, phone } = contact || {};
   return (
      <Card className={classes.root} variant="outlined">
         <CardContent>
            <div>
               <Typography
                  className={classes.title}
                  // color="textSecondary"
                  gutterBottom
               >
                  Intro
               </Typography>
               {bio && (
                  <Typography variant="body1" className={classes.intro}>
                     <ChatIcon />
                     <Typography
                        className={classes.textwrap}
                        variant="subtitle1"
                        color="initial"
                     >
                        {bio}
                     </Typography>
                  </Typography>
               )}
               {homepage && (
                  <Typography variant="body1" className={classes.intro}>
                     <LanguageIcon />
                     <Typography
                        variant="subtitle1"
                        className={classes.textwrap}
                        color="initial"
                     >
                        {homepage}
                     </Typography>
                  </Typography>
               )}
               {linkedin && (
                  <Typography variant="body1" className={classes.intro}>
                     <LinkedInIcon />
                     <Typography
                        className={classes.textwrap}
                        variant="subtitle1"
                        color="initial"
                     >
                        {linkedin}
                     </Typography>
                  </Typography>
               )}
               {facebook && (
                  <Typography variant="body1" className={classes.intro}>
                     <FacebookIcon />
                     <Typography
                        variant="subtitle1"
                        color="initial"
                        className={classes.textwrap}
                     >
                        {facebook}
                     </Typography>
                  </Typography>
               )}
               {instagram && (
                  <Typography variant="body1" className={classes.intro}>
                     <InstagramIcon />
                     <Typography
                        className={classes.textwrap}
                        variant="subtitle1"
                        color="initial"
                     >
                        {instagram}
                     </Typography>
                  </Typography>
               )}
               {email && (
                  <Typography variant="body1" className={classes.intro}>
                     <EmailIcon />
                     <Typography
                        className={classes.textwrap}
                        variant="subtitle1"
                        color="initial"
                     >
                        {email}
                     </Typography>
                  </Typography>
               )}

               {phone && (
                  <Typography variant="body1" className={classes.intro}>
                     <PhoneIcon />
                     <Typography
                        className={classes.textwrap}
                        variant="subtitle1"
                        color="initial"
                     >
                        {phone}
                     </Typography>
                  </Typography>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
