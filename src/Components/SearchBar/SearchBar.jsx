import React from 'react'
import './SearchBar.scss'

const SearchBar = ({ value, handleChange }) => {
	return (
		<input
			name="search"
			type="text"
			className='search-input'
			placeholder='Поиск'
			value={value}
			onChange={handleChange}
		/>
	)
}

export default SearchBar
