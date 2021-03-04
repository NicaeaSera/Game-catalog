import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles'
/*
class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""};
        }

}
*/
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
 /* function getCatalogData(page, limit){      
    fetch(`http://localhost:3005/catalog?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => 
    {
      //console.log(data);
      return(data);
    });
    return([]);
  }
  */
/* function getCatalogData(path){ 
    fetch(path, {
      method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => 
    {
      console.log(data);
      return(data)
    });  
    return([]);
}*/
  
  class Catalog extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        path: "http://localhost:3005/catalog?_page=1&_limit=12",
        page: "1",
        limit: "12", 
        games: [1, 2],       
      };
    }
  
    getCatalogData(path){ 
      fetch(path, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => 
      {
        console.log(data);
        this.setState({games: data});
      });
  }

  render(){
    
    const { classes } = this.props
    return(
      <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Button onClick={() => this.getCatalogData(this.state.path)}>asdawsd</Button>
          <Button onClick={() => console.log(this.state)}>asdawsd</Button>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Library
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.games.map((gameCard) => (
              <Grid item key={gameCard} xs={12} sm={6} md={4}>
                <Card className={classes.card}>                    
                <Typography gutterBottom variant="h5" component="h2">
                      Name of the game
                    </Typography>
                    <Typography>
                    <Grid container className={classes.main_img} item xs={20} spacing={3}>
                    {/*<img className={classes.main_img} src={gameCard.img}></img>*/}
                    </Grid>
                    <Grid container item xs={20} spacing={3}>
                      Rating here ashofau uuuuuuuuu uuuu gapis af hsoi ahsoihasf oasfh iaf hasif iahf oahsfic iuasgh iuasfhbi asguujas ulofasasf
                    </Grid>                        
                    </Typography>
                  <CardContent className={classes.cardContent}>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    )}
  }

  const styles = (theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    main_img: {
      float: 'left',
      width:  '70%',
      height: '50%',
      'object-fit': 'cover',
    }
  });

  export default withStyles(styles)(Catalog)