import React from 'react'
import Logo from '../../Assets/Loader.svg'

const Loader = ({ width }) => {
	return (
		<img src={Logo} alt='Loader' width={width} />
	)
}

export default Loader