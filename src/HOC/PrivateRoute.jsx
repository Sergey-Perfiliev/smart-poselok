import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
	return (
		isAuth ? <Component {...rest} />
			: <Navigate to="/login" />
	);
};