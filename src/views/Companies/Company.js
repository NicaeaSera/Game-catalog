import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import { getCompanyData } from '../Api/GamesApi'
import CompanyCard from '../Companies/CompanyCard'
import { filter as filterGames } from '../Api/GamesApi'

function getCompanyId() {
    let arr = [] = (document.URL).split("/companies/company/");
    if(arr.length != 1){
      let a = parseInt(arr[1]);
    if(!isNaN(a))
      if(a > 0)
        return a;    
    }
    return 1;
}


class Company extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          companyId: getCompanyId(),
          publisherId: 0,
          companyData: [],  
          gameCards: [],       
      }
    }
    
      
    componentDidMount() {
      getCompanyData(getCompanyId()).then(data => {
        console.log("asdasdads", data.Data[0]);
        this.setState({companyData: data.Data});
        filterGames(1, 6, {developerId: this.state.companyId}).then(data => {
          console.log(data.Data)
          this.setState({gameCards: data.Data})              
      })
      })
      
    }

    componentWillUnmount() {

    }

    render(){
        const { classes } = this.props
        if(this.state.companyData.length === 1)
        return (
           <Grid>
             {/* функция прорисовки информации о компании*/}
               <CompanyCard post={this.state.companyData[0]} games={this.state.gameCards} />
           </Grid>
        ) 
        return (<Grid></Grid>)
    }
}


const styles = theme => ({
  
})

export default withStyles(styles)(Company)