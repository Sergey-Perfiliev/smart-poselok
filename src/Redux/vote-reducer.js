import { voteApi } from "../API/api"
import { addNotification } from "./notification-reducer"

const SET_VOTES = 'SET_VOTES'
const SET_CURRENT_VOTE = 'SET_CURRENT_VOTE'

const initialState = {
	votes: [],
	currentVote: null,
}

const VoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VOTES:
			return {
				...state,
				votes: action.votes
			}

		case SET_CURRENT_VOTE:
			return {
				...state,
				currentVote: action.currentVote
			}

		default:
			return state
	}
}

export const setVotes = (votes) => ({
	type: SET_VOTES, votes
})

export const setCurrentVote = (currentVote) => ({
	type: SET_CURRENT_VOTE, currentVote
})

export const makeVote = (votingOptionId, token) => {
	return async (dispatch) => {
		try {
			let response = await voteApi.vote(votingOptionId, token)

			if (response.status === 200) {
				dispatch(setVotes(response.data))
			}
		} catch (error) {
			let errorMessage = "Произошла ошибка"
			dispatch(addNotification("ERROR", errorMessage))
		}
	}
}

export const getVotes = (villageId, token) => {
	return async (dispatch) => {
		try {
			let response = await voteApi.getVotes(villageId, token)

			if (response.status === 200) {
				dispatch(setVotes(response.data))
			}
		} catch (error) {
			let errorMessage = "Произошла ошибка"
			dispatch(addNotification("ERROR", errorMessage))
		}
	}
}

export const getCurrentVote = (villageId, token) => {
	return async (dispatch) => {
		try {
			let response = await voteApi.getCurrentVote(villageId, token)
			if (response.status === 200) {
				dispatch(setCurrentVote(response.data))
			}
		} catch (error) {
			// let errorMessage = "Произошла ошибка"
			// dispatch(addNotification("ERROR", errorMessage))
		}
	}
}

export const createVote = (villageId, vote, token) => {
	return async (dispatch) => {
		try {
			let response = await voteApi.createVote(villageId, vote, token)

			if (response.status === 200) {
				dispatch(addNotification("SUCCESS", "Опрос создан"))
			}
		} catch (error) {
			let errorMessage = "Произошла ошибка"
			dispatch(addNotification("ERROR", errorMessage))
		}
	}
}

export default VoteReducer
