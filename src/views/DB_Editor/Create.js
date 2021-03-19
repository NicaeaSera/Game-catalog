import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import {Link} from "react-router-dom";
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withStyles } from '@material-ui/core/styles'
import { AirlineSeatReclineExtraOutlined } from '@material-ui/icons'
import Container from '@material-ui/core/Container';

import { getCompanies } from '../Api/GamesApi'
import { sendData } from '../Api/GamesApi'



class DataCreationPage extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        RAWG_resultState: "hidden",
        RAWG_searchInput: "",
        RAWG_responseData: [],
        listOfCompanies: [],
        listOfPublishers: [],
        
        developerId: 0,
        publisherId: 0,
      };
  }

  /* функция поиска данных на RAWG для автозаполнения формы */
  searchInRAWG(inputData=""){
    console.log(inputData);
    if(inputData.length < 1){
        return;
    } 
    console.log(inputData);
    const defaultHeaders = new Headers()
    const baseRequestSettings = {
        headers: defaultHeaders,
        mode: 'cors',
        cache: 'default'
    }
    const url = `https://rawg.io/api/games?search=${inputData}`
  {/* получить данные из RAWG*/}
    return fetch(url, {
        method: 'GET',
        ...baseRequestSettings
    }).then(response => {
        console.log(response);
        return response.json().then(data => {
            console.log(data);
            data.results.map(gameData => {
                gameData.title = gameData.name;                  
            });
            this.setState({RAWG_responseData: data.results})
        })
    })   
  }

  /* автозаполнение формы данными из RAWG при выборе игры из выпадающего списка*/
  fillTheForm(dataObject={}){
    let platforms = "";
    let genres = "";

    dataObject.platforms.map(platform => {
      if(platforms.length != 0)
        platforms += `, ${platform.platform.name}`;
      if(platforms.length === 0)
        platforms = platform.platform.name;
    })

    dataObject.genres.map(genre => {
      console.log("genre", genre)
      if(genres.length != 0)
        genres += `, ${genre.name}`;
      if(genres.length === 0)
        genres = genre.name;
    })
    document.getElementById("name").value = dataObject.name;
    document.getElementById("platforms").value = platforms;
    document.getElementById("year").value = dataObject.released;
    document.getElementById("genre").value = genres;
    document.getElementById("rating").value = dataObject.rating;
    document.getElementById("RAWG_id").value = dataObject.id;
    document.getElementById("image").value = dataObject.background_image;
  }

  /* функция возвращает объект, готовый к отправке на сервер*/
  combineData(){
    let data = {
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      description: document.getElementById("description").value,
      year: document.getElementById("year").value,
      genre: document.getElementById("genre").value,
      platforms: document.getElementById("platforms").value,
      developerId: this.state.developerId,
      publisherId: this.state.publisherId,
      rating: document.getElementById("rating").value,
      rawgId: document.getElementById("RAWG_id").value 
    };
    return data;
  }
  

  

  componentDidMount() {
      getCompanies().then(data => {
        let listOfPubl = [];
        console.log(data.Data);
        data.Data.map(key => {
          key.title = key.name;          
          if(key.isPublisher == true)
            listOfPubl.push(key);
        })
        this.setState({listOfPublishers: listOfPubl});
        this.setState({listOfCompanies: data.Data});
        console.log(this.state.listOfCompanies, listOfPubl);
        document.getElementById("RAWG_search_result").hidden = this.state.RAWG_resultState
       
      })
    }

    componentWillUnmount() {

    }
  
  render(){
    const { classes } = this.props;

    return (    
      <Grid container component="main" justify="center" alignItems="center">
        {/*<Button onClick={() =>{dataAction("http://localhost:3004/test/1", "PUT", {action: "2"})}}>
        test
        </Button>*/}

          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Add game
            </Typography> 
         
          <Grid container                  
            spacing={2} 
            justify="center"
            alignItems="center">
            <Grid item xs={12} sm={6} xs={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name of the game"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(event, value) => {this.setState({dataToExport:{name: value}})}}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="RAWG_text_search"
                label="Try on RAWG database"
                name="RAWG_text_search"
                autoComplete=""
                autoFocus
                onChange={(event, value) => this.setState({RAWG_searchInput: document.getElementById("RAWG_text_search").value})}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="RAWG"
                onClick={() => {this.searchInRAWG(this.state.RAWG_searchInput)}}>
                  Search
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="platforms"
                label="Platforms"
                id="platforms"
                onChange={(event, value) => {this.setState({dataToExport:{platform: value}})}}
              />
            </Grid>
            {/* поле с результатами запроса RAWG и выпадающем списком, при выборе значения форма заполняется автоматически*/}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                onChange={(event, value) => {this.fillTheForm(value)}}
                id="RAWG_search_result"
                options={this.state.RAWG_responseData}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField className={classes.textField} {...params} label="Results in RAWG" variant="outlined" />}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                onChange={(event, value) => {this.setState({developerId: value.id})}}
                id="developerId"
                options={this.state.listOfCompanies}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField required className={classes.textField} {...params} label="Developer" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                onChange={(event, value) => {this.setState({publisherId: value.id})}}
                id="publisher"
                options={this.state.listOfPublishers}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField required className={classes.textField} {...params} label="Publisher" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="year"
                label="Year"
                id="year"
                onChange={(event, value) => {this.setState({dataToExport:{year: value}})}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
                required
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="genre"
                label="Genre"
                id="genre"
                onChange={(event, value) => {this.setState({dataToExport:{genre: value}})}}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="rating"
                label="Raiting"
                id="rating"
                onChange={(event, value) => {this.setState({dataToExport:{rating: value}})}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="RAWG_id"
                label="Id on RAWG"
                id="RAWG_id"
                onChange={(event, value) => {this.setState({dataToExport:{rawgId: value}})}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="image"
                label="Image link"
                id="image"
                onChange={(event, value) => {this.setState({dataToExport:{image: value}})}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                id="description"
                onChange={(event, value) => {console.log(value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>{console.log(this.combineData());  sendData("game", "POST", this.combineData())}}>
                Submit
              </Button>
            </Grid>
          </Grid>
        <form noValidate id="form">
          </form>
        </Container>
        
      </Grid> 
    )
  }
}

const styles = theme => ({
  textField: {
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
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


export default withStyles(styles)(DataCreationPage)
