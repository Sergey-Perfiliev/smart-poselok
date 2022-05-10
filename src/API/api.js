import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'http://45.93.135.160:80/',
})

export const profileAPI = {
	getUser(id) {
		return instance.get(`user/${id}`)
	},
	getProfile(token) {
		return instance.get(`user/self`,
			{ headers: { "Authorization": `Bearer ${token}` } })
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
	},
	createVillage(name, token) {
		return instance.post(`/village`,
			{ name },
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	},
	createStreet(villageId, name, token) {
		return instance.post(`/village/${villageId}/street`,
			{ name },
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	},
	createLandPlot(streetId, name, token) {
		return instance.post(`/street/${streetId}/land_plot`,
			{ name },
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	}
}

export const voteApi = {
	createVote(villageId, vote, token) {
		return instance.post(`/village/${villageId}/voting`,
			{ vote },
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	},
	getVotes(villageId, token) {
		return instance.get(`/village/${villageId}/voting`,
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	},
	getCurrentVote(villageId, token) {
		return instance.get(`/village/${villageId}/voting/current`,
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	},
	vote(votingOptionId, token) {
		return instance.post(`/village/voting_options/${votingOptionId}/vote`,
			{ headers: { "Authorization": `Bearer ${token}` } }
		)
	}
}
