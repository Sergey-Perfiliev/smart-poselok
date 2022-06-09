import { profileAPI, villageApi } from "../API/api"
import { getSelfProfile } from "./profile-reducer"

const SET_VILLAGES = 'SET_VILLAGES'
const SET_STREETS = 'SET_STREETS'
const SET_LAND_PLOTS = 'SET_LAND_PLOTS'

const initialState = {
	villages: null,
	streets: null,
	land_plots: null,
}

const VillageReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VILLAGES:
			return {
				...state,
				villages: action.villages
			}

		case SET_STREETS:
			return {
				...state,
				streets: action.streets
			}

		case SET_LAND_PLOTS:
			return {
				...state,
				land_plots: action.land_plots
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

export const createVillage = (villageName, phoneNumber, token) => {
	return async (dispatch) => {
		let response = await villageApi.createVillage(villageName, phoneNumber, token)
		let responseSelfProfile = await profileAPI.getProfile(token)
		getVillages()

		if (response.status === 200 && responseSelfProfile.status === 200) {
			dispatch(getSelfProfile(token))
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

export const createStreet = (villageId, streetName, token) => {
	return async (dispatch) => {
		let response = await villageApi.createStreet(villageId, streetName, token)

		if (response.status === 200) return
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

// landPlotName
export const createLandPlot = (streetId, landPlotName, token) => {
	return async (dispatch) => {
		let response = await villageApi.createLandPlot(streetId, landPlotName, token)

		if (response.status === 200) return
	}
}

export default VillageReducer
