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
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types'

import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { getGameData } from '../Api/GamesApi'
import GameCard from '../Games/GameCard'


function getGameId() {
    let arr = [] = (document.URL).split("/catalog/game/");
    if(arr.length != 1){
      let a = parseInt(arr[1]);
    if(!isNaN(a))
      if(a > 0)
        return a;    
    }
    return 1;
}


class Games extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          gameId: getGameId(),
          gameData: []          
      }
    }
    
    
      
    componentDidMount() {
        getGameData(getGameId()).then(data => {
            console.log(data.Data);
            this.setState({gameData: data.Data})})
        //getGameData().then(data => {return data.Data}),
    }

    componentWillUnmount() {

    }

    render(){
        const { classes } = this.props
        if(this.state.gameData.length === 1)
        return (
           <Grid>
               <GameCard post={this.state.gameData[0]} />
           </Grid>
        ) 
        return (<Grid></Grid>)
    }
}


const styles = theme => ({
  
})

export default withStyles(styles)(Games)