import { baseUrl, defaultHeaders } from './Api'

const entityUrl = 'games'
const baseRequestSettings = {
  headers: defaultHeaders,
  mode: 'cors',
  cache: 'default'
}

// запрос на игры по-фильру
const filter = (page = 1, size = 10, filterParams = {}) => {
  // генерируем ссылку
  const url = `${baseUrl + entityUrl}?_page=${page}&_limit=${size}`

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
      Count: response.headers.get('X-Total-Count') // общее кол-во карточек, нужно для пагинации
    }))
  })
}

export {
  filter
}