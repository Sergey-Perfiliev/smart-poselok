import { profileAPI } from "../API/api"
import { addNotification } from "./notification-reducer"

const GET_PENDING_VILLAGERS = 'GET_PENDING_VILLAGERS'
const ACCEPT_PENDING_VILLAGER = 'ACCEPT_PENDING_VILLAGER'
const GET_PENDING_ADMINS = 'GET_PENDING_ADMINS'
const ACCEPT_PENDING_ADMIN = 'ACCEPT_PENDING_ADMIN'
const SHOW_USERS_DATA = 'SHOW_USERS_TABLE'

const initialState = {
	villagers: [],
	admins: [],
	showUsersData: null
}

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PENDING_VILLAGERS:
			return {
				...state,
				villagers: action.villagers
			}

		case ACCEPT_PENDING_VILLAGER:
			return {
				...state,
				villagers: state.villagers.filter((user) => user.id !== action.id)
			}

		case GET_PENDING_ADMINS:
			return {
				...state,
				admins: action.admins
			}

		case ACCEPT_PENDING_ADMIN:
			return {
				...state,
				admins: state.admins.filter((user) => user.id !== action.id)
			}

			case SHOW_USERS_DATA:
				return {
					...state, 
					showUsersData: action.showUsersData
				}

		default:
			return state
	}
}

export const getPendingVillagersAC = (villagers) => ({
	type: GET_PENDING_VILLAGERS, villagers
})

export const acceptPendingVillagerAC = (id) => ({
	type: ACCEPT_PENDING_VILLAGER, id
})

export const getPendingAdminsAC = (admins) => ({
	type: GET_PENDING_ADMINS, admins
})

export const acceptPendingAdminAC = (id) => ({
	type: ACCEPT_PENDING_ADMIN, id
})

export const setShowUsersData = (showUsersData) => ({
	type: SHOW_USERS_DATA, showUsersData
})

// request, dispatch pending users

// common method
export const getPendingUsers = async (dispatch, villageId, token, apiRequest, actionCreator) => {
	let response = await apiRequest(villageId, token)

	if (response.status === 200) {
		dispatch(actionCreator(response.data))
	}
}

export const getPendingAdmins = (villageId, token) => {
	return async (dispatch) => {
		getPendingUsers(
			dispatch,
			villageId,
			token,
			profileAPI.getPendingAdmins.bind(profileAPI),
			getPendingAdminsAC
		)
	}
}

export const getPendingVillagers = (villageId, token) => {
	return async (dispatch) => {
		getPendingUsers(
			dispatch,
			villageId,
			token,
			profileAPI.getPendingVillagers.bind(profileAPI),
			getPendingVillagersAC
		)
	}
}

// accept pending user

// common method
export const acceptPendingUser = async (dispatch, id, accept, token, apiRequest, actionCreator) => {
	try {
		let response = await apiRequest(id, accept, token)

		if (response.status === 200) {
			dispatch(actionCreator(id))
		}
	} catch (error) {
		dispatch(addNotification("FAILED", "Не удалось подтвердить пользователя"))
	}
}

export const acceptPendingAdmin = (id, accept, token) => {
	return async (dispatch) => {
		acceptPendingUser(
			dispatch,
			id,
			accept,
			token,
			profileAPI.acceptPendingAdmin.bind(profileAPI),
			acceptPendingAdminAC
		)
	}
}

export const acceptPendingVillager = (id, accept, token) => {
	return async (dispatch) => {
		acceptPendingUser(
			dispatch,
			id,
			accept,
			token,
			profileAPI.acceptPendingVillager.bind(profileAPI),
			acceptPendingVillagerAC
		)
	}
}

export default UsersReducer
