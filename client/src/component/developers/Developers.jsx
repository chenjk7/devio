import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles, getInfinitProfiles } from '../redux/action/profiles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Developersitem from './Developersitem';
import { getMyProfile } from '../redux/action/profiles';
import InfiniteScroll from 'react-infinite-scroller';
import ProgressCir from '../layout/ProgressCir';

const useStyles = makeStyles((theme) => ({
   main: {
      // padding: 15,
   },
   root: {
      display: 'flex',
      // marginTop: theme.spacing(2),
   },

   cover: {
      maxWidth: 251,

      maxHeight: 251,

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
}));

const Developers = ({
   auth,
   profiles: { loading, profiles },
   getProfiles,
   getMyProfile,
   getInfinitProfiles,
}) => {
   const classes = useStyles();
   const theme = useTheme();
   const [expanded, setExpanded] = React.useState(false);
   const { page, hasMoreItems, pageCount, profiles: allProfiles } = profiles;

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   useEffect(() => {
      if (auth.token) {
         getMyProfile();
      }
      getProfiles();
   }, []);

   return (
      <Fragment>
         <InfiniteScroll
            pageStart={1}
            loadMore={(p) => {
               !loading && getInfinitProfiles(page ? page + 1 : 1);
            }}
            key={page}
            hasMore={hasMoreItems}
            loader={<ProgressCir key={page} />}
            loadpagesbeforestop={pageCount}
            renderpagescount={pageCount}
         >
            <div className={classes.main}>
               <Typography variant="h3">Developers</Typography>
               {allProfiles &&
                  allProfiles.map((profile, indx) => (
                     <Developersitem key={indx} profile={profile} />
                  ))}
            </div>
         </InfiniteScroll>
      </Fragment>
   );
};

Developers.propTypes = {};

const mapStateToProp = (state, ownProps) => {
   return {
      profiles: state.profiles,
      auth: state.auth,
   };
};
export default connect(mapStateToProp, {
   getProfiles,
   getMyProfile,
   getInfinitProfiles,
})(Developers);
