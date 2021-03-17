import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import { getGameData } from '../Api/GamesApi'
import { getCompanyData } from '../Api/GamesApi'
import CompanyCard from '../Games/GameCard'

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
      }
    }
    
      
    componentDidMount() {
      getCompanyData(getCompanyId()).then(data => {
        console.log("asdasdads", data.Data[0]);
        this.setState({companyData: data.Data});
        getCompanyData(this.state.developerId).then(data => {
          this.setState({developerData: data.Data})
        })
        getCompanyData(this.state.publisherId).then(data => {
          this.setState({publisherData: data.Data}) //
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
               <CompanyCard post={this.state.companyData[0]} />
           </Grid>
        ) 
        return (<Grid></Grid>)
    }
}


const styles = theme => ({
  
})

export default withStyles(styles)(Company)