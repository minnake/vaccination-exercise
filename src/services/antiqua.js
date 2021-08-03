import axios from 'axios'
const baseUrl = 'http://localhost:3001/antiqua'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const getAntiqua = {
    getAll
}

export default getAntiqua