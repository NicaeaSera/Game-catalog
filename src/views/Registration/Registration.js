import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { AirlineSeatReclineExtraOutlined } from '@material-ui/icons'

function sendRegistrationRequest(login, password, confirm_password){
  if(login === ""){
    alert("Incorrect mail");
    return
  }
  if(password != confirm_password){
    alert("Password do not match");
    window.location.href = "/registration";
    return
  }

  let logarr = Array.from(login);
  let tempA = Array.from(password);
  if(tempA.length < 4){
    alert("password lenght must be atleast 4");    
    window.location.href = "/registration";
    return
  }
  tempA ="";
  for(let i = 0; i < logarr.length; i += 1){
    if(logarr[i] === "@"){
      if(tempA === logarr[i]){
        alert("incorrect login");
        tempA = "";
        window.location.href = "/registration";
        return
      }
      tempA = logarr[i];
    }
  };

  if(login != "" && password === confirm_password && tempA === "@"){
    fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({ email: login, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })      
  .then(response => 
    {
      if(response.ok){
        alert("Success!");
        window.location.href = "/log_in";
        return
      }
      if(!response.ok){
        alert("incorrect login");
        window.location.href = "/registration";
        return
      }
      window.location.href = "/registration";  
      alert("error");
    })        
  }
  window.location.href = "/registration";
  return
  
  
  
  
}

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      confirm_password: ""
    };
  }
  
 
  handleSubmit = (event) => {
    event.preventDefault()

    const data = new FormData(event.target)
    const value = Object.fromEntries(data.entries())
    console.log({ value })
  }

  renderCopyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="https://material-ui.com/">Your Website</Link>
      &nbsp;{new Date().getFullYear()}.
    </Typography>
  )
  
  render() {
    const { classes } = this.props

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
            <form className={classes.form} noValidate id="form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={() => this.setState({login: document.getElementById("email").value})}
          />
          <p>TEST{this.state.login}  {this.state.password} {this.state.confirm_password}</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={() => this.setState({password: document.getElementById("password").value})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm password"
            type="password"
            id="confirm_password"
            onChange={() => this.setState({confirm_password: document.getElementById("confirm_password").value})}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => sendRegistrationRequest(this.state.login, this.state.password, this.state.confirm_password)}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
            <Link href="create-page-here" variant="body2">
              Forgot password?
            </Link>
            </Grid>
            <Grid item>
            <Link href="registration" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            {this.renderCopyright()}
          </Box>
          </form>
        </div>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

export default withStyles(styles)(Registration)