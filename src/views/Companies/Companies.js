import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
  import Pagination from '@material-ui/lab/Pagination';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CompaniesCard from '../Companies/CompaniesCard'
import { render } from '@testing-library/react';
import { getCompanyData } from '../Api/GamesApi'
import { getCompaniesList } from '../Api/GamesApi'

function getCompanyId() {
    let arr = [] = (document.URL).split("/catalog/game/");
    if(arr.length != 1){
      let a = parseInt(arr[1]);
    if(!isNaN(a))
      if(a > 0)
        return a;    
    }
    return 1;
}

function getCurrentPage() {
  let page = [] = (document.URL).split("/companies/");
  if(page.length != 1){
    let a = parseInt(page[1]);
  if(!isNaN(a))
    if(a > 0)
      return a;    
  }
  return 1;
}


class Companies extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        companiesList: [],
        companiesOnPage: 10,
        currentPage: 1,         
        pageCount: 1,
        companiesTotalCount: 0,
    }
  }

  moveTo(event, value){  
    console.log(value);
    this.setState({currentPage: value});
    getCompaniesList(this.state.currentPage, this.state.companiesOnPage).then(data => {
      this.setState({companiesList: data.Data});
      console.log(data.Data, data.Count);
    })
  }
  
    
      
  componentDidMount() {
    this.setState({currentPage: getCurrentPage()});
    getCompaniesList(this.state.currentPage, this.state.companiesOnPage).then(data => {
      this.setState({companiesList: data.Data});
      this.setState({companiesTotalCount: data.Count});
      console.log(data.Data, data.Count);
    })

    
  }

  componentWillUnmount() {

  }

  render(){
      const { classes } = this.props
      if(1)
      return (
        <React.Fragment>
          <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Companies
              </Typography> 
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="xl">
            <Grid justify="center" container spacing={4}> 
              {this.state.companiesList.map((company) => (
                <Grid item key={`company-${company.id}`} xs={12} sm={12} md={8}>
                  <CompaniesCard post={company} />
                </Grid>
              ))}
            </Grid>
            <Grid justify="center" container spacing={4}>
              <div className={classes.root}>
                  <Typography>Testing page: {this.state.currentPage}</Typography>
                  <Pagination count={Math.ceil((this.state.companiesTotalCount/this.state.companiesOnPage).toFixed(10))} page={this.state.currentPage} onChange={this.moveTo} />
                </div>
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
        </footer>
        {/* End footer */}
      </React.Fragment>
      ) 
      return (<Grid></Grid>)
  }
}


const styles = theme => ({
  
})

export default withStyles(styles)(Companies)