import jwt_decode from 'jwt-decode';

export function jwtDecode(token) {
	return jwt_decode(token) // return json object
}

/*{exp: 10012016 name: john doe, scope:['admin']}*/