import React, { Fragment } from 'react';
import EditProfileForm from './EditProfileForm';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
   const history = useHistory();
   const handhleGoBack = () => {
      history.goBack();
   };
   return (
      <Fragment>
         <EditProfileForm handhleGoBack={handhleGoBack} />
      </Fragment>
   );
};

export default EditProfile;
