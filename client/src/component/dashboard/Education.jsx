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
   IconButton,
   TableContainer,
   Hidden,
} from '@material-ui/core';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

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
const Education = ({ education, onDeleteEdu }) => {
   const classes = useStyles();
   const eduList =
      education &&
      education.map((edu) => (
         <StyledTableRow key={edu._id}>
            <StyledTableCell component="th" scope="row">
               {edu.school}
            </StyledTableCell>
            <StyledTableCell>{edu.major}</StyledTableCell>
            <StyledTableCell>{edu.degree}</StyledTableCell>
            <Hidden xsDown>
               <StyledTableCell>
                  <Moment format="MM/DD/YYYY">{edu.from}</Moment> &nbsp;to&nbsp;
                  <Moment format="MM/DD/YYYY">{edu.to}</Moment>
               </StyledTableCell>
            </Hidden>
            <StyledTableCell>
               <IconButton onClick={() => onDeleteEdu(edu._id)}>
                  <DeleteIcon />
               </IconButton>
            </StyledTableCell>
         </StyledTableRow>
      ));
   return (
      <div className={classes.main}>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>School</StyledTableCell>
                     <StyledTableCell>Major</StyledTableCell>
                     <StyledTableCell>Degree</StyledTableCell>
                     <Hidden xsDown>
                        <StyledTableCell>Years</StyledTableCell>
                     </Hidden>
                     <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
               </TableHead>

               <TableBody>{eduList}</TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

Education.propTypes = {};

export default Education;
