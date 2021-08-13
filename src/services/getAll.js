import axios from 'axios'

const getAll = (url) => {
    const baseUrl = `http://localhost:3001/api/${url}`
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => error)
  }

export default getAll