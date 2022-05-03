const SET_VILLAGES = 'GET_VILLAGES'
const SET_STREETS = 'SET_STREETS'
const SET_LAND_PLOTS = 'SET_LAND_PLOTS'

const initialState = {
	villages: [
		{ id: 1, name: 'Малиновка' },
		{ id: 2, name: 'Вторая' },
		{ id: 3, name: 'Третья' },
	],
	streets: [
		{ id: 1, name: 'Первая' },
		{ id: 2, name: 'Вторая' },
		{ id: 3, name: 'Третья' },
	],
	land_plots: [
		{ id: 1, name: '1' },
		{ id: 2, name: '2' },
		{ id: 3, name: '3' },
	],
}

const VillagerReducer = (state = initialState, action) => {
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
			return initialState
	}
}

export const setVillages = (villages) => ({
	type: SET_VILLAGES, villages
})

export const setStreets = (streets) => ({
	type: SET_STREETS, streets
})

export const setLandPlots = (land_plots) => ({
	type: SET_STREETS, land_plots
})

export const getVillages = (villages) => {
	return async (dispatch) => {
		dispatch(setVillages(villages))
		dispatch(setStreets(null))
		dispatch(setLandPlots(null))
	}
}

export const getStreets = (streets) => {
	return async (dispatch) => {
		dispatch(setStreets(streets))
		setLandPlots(null)
	}
}

export const getLandPlots = (land_plots) => {
	return async (dispatch) => {
		dispatch(setLandPlots(land_plots))
	}
}

export default VillagerReducer
