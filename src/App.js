import './App.scss';
import {
  BrowserRouter,
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
import 'normalize.css';
import Votes from './Components/Votes/Votes';
import Villagers from './Components/Villagers/Villagers';

const App = (props) => {
	return (
		<Routes>
			<Route exact path='/' element={<PrivateRoute isAuth={props.isAuth} component={Main} />} />
			<Route exact path='/votes' element={<PrivateRoute isAuth={props.isAuth} component={Votes} />} />
			<Route exact path='/villagers' element={<PrivateRoute isAuth={props.isAuth} component={Villagers} />} />
			<Route exact path="/login" element={<Login isAuth={props.isAuth} />} />
			<Route exact path="/registration" element={<Registration />} />
		</Routes>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
})

const AppContainer = connect(mapStateToProps, {})(App)

const SmartPoselokApp = () => {
  return (
    <BrowserRouter>
			<Provider store={store}>
      	<AppContainer />
			</Provider>
		</BrowserRouter>
  );
}

export default SmartPoselokApp;
