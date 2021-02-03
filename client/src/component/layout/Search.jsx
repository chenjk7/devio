/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Options from '../taglist';

const useStyles = makeStyles((theme) => ({
   root: {
      color: 'inherit',
      marginTop: 0,
   },

   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      // transition: theme.transitions.create('width'),
      // [theme.breakpoints.up('md')]: {
      //    width: '550px',
      // },
      // overflowX: 'auto',
      // height: 64,
   },
}));

export default function Search({ onSetHeight }) {
   const classes = useStyles();
   const [height, setHeight] = useState(64);
   const [searchValue, setSarchValue] = useState([]);
   const [value, setValue] = React.useState([]);
   const onChange = (e) => {
      // onSetHeight();
   };
   useEffect(() => {
      onSetHeight(height);
   }, [value]);
   return (
      <div id="searchField">
         <Autocomplete
            multiple
            id="tags-standard"
            options={Options}
            value={value}
            onChange={(event, newValue) => {
               // onSetHeight();
               setValue([
                  ...newValue.filter((option) => Options.indexOf(option) != -1),
               ]);
            }}
            renderTags={(value, getTagProps) =>
               value.map((option, index) => (
                  <Chip
                     variant="outlined"
                     label={option}
                     {...getTagProps({ index })}
                  />
               ))
            }
            renderInput={(params) => (
               <TextField
                  className={classes.inputInput}
                  {...params}
                  variant="standard"
                  label=""
                  name="search"
                  onChange={onChange}
                  rows={1}
                  placeholder="search tags..."
               />
            )}
            // renderInput={(params) => (
            //    <TextField
            //       className={classes.inputInput}
            //       {...params}
            //       variant="standard"
            //       label=""
            //       multiline={true}
            //       rows={1}
            //       placeholder="search tags..."
            //    />
            // )}
         />
      </div>
   );
}
