import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
   Paper,
   TableRow,
   TableHead,
   TableCell,
   TableBody,
   Table,
   TableContainer,
   Hidden,
} from '@material-ui/core';
import ExperienceItem from './ExperienceItem';

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: '#13284a',
      color: theme.palette.common.white,
   },
   body: {
      fontSize: 14,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
      overflowX: 'scroll',
   },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
   main: {
      [theme.breakpoints.down('md')]: {
         width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
         width: '85vw',
      },
      overflowX: 'auto',
   },
   table: {
      minWidth: 500,
   },
}));
const Experiences = ({ experience, onDeleteExp }) => {
   const classes = useStyles();

   const expList =
      experience &&
      experience.map((exp) => (
         <ExperienceItem exp={exp} onDeleteExp={onDeleteExp} />
      ));
   return (
      <div className={classes.main}>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell></StyledTableCell>
                     <StyledTableCell>Company</StyledTableCell>
                     <StyledTableCell>Title</StyledTableCell>
                     <Hidden smDown>
                        <StyledTableCell>Years</StyledTableCell>
                     </Hidden>
                     <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
               </TableHead>

               <TableBody>{expList}</TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

Experiences.propTypes = {};

export default Experiences;
