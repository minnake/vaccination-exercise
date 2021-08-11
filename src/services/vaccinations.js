import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/vaccinations'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const getVaccinations = {
    getAll
}

export default getVaccinations