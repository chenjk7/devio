import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({
   component: Component,
   auth: { isAuthenticated, loading },
   ...rest
}) => (
   <Route
      {...rest}
      render={(props) =>
         !isAuthenticated && !loading ? (
            <Redirect to="/login" />
         ) : (
            <Component {...props} />
         )
      }
   />
);

PrivateRoute.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};

export default connect(mapStateToProp)(PrivateRoute);
