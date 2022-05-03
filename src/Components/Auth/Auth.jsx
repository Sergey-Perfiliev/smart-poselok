import React from 'react'

const Auth = (props) => {
	return (
		<div className='auth-container'>
			<div className='auth'>
				<h2 className='auth-title'>{props.title}</h2>
				{props.children}
			</div>
		</div >
	)
}

export default Auth