import reducer, {
	initialState, loginTest
} from "../auth-reducer";

import {
	mockNetWorkResponse,
	getLoginUserResponse,
} from "../../Utils/tests.data";

import { store } from '../store'

/**
 * Testing the initial state
 */

test("Should return initial state", () => {
	expect(
		reducer(undefined, {
			type: undefined,
		})
	).toEqual(initialState);
});

describe("Login", () => {
	beforeAll(() => {
		mockNetWorkResponse();
	});

	it("Should set auth user data", async () => {
		// Saving previous state
		const previousState = store.getState().auth;
		let previousEmail = previousState.email;
		let previousPassword = previousState.password;

		previousEmail = getLoginUserResponse.email;
		previousPassword = getLoginUserResponse.password;

		// Dispatching the action
		const result = await store.dispatch(loginTest(getLoginUserResponse, getLoginUserResponse));

		const user = result;

		expect(user.email).toEqual(getLoginUserResponse.email);
		expect(user.password).toEqual(getLoginUserResponse.password);

		const state = store.getState().auth;

		expect(state.email).toEqual(previousEmail);
		expect(state.password).toEqual(previousPassword);
	})
})
