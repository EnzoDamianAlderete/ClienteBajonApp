import axios from 'axios'

export const APIInstance = axios.create({
	baseURL: 'https://bajonappbackend-production.up.railway.app',
})
