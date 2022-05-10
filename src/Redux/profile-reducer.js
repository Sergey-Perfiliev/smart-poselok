import { profileAPI } from "../API/api"
import { getVillages } from "./village-reducer"

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_NEIGHBOURS = 'SET_NEIGHBOURS'
const SET_CURRENT_VILLAGE = 'SET_CURRENT_VILLAGE'
const ADD_VOTE = 'ADD_VOTE'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'
const DELETE_USER = 'DELETE_USER'

let initialState = {
	profile: null,
	neighbours: [
		{ id: 0, name: "Name" },
		{ id: 15, name: "Alex" },
		{ id: 151, name: "Ivan" },
		{ id: 270, name: "Sergei" },
		{ id: 986, name: "Antony" },
	],
	currentVillage: null,
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
				...action
			}

		case SET_CURRENT_VILLAGE:
			return {
				...state,
				...action
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

export const getNeighbours = (neighbours) => ({
	type: SET_NEIGHBOURS, neighbours
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
		console.log('GET PROFILE RESPONES', response)
		dispatch(getVillages())

		if (response.status === 200) {
			dispatch(setUserProfile(response.data))
		}
	}
}

export const requestNeighbours = () => {
	return async (dispatch) => {
		dispatch(getNeighbours())
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
