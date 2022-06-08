import { profileAPI } from "../API/api"
import { addNotification } from "./notification-reducer"
import { getVillages } from "./village-reducer"

// [
// 	{ id: 1, second_name: 'Носов', first_name: 'Лаврентий', patronymic: 'Фролович',},
// 	{ id: 2, second_name: 'Беляков', first_name: 'Марк', patronymic: 'Эдуардович',},
// 	{ id: 3, second_name: 'Абрамов', first_name: 'Лев', patronymic: 'Христофорович',},
// 	{ id: 4, second_name: 'Кондратьев', first_name: 'Петр', patronymic: 'Юрьевич',},
// 	{ id: 5, second_name: 'Лапин', first_name: 'Людвиг', patronymic: 'Адольфович',},
// 	{ id: 6, second_name: 'Меркушев', first_name: 'Гордей', patronymic: 'Николаевич',},
// 	{ id: 7, second_name: 'Шилов', first_name: 'Всеволод', patronymic: 'Богданович',},
// 	{ id: 8, second_name: 'Шубин', first_name: 'Савелий', patronymic: 'Федотович',},
// 	{ id: 9, second_name: 'Голубев', first_name: 'Май', patronymic: 'Михаилович',},
// 	{ id: 10, second_name: 'Савельев', first_name: 'Феликс', patronymic: 'Тимурович',},
// 	{ id: 11, second_name: 'Цветков', first_name: 'Арсен', patronymic: 'Геннадьевич',},
// 	{ id: 12, second_name: 'Кондратьев', first_name: 'Наум', patronymic: 'Богданович',},
// 	{ id: 13, second_name: 'Суворов', first_name: 'Платон', patronymic: 'Андреевич',},
// 	{ id: 14, second_name: 'Галкин', first_name: 'Феликс', patronymic: 'Семёнович',},
// 	{ id: 15, second_name: 'Рожков', first_name: 'Витольд', patronymic: 'Агафонович',},
// ]

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_NEIGHBOURS = 'SET_NEIGHBOURS'
const SET_CURRENT_VILLAGE = 'SET_CURRENT_VILLAGE'
const SET_CURRENT_ROLE = 'SET_CURRENT_ROLE'
const ADD_VOTE = 'ADD_VOTE'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
const OPEN_GATES = 'OPEN_GATES'

let initialState = {
	profile: null,
	neighbours: [],
	currentVillage: null,
	currentRole: null,
	error: null,
	loading: false,
}

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile
			}

		case SET_NEIGHBOURS:
			return {
				...state,
				neighbours: action.neighbours
			}

		case UPDATE_USER_STATUS:
			return {
				...state,
				neighbours: state.profile.neighbours.map(n => {
					if (n.user_id === action.payload.id)
						return { ...n, status: action.payload.status }
					return n
				})
			}

		case SET_CURRENT_VILLAGE:
			return {
				...state,
				currentVillage: action.currentVillage
			}

		case SET_CURRENT_ROLE:
			return {
				...state,
				currentRole: action.currentRole
			}

		case ADD_VOTE:
			return {
				...state,
				votes: [...state.votes, action.newVote]
			}

		case CHANGE_USER_INFO:
			return {
				...state,
				villagers: state.villagers.map(villager => {
					if (villager.id === action.villager.id) {
						villager = action.villager
					}

					return villager
				})
			}

		case DELETE_USER:
			return {
				...state,
				villagers: state.villagers.filter(v => v.id !== action.villagerId)
			}

		default:
			return state
	}
}

export const setUserProfile = (profile) => ({
	type: SET_USER_PROFILE, profile
})

export const setCurrentVillage = (village) => ({
	type: SET_CURRENT_VILLAGE, currentVillage: village
})

export const setCurrentRole = (role) => ({
	type: SET_CURRENT_ROLE, currentRole: role
})

export const setNeighbours = (neighbours) => ({
	type: SET_NEIGHBOURS, neighbours
})

export const setStatus = (id, status) => ({
	type: UPDATE_USER_STATUS, payload: { id, status }
})

export const changeVillagerInfoAC = (villager) => ({
	type: CHANGE_USER_INFO, villager
})

export const deleteVillagerAC = (villagerId) => ({
	type: DELETE_USER, villagerId
})

export const getSelfProfile = (token) => {
	return async (dispatch) => {
		let response = await profileAPI.getProfile(token)
		dispatch(getVillages())

		if (response.status === 200) {
			dispatch(setUserProfile(response.data))
		}
	}
}

export const requestNeighbours = (villageId, token) => {
	return async (dispatch) => {
		let response = await profileAPI.getNeighbours(villageId, token)

		if (response.status === 200) {
			dispatch(setNeighbours(response.data))
		}
	}
}

export const confirmPayment = (landPlotId, userId, token) => {
	return async (dispatch) => {
		let response = await profileAPI.confirmPayment(landPlotId, token)

		if (response.status === 200) {
			dispatch(setStatus(userId, response.data.status))
		}
	}
}

export const openGates = (landPlotId, token) => {
	return async (dispatch) => {
		// let response = await profileAPI.openGates(landPlotId, token)

		// if (response.status === 200)
			dispatch(addNotification("SUCCESS", 'Ворота открываютсяe'))
	}
}

export const changeVillagerInfo = (villager) => {
	return async (dispatch) => {
		dispatch(changeVillagerInfoAC(villager))
	}
}

export const deleteVillager = (villagerId) => {
	return async (dispatch) => {
		dispatch(deleteVillagerAC(villagerId))
	}
}

export default ProfileReducer
