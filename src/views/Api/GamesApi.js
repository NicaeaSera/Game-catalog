import { baseUrl, defaultHeaders } from './Api'

const entityUrl = 'games'
const baseRequestSettings = {
  headers: defaultHeaders,
  mode: 'cors',
  cache: 'default'
}

// запрос на игры по-фильтру
const filter = (page = 1, size = 12, filterParams = {}) => {
  // генерируем ссылку
  let url = `${baseUrl + entityUrl}?_page=${page}&_limit=${size}`;
  //если переданы доп. параметры для фильтрации -- дополняем ссылку
  if (Object.keys(filterParams).length > 0) {
    Object.keys(filterParams).forEach(key => {
      url += `&${key}=${filterParams[key]}`
    });
  }
  //выполняем запрос и возвращаем promise-запроса
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({
      Data: data, // данные что пришли с сервера
      Count: response.headers.get('X-Total-Count'), // общее кол-во карточек, нужно для пагинации
    }))
  })
}

// запрос на массив компаний, возвращает promise
const getCompaniesList = (page = 1, size = 12, filterParams = {}) => {
  const url = `${baseUrl}companies?_page=${page}&_limit=${size}`;
  if (Object.keys(filterParams).length > 0) {
    Object.keys(filterParams).forEach(key => {
      url += `&${key}=${filterParams[key]}`
    });
  }
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({
      Data: data,
      Count: response.headers.get('X-Total-Count'),
    }))
  })
}

// запрос на полный массив компаний/игр для страниц дополнения/изменения базы
const getEditData = (addres="") => {
  const url = `${baseUrl}${addres}`;
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({      
      Data: data,
    }))
  })
}

// запрос на полный массив компаний для страниц дополнения/изменения базы
const getCompanies = () => {
  const url = `${baseUrl}companies`;
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({
      Data: data,
      Count: response.headers.get('X-Total-Count'),
    }))
  })
}

// запрос на полную информацию об игре
const getGameData = (id = 1) =>{
  const url =`${baseUrl + entityUrl}?id=${id}`;
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({
      Data: data
    }))
  })
}

// запрос на полную информацию о компании
function getCompanyData(id = 1){
  const url =`${baseUrl}companies?id=${id}`;
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({
      Data: data
    }))
  })
}

// отправка данных на сервер для записи в базу данных
function sendData(path="", actionMethod="", data={}){
  let url ="";
  if(path === "game")
    url = "http://localhost:3004/games";
  if(path === "company")
    url = "http://localhost:3004/companies";
  // запрещает посылать неполные данные на сервер
  Object.keys(data).map(key => {
    if(data[key] == ""){
      console.log(`Missing data in ${key}!`);
      url =""; 
    }
  });
  fetch(url, {
    method: actionMethod,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response);
    if(response.ok){
       if(path === "game")
        window.location.href = "/catalog";
      if(path === "company")
        window.location.href = "/companies";
    }
  } )
}

// запрос на личный рейтинг игры и ее состояние
const getPersonalGameRating = (login="", id=0) => {
  const url = `${baseUrl}users?email=${login}`;
  return fetch(url, {
    method: 'GET',
    ...baseRequestSettings
  }).then(response => {
    return response.json().then(data => ({      
        favourites: data[0].favourites,
        owned: data[0].owned
      }))
  })
}

export {
  filter, getGameData, getCompanyData, getCompaniesList, getCompanies, sendData, getEditData, getPersonalGameRating
}