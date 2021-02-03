import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CreateProfileForm from '../profiles/CreateProfileForm';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      height: '100vh',

      [theme.breakpoints.down('sm')]: {
         // margin: theme.spacing(1),
         marginBottom: 20,
      },
      // backgroundColor: '#F4F4F4',
      // marginTop: theme.spacing(2),
   },
   button: {
      marginRight: theme.spacing(1),
   },
   instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
   stepper: {
      // [theme.breakpoints.down(470)]: {
      //    transform: 'scale(.8)',
      //    maxWidth: '150%',
      //    marginLeft: -80,
      //    // display: 'none',
      // },
      [theme.breakpoints.down(320)]: {
         // transform: 'scale(.75)',
         maxWidth: '500',
         marginLeft: -75,
         padding: 0,
         // display: 'none',
      },
   },
   LinkBTN: theme.LinkBTN,
}));

function getSteps() {
   return [
      'Regiser an account',
      'Create an profile',
      'Add experience',
      'Add education',
   ];
}

const Register = ({ auth: { isAuthenticated, loading }, profile }) => {
   const mobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));
   const getStepContent = (step) => {
      switch (step) {
         case 0:
            return <RegisterForm />;
         case 1:
            if (!loading) {
               if (!profile) {
                  return <CreateProfileForm redirect={false} />;
               } else {
                  return <div>Profile Created</div>;
               }
            } else {
               return <div></div>;
            }
         case 2:
            return 'exp';
         case 3:
            return 'edu';
         default:
            return 'Unknown step';
      }
   };
   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();
   const token = '';
   const isStepOptional = (step) => {
      return step === 1 || step === 2 || step === 3;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleSkip = (e) => {
      e.preventDefault();
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setSkipped(new Set([...skipped.values(), activeStep]));

      // setSkipped((prevSkipped) => {
      //    const newSkipped = new Set(prevSkipped.values());
      //    newSkipped.add(activeStep);
      //    return newSkipped;
      // });

      if (activeStep == 1) {
         setActiveStep(activeStep + 3);
         setSkipped(
            new Set([
               ...skipped.values(),
               activeStep,
               activeStep + 1,
               activeStep + 2,
            ])
         );
      }
   };

   const handleReset = () => {
      setActiveStep(0);
   };
   return (
      <Fragment>
         {/* {isAuthenticated ? (
            // <Redirect to="/" />
         ) : ( */}
         <div className={classes.root}>
            <Stepper
               activeStep={activeStep}
               orientation={mobile ? 'vertical' : 'horizontal'}
               className={classes.stepper}
            >
               {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                     labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                     );
                  }
                  if (isStepSkipped(index)) {
                     stepProps.completed = false;
                  }
                  return (
                     <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                     </Step>
                  );
               })}
            </Stepper>
            <div>
               {activeStep === steps.length ? (
                  <div>
                     <Typography className={classes.instructions}>
                        Regiseration completed - you&apos;re finished
                     </Typography>
                     <Link to="/" className={classes.LinkBTN}>
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={handleReset}
                           className={classes.button}
                        >
                           Go to Home
                        </Button>
                     </Link>
                  </div>
               ) : (
                  <div>
                     <Typography className={classes.instructions}>
                        {getStepContent(activeStep)}
                     </Typography>
                     <div>
                        {activeStep != 0 && activeStep != 1 && (
                           <Button
                              disabled={activeStep === 0 || activeStep === 1}
                              onClick={handleBack}
                              className={classes.button}
                           >
                              Back
                           </Button>
                        )}
                        {isStepOptional(activeStep) && (
                           <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSkip}
                              className={classes.button}
                           >
                              Skip
                           </Button>
                        )}
                        {isAuthenticated && (
                           <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              className={classes.button}
                           >
                              {activeStep === steps.length - 1
                                 ? 'Finish'
                                 : 'Next'}
                           </Button>
                        )}
                        {isAuthenticated && activeStep == 0 && (
                           <Link to="/" className={classes.LinkBTN}>
                              <Button
                                 variant="contained"
                                 color="primary"
                                 onClick={handleReset}
                                 className={classes.button}
                              >
                                 Go to Home
                              </Button>
                           </Link>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
         {/* )} */}
      </Fragment>
   );
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      profile: state.profiles.profile,
   };
};
export default connect(mapStateToProp)(Register);
