import React, { useState, useEffect } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ContentCard from '../Components/ContentCard';

import { filter as filterGames } from '../Api/GamesApi'
import { render } from '@testing-library/react';

const Copyright = props => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    padding: '20px',
  }
}));

const Catalog = props => {

  const [cardsOnPage, setCardsOnPage] = useState(3);
  const [cards, setCards] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const classes = useStyles();

  function getCurrentPage() {
    let page = [] = (document.URL).split("/catalog/");
    if(page.length != 1){
      let a = +page[1];
    if(!isNaN(a))
      if(a > 0)
        return a    
    }
    return 0
  }

  useEffect(() => {
    // аналог componentDidMount
    setCurrentPage(getCurrentPage());  
    filterGames(currentPage, cardsOnPage).then(data => {
      setCards(data.Data);
      setTotalCount(+data.Count);
    })
    setPageCount(Math.ceil((totalCount/cardsOnPage).toFixed(10)));
    sessionStorage.setItem("currentPage", getCurrentPage());
    sessionStorage.setItem("nextPage", +sessionStorage.currentPage+1);
    if(+sessionStorage.currentPage == 0 || +sessionStorage.currentPage == 1);
    sessionStorage.setItem("previousPage", 1);


    return () => {
      // аналог componentWillUnmount
    };
  }, []);
  
  function moveTo(page){  
    setCurrentPage(page);  
    filterGames(currentPage, cardsOnPage).then(data => {
    setCards(data.Data);
    setTotalCount(+data.Count);
    })
    setPageCount(Math.ceil((totalCount/cardsOnPage).toFixed(10)));
    sessionStorage.setItem("currentPage", getCurrentPage());
    sessionStorage.setItem("nextPage", +sessionStorage.currentPage+1);
    if(+sessionStorage.currentPage == 0 || +sessionStorage.currentPage == 1);
    sessionStorage.setItem("previousPage", 1);
    
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Library
            </Typography> 
           <p>
              {console.log(cards)}
           </p>
             
         
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          <Grid container spacing={4}>            
            {cards.map((card) => (
              <Grid item key={`card-${card.id}`} xs={12} sm={6} md={4}>

                <ContentCard post={card} />
              
              </Grid>
            ))}
          </Grid>
          <Grid justify="center" container spacing={4}>
            <Link to="/catalog">
              <Button name="first">
                First</Button>
            </Link>            
            <Link to={`/catalog/${sessionStorage.previousPage}`}>
              <Button name="previous">
                Previous
              </Button>
            </Link>
            
          
            <Button>
              {currentPage}
            </Button>
            <Button onClick={()=>{console.log(pageCount, totalCount, document.URL, currentPage, cards)}}>
              Check
            </Button>
          
          <Link to={`/catalog/${sessionStorage.nextPage}`}>
            <Button name="next">
              Next
            </Button>
          </Link>
            
            <Link to={`/catalog/${pageCount-1}`}>
              <Button name="last">
                Last
              </Button> 
            </Link>            
                     
          </Grid>
          <Switch>
            <Route path="/catalog/">
            </Route>
          </Switch>
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
  );
}

export default Catalog
