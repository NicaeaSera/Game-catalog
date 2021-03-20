import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import { getGameData } from '../Api/GamesApi'
import { getCompanyData } from '../Api/GamesApi'
import { getPersonalGameRating } from '../Api/GamesApi'
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

// страница отображения информации об игре
class Games extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          gameId: getGameId(),
          developerId: 0,
          publisherId: 0,
          gameData: [],
          developerData: [],
          publisherData:[],
      }
    }
    
      
    componentDidMount() {
      // получаем данные об игре из импортируемой функции
      getGameData(getGameId()).then(data => {
        console.log("asdasdads", data.Data[0].developerId, data.Data[0].publisherId);
        this.setState({gameData: data.Data});
        this.setState({developerId: data.Data[0].developerId});
        this.setState({publisherId: data.Data[0].publisherId});        
        getCompanyData(this.state.developerId).then(data => {
          this.setState({developerData: data.Data})
        })
        getCompanyData(this.state.publisherId).then(data => {
          this.setState({publisherData: data.Data})
        })
      })
      getPersonalGameRating(localStorage.login, this.state.gameId).then(data => {
        console.log("rating data here", data, data.favourites);
        this.setState({favourites: data.favourite});
        this.setState({owned: data.owned});
      })
    }

    componentWillUnmount() {

    }

    render(){
        const { classes } = this.props
        if(this.state.gameData.length === 1)
        return (
           <Grid>
             {/* используем функцию для прорисовки данных*/}
               <GameCard 
               post={this.state.gameData[0]} 
               developer={this.state.developerData[0]} 
               publisher={this.state.publisherData[0]} 
               rating={this.state.favourites}
               owned={this.state.owned}
               />
           </Grid>
        ) 
        return (<Grid></Grid>)
    }
}


const styles = theme => ({
  
})

export default withStyles(styles)(Games)