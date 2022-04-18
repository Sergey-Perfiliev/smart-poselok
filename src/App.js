import './App.css';
import {
  BrowserRouter as Router,
  Route,
	Routes,
} from "react-router-dom";
import Login from './Components/Auth/Login/Login';
import Registration from './Components/Auth/Registration/Registration';
import Main from './Components/Main/Main';
import { Provider } from 'react-redux';
import { store } from './Redux/store'
import { PrivateRoute } from './HOC/PrivateRoute';
import { connect } from 'react-redux';

const App = (props) => {
	return (
		<Routes>
			<Route exact path='/' element={<PrivateRoute isAuth={props.isAuth} component={Main} />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/registration" element={<Registration />} />
		</Routes>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
})

const AppContainer = connect(mapStateToProps, {})(App)

const SmartPoselokApp = (props) => {
  return (
    <Router>
			<Provider store={store}>
      	<AppContainer />
			</Provider>
		</Router>
  );
}

export default SmartPoselokApp;
