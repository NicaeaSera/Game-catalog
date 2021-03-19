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
  fetch(url, {
    method: actionMethod,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
      console.log(response);
  } )
}

export {
  filter, getGameData, getCompanyData, getCompaniesList, getCompanies, sendData
}