import axios from "axios"
import { authApi } from "../API/api"
import { jwtDecode } from "../Helpers/JwtDecoder"

// action.types
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

//resident, representative, admin, owner

export let initialState = {
	email: null || localStorage.getItem('email'),
	userId: null || localStorage.getItem('userId'),
	token: null || localStorage.getItem('token'),
	isAuth: false || localStorage.getItem('isAuth'),
	roles: ['representative', 'admin'],
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
export const setAuthUserData = (email, userId, token, isAuth) => ({
	type: SET_AUTH_USER_DATA, payload: {email, userId, token, isAuth}
})

export const login = (email, password) => {
	return async (dispatch) => {
		// let response = await authApi.login(email, password) 

		// if (response.status === 200) {
		// 	dispatch(setAuthUserData(email, response.data.userId, response.data.token, true))
		// }
		// if (response.status === 4**)
		//  dispatch(setError(response.errorMessage))
		//

		let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJyb2xlcyI6W10sImV4cCI6MTY4MjM3ODUxNn0.EijWC87tbA3hvQjyxWNNAjBhdS7_5zd2d-'
		let authTokenData = jwtDecode(token)
		console.log(authTokenData);

		// localStorage.setItem('email', email);
		// localStorage.setItem('userId', authTokenData.user_id);
		// localStorage.setItem('token', token);
		// localStorage.setItem('isAuth', true);

		dispatch(setAuthUserData(email, authTokenData.user_id, token, true))
	}
}

export const register = (email, firstName, lastName, patronymic, password) => {
	return async (dispatch) => {
		let response = await authApi.register(email, firstName, lastName, patronymic, password)
		
		if (response.status === 200) {
			dispatch(login(email, password))
		}
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