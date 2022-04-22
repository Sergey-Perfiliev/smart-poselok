import axios from "axios"

// action.types
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

export let initialState = {
	email: null,
	password: null,
	isAuth: false,
	role: ['representative'],
	loading: false,
	error: null
}

// reducer
const AuthReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_AUTH_USER_DATA:
			return {
				...state,
				...action.payload
			}

		default:
			return initialState
	}
}

// action creators
export const setAuthUserData = (email, password, isAuth) => ({
	type: SET_AUTH_USER_DATA, payload: {email, password, isAuth}
})

export const login = (email, password) => {
	return async (dispatch) => {
		dispatch(setAuthUserData(email, password, true))
	}
}

export const loginTest = (user) => {
	return async (dispatch) => {
		dispatch(setAuthUserData(user.email, user.password))
		const res = await axios.post('/user/login', user)
		return res.data
	}
}

export const signOut = () => {
	return async (dispatch) => {
		dispatch(setAuthUserData(false, false, false))
	}
}

export default AuthReducer