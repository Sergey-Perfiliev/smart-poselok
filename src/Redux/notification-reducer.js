import { v4 } from 'uuid'

const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

const initialState = []

const NotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return [
				...state,
				{ ...action.payload }
			]

		case REMOVE_NOTIFICATION:
			return state.filter(el => el.id !== action.id)

		default:
			return state
	}
}

export const addNotification = (type, message) => ({
	type: ADD_NOTIFICATION, payload: {
		id: v4(), type, message
	}
})

export const removeNotification = (id) => ({
	type: REMOVE_NOTIFICATION, id
})

export default NotificationReducer