const SET_NEIGHBOURS = 'SET_NEIGHBOURS'
const ADD_VOTE = 'ADD_VOTE'
const CHANGE_USER_INFO = 'CHANGE_USER_INFO'
const DELETE_USER = 'DELETE_USER'

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
			{
				id: 15,
				description: "Да",
			},
			{
				id: 712,
				description: "Нет",
			}
		]
	},
	votes: [
		{
			id: 6,
			title: 'Ремонт площадки',
			options: [
				{
					id: 10,
					description: "Да",
					votes_number: 70
				},
				{
					id: 11,
					description: "Нет",
					votes_number: 30
				},
			],
		},
		{
			id: 15,
			voted: 5,
			title: 'Стройка забора',
			options: [
				{
					id: 5,
					description: "Да",
					votes_number: 30
				},
				{
					id: 6,
					description: "Нет",
					votes_number: 60
				},
				{
					id: 7,
					description: "Воздержусь",
					votes_number: 10
				},
			],
		},
	],
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
	error: null,
	loading: false,
}

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NEIGHBOURS:
			return {
				...state,
				...action
			}

		case ADD_VOTE:
			return {
				...state,
				votes: [action.newVote, ...state.votes]
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
			return initialState
	}
}

export const addVote = (title, options) => ({
	type: ADD_VOTE, newVote: { id: Math.random(), title, options }
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

export const setNewVote = (title, options) => {
	return async (dispatch) => {
		dispatch(addVote(title, options))
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
