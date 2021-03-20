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


function sendAuthorisationRequest(login, password){
    fetch('http://localhost:3004/login', {
    method: 'POST',
    body: JSON.stringify({ email: login, password: password }),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => 
    {
      console.log(response);
      if(response.ok){
        alert("welcome back!");
        localStorage.setItem("login", login);
        localStorage.setItem("isAuthorised", "LOGGED_IN");
        localStorage.setItem("password", password);
        localStorage.setItem("logLink", "/log_out");
        localStorage.setItem("logMsg", "Log Out");        
        window.location.href = "/"
        return
      }
      if(!response.ok){
        alert("incorrect username or password");
        return
      }
    }
  )
  
}


class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""};
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
          Sign in
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
          <p>TEST {this.state.login}  {this.state.password}</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={() => this.setState({password: document.getElementById("password").value})}
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
            onClick={() => sendAuthorisationRequest(this.state.login, this.state.password)}
          >
            Sign In
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

export default withStyles(styles)(Sign)