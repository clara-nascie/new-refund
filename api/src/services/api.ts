import axios from 'axios'

//endereço base da api
export const api = axios.create({
    baseURL: 'http://localhost:3333/api',
})
