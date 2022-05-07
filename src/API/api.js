import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'http://45.93.135.160:80/',
})

export const profileAPI = {
	getUser(id) {
		return instance.get(`user/${id}`)
			.then(response => {
				return response.data
			})
	},
	getProfile(token) {
		return instance.get(`user/self`, { token })
			.then(response => {
				return response.data
			})
	}
}

export const authApi = {
	login(email, password) {
		return instance.post('user/login', { email, password })
	},
	register(email, firstName, secondName, patronymic, password) {
		return instance.post('user/registration', {
			email,
			first_name: firstName,
			second_name: secondName,
			patronymic,
			password,
		})
	},
	pendingAdmin(villageId, token) {
		return instance.post(`village/${villageId}/pending_admin`,
			{ headers: { "Authorization": `Bearer ${token}` } })
	},
	pendingVillager(villageId, payload, token) {
		console.log('token', token)
		return instance.post(`village/${villageId}/pending_villager`,
			payload,
			{ headers: { "Authorization": `Bearer ${token}` } },
		)
	}
}

export const villageApi = {
	getVillages() {
		return instance.get(`/village`)
	},
	getStreets(village_id) {
		return instance.get(`/village/${village_id}/street`)
	},
	getLandPlots(street_id) {
		return instance.get(`/street/${street_id}/land_plot`)
	}
}
