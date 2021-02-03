import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DetectBrowserBack = () => {
   const [locationKeys, setLocationKeys] = useState([]);
   const history = useHistory();

   useEffect(() => {
      return () =>
         history.listen((location) => {
            if (history.action === 'PUSH') {
               setLocationKeys([location.key]);
            }

            if (history.action === 'POP') {
               if (locationKeys[1] === location.key) {
                  setLocationKeys(([_, ...keys]) => keys);

                  // Handle forward event

                  window.scrollTo(0, 0);
               } else {
                  setLocationKeys((keys) => [location.key, ...keys]);

                  window.scrollTo(0, 0);
               }
            }
         });
   }, [locationKeys]);
   return null;
};

export default DetectBrowserBack;
