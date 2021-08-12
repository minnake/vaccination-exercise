import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/zerpfies'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const getZerpfy = {
    getAll
}

export default getZerpfy