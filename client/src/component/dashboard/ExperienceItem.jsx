import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
   TableRow,
   TableCell,
   IconButton,
   Hidden,
   Collapse,
   Box,
   Typography,
} from '@material-ui/core';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
      [theme.breakpoints.down('sm')]: {
         width: '90vw',
      },
      overflowX: 'auto',
   },
   table: {
      minWidth: 500,
   },
   desTitle: {
      fontWeight: 'bold',
   },
   description: {
      marginLeft: 10,
   },
}));
const ExperienceItem = ({ exp, onDeleteExp }) => {
   const [open, setOpen] = React.useState(false);
   const classes = useStyles();
   return (
      <Fragment>
         <StyledTableRow key={exp._id}>
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <StyledTableCell component="th" scope="row">
               {exp.company}
            </StyledTableCell>
            <StyledTableCell>{exp.title}</StyledTableCell>
            <Hidden smDown>
               <StyledTableCell>
                  <Moment format="MM/DD/YYYY">{exp.from}</Moment> &nbsp;to&nbsp;
                  <Moment format="MM/DD/YYYY">{exp.to}</Moment>
               </StyledTableCell>
            </Hidden>
            <StyledTableCell>
               <IconButton onClick={() => onDeleteExp(exp._id)}>
                  <DeleteIcon />
               </IconButton>
            </StyledTableCell>
         </StyledTableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                     <Typography
                        className={classes.desTitle}
                        variant="h7"
                        gutterBottom
                        component="div"
                     >
                        Description:
                     </Typography>
                     <Typography
                        className={classes.description}
                        variant="p"
                        gutterBottom
                        component="div"
                     >
                        {exp.description}
                     </Typography>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </Fragment>
   );
};

ExperienceItem.propTypes = {};

export default ExperienceItem;
