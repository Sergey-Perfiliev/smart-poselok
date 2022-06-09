import axios from "axios"
import { authApi } from "../API/api"
import { addNotification } from "./notification-reducer"
import { setCurrentVillage, setUserProfile } from "./profile-reducer"

// action.types
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const LOGIN_FAILED = 'LOGIN_FAILED'
const REGISTER_FAILED = 'REGISTER_FAILED'
const LOGOUT = 'LOGOUT'

// enabled roles : resident, representative, admin, owner

export let initialState = {
	email: null || localStorage.getItem('email'),
	userId: null || localStorage.getItem('userId'),
	token: null || localStorage.getItem('token'),
	isAuth: false || localStorage.getItem('isAuth'),
	loading: false,
	loginError: null,
	registerError: null,
}

// reducer
const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_USER_DATA:
			return {
				...state,
				...action.payload
			}

		case LOGIN_FAILED:
			return {
				...state,
				loginError: action.errorMessage
			}

		case REGISTER_FAILED:
			return {
				...state,
				registerError: action.errorMessage
			}

		case LOGOUT:
			return {
				...state,

			}

		default:
			return state
	}
}

// action creators
export const setAuthUserData = (email, userId, token, isAuth) => ({
	type: SET_AUTH_USER_DATA, payload: { email, userId, token, isAuth }
})

export const loginFailed = (errorMessage) => ({
	type: LOGIN_FAILED, errorMessage
})

export const logoutAC = () => ({
	type: LOGOUT
})

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			let response = await authApi.login(email, password)

			if (response.status === 200) {
				dispatch(loginFailed(null))
				dispatch(setAuthUserData(email, response.data.user_id, response.data.token, true))

				localStorage.setItem('email', email)
				localStorage.setItem('userId', response.data.user_id)
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('isAuth', true)
			}
		} catch (error) {
			let errorMessage = "Произошла ошибка"
			if (error?.response?.status === 403) {
				errorMessage = 'Неправильно введены данные'
			}
			dispatch(loginFailed(errorMessage))
			dispatch(addNotification("ERROR", errorMessage))
		}
	}
}

export const registerFailed = (errorMessage) => ({
	type: REGISTER_FAILED, errorMessage
})

export const register = (email, firstName, lastName, patronymic, password, landPlotId, villageId, roles) => {
	return async (dispatch) => {
		try {
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
				dispatch(registerFailed(null))
				dispatch(login(email, password))
			}
		} catch (error) {
			if (error.response.status === 400) {
				dispatch(registerFailed('Пользователь уже существует'))
				return
			}
			dispatch(registerFailed('Пользователь уже существует'))
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
		dispatch(setAuthUserData(null, null, null, null))
		dispatch(setUserProfile(null))
		dispatch(setCurrentVillage(null))
		window.localStorage.clear();
	}
}

export default AuthReducer