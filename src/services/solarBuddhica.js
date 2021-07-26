import axios from 'axios'
const baseUrl = 'http://localhost:3002/solarBuddhica'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const getSolarBuddhica = {
    getAll
}

export default getSolarBuddhica