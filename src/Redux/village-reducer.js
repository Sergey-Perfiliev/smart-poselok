import { villageApi } from "../API/api"

const SET_VILLAGES = 'GET_VILLAGES'
const SET_STREETS = 'SET_STREETS'
const SET_LAND_PLOTS = 'SET_LAND_PLOTS'

const initialState = {
	villages: [],
	streets: [],
	land_plots: [],
	villagers: [
		{
			id: 1,
			email: "ivan@outlook.com",
			last_name: 'Иолафь',
			first_name: 'Иван',
			patronymic: 'Иванович',
			role: 'resident',
		},
		{
			id: 5,
			email: "sergey@rambler.com",
			last_name: 'Иигфлаг',
			first_name: 'Сергей',
			patronymic: 'Потапович',
			role: 'representative'
		},
	],
}

const VillageReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VILLAGES:
			return {
				...state,
				...action
			}

		case SET_STREETS:
			return {
				...state,
				...action
			}

		case SET_LAND_PLOTS:
			return {
				...state,
				...action
			}

		default:
			return state
	}
}

export const setVillages = (villages) => ({
	type: SET_VILLAGES, villages
})

export const setStreets = (streets) => ({
	type: SET_STREETS, streets
})

export const setLandPlots = (land_plots) => ({
	type: SET_LAND_PLOTS, land_plots
})

export const getVillages = () => {
	return async (dispatch) => {
		let response = await villageApi.getVillages()

		if (response.status === 200) {
			dispatch(setVillages(response.data))
			dispatch(setStreets(null))
			dispatch(setLandPlots(null))
		}
	}
}

export const getStreets = (villageId) => {
	return async (dispatch) => {
		let response = await villageApi.getStreets(villageId)
		if (response.status === 200) {
			dispatch(setStreets(response.data))
			dispatch(setLandPlots(null))
		}
	}
}

export const getLandPlots = (street_id) => {
	return async (dispatch) => {
		let response = await villageApi.getLandPlots(street_id)

		if (response.status === 200) {
			dispatch(setLandPlots(response.data))
			setLandPlots(null)
		}
	}
}

export default VillageReducer
