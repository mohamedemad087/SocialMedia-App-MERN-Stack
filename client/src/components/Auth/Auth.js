import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Icon from './icon';
import Input from './input';
import { signup, signin } from '../../actions/authActions';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [ showPass, setShowPass ] = useState(false);
  const [ isSignup, setIsSignup ] = useState(false);
  const [ formData, setFormData ] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  const googleSuccess = async (res) => {
    /* Optional chaining operator: special operator that's not going to throw an error if we don't have access to the res object */
    /* If use . and res object didn't exist , getting error: cannot get property profileObj of undefined */
    /* By using ?. it going to say undefined */
    const result = res?.profileObj; // profileObj is the data of the gmail account like name, email, etc..
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token }});

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try again later')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPass ? "text" : "password"} handleShowPass={() => setShowPass((prev) => !prev)} />
            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary" >
              { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
              clientId="825887520203-ra96qoonfjb8do082novkate3ofstt3t.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"

          />
          <Grid container justify="flex-end">
              <Grid item >
                <Button onClick={() => setIsSignup((prev) => !prev)}>
                  { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
