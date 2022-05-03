import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'http://185.245.186.22:3727/'
})

export const profileAPI = {
	getUser(id) {
		return instance.get(`user/${id}`)
			.then(response => {
				return response.data
			})
	},
	getProfile(token) {
		return instance.get(`user/self`, {token})
		.then(response => {
			return response.data
		})
	}
}

export const authApi = {
	login(email, password) {
		return instance.post('user/login', { email, password })
	},
	register(email, firstName, secondName, patronymic, password, pending_role) {
		return instance.post('user/register', { 
			email,
			firstName,
			secondName,
			patronymic,
			password,
			pending_role,
		})
	}
}
