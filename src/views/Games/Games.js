import React from "react";
import { withStyles } from '@material-ui/core/styles'



function getGameId() {
    let page = [] = (document.URL).split("/catalog/game/");
    if(page.length != 1){
      let a = parseInt(page[1]);
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
          login: "",
          password: ""};
      }
    render(){
        return (
            <h2>Game data here</h2>
        ) 
    }
}


const styles = theme => ({
  
})

export default withStyles(styles)(Games)