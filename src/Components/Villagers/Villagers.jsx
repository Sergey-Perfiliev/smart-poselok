import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../Redux/auth-reducer'
import { deleteVillager, changeVillagerInfo } from '../../Redux/profile-reducer'
import Header from '../Header/Header'
import Table from './Table'
import './Villagers.scss'

const Villagers = (props) => {
	const villagers = props.villagers

	return (
		<>
			<Header
				email={props.email}
				signOut={props.signOut}
			/>
			<div className='villagers'>
				<Table
					tableData={villagers}
					headingColumns={['', 'Email', 'Фамилия', 'Имя', 'Отчество', 'Роль', '']}
					title='Жильцы'
					breakOn='medium'
					changeVillagerInfo={props.changeVillagerInfo}
					deleteVillager={props.deleteVillager}
				/>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	email: state.auth.email,
	villagers: state.profile.villagers,
})

export default connect(mapStateToProps, { signOut, deleteVillager, changeVillagerInfo })(Villagers)
