import axios from "axios"
import { authApi } from "../API/api"

// action.types
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

//resident, representative, admin, owner

export let initialState = {
	email: null || localStorage.getItem('email'),
	userId: null || localStorage.getItem('userId'),
	token: null || localStorage.getItem('token'),
	isAuth: false || localStorage.getItem('isAuth'),
	loading: false,
	error: null
}

// reducer
const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
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
	type: SET_AUTH_USER_DATA, payload: { email, userId, token, isAuth }
})

export const login = (email, password) => {
	return async (dispatch) => {
		let response = await authApi.login(email, password)

		if (response.status === 200) {
			dispatch(setAuthUserData(email, response.data.userId, response.data.token, true))
		}
		// if (response.status === 400)
		//  dispatch(setError(response.errorMessage))

		// localStorage.setItem('email', email);
		// localStorage.setItem('userId', authTokenData.user_id);
		// localStorage.setItem('token', token);
		// localStorage.setItem('isAuth', true);
	}
}

export const register = (email, firstName, lastName, patronymic, password, landPlotId, villageId, roles) => {
	return async (dispatch) => {
		console.log(email, firstName, lastName, patronymic, password)
		let response = await authApi.register(email, firstName, lastName, patronymic, password)

		let responsePending
		if (roles.some((r) => r === 'representative')) {
			responsePending = await authApi.pendingVillager(villageId, { villager: { Representative: landPlotId } }, response.data.token)
		} else if (roles.some((r) => r === 'resident')) {
			responsePending = await authApi.pendingVillager(villageId, { villager: { Resident: landPlotId } }, response.data.token)
		} else if (roles.some((r) => r === 'admin')) {
			responsePending = await authApi.pendingAdmin(villageId, response.data.token)
		}

		if (response?.status === 200 && responsePending?.status === 200) {
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