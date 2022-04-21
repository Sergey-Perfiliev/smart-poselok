const SET_NEIGHBOURS = 'SET_NEIGHBOURS'

let initialState = {
	neighbours: [
		{ id: 0, name: "Name" },
		{ id: 15, name: "Alex" },
		{ id: 151, name: "Ivan" },
		{ id: 270, name: "Sergei" },
		{ id: 986, name: "Antony" },
	],
	currentVote: {
		id: 1,
		title: 'Уборка территории',
		options: [
			'Да',
			'Нет',
			'Воздержусь',
		]
	}
}

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NEIGHBOURS: 
			return {
				...state,
				...action
			} 

			default:
				return initialState
	}
}

export const getNeighbours = (neighbours) => ({
	type: SET_NEIGHBOURS, neighbours
})

export const requestNeighbours = () => {
	return async (dispatch) => {
		dispatch(getNeighbours())
	} 
}

export default ProfileReducer
