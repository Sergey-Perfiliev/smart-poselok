import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const getLoginUserResponse = {
  email: "Nathan@yesenia.net",
	password: '123'
};

// Adding mock network response that is used in tests

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios);

  mock.onPost(`/user/login`).reply(200, getLoginUserResponse);
};

export {
  mockNetWorkResponse,
  getLoginUserResponse,
};
