import React from 'react'
import { connect } from 'react-redux'
import { convertRole } from '../../Helpers/convertRole'
import { signOut } from '../../Redux/auth-reducer'
import { deleteVillager, changeVillagerInfo } from '../../Redux/profile-reducer'
import {
	acceptPendingVillager,
	acceptPendingAdmin,
	getPendingVillagers,
	getPendingAdmins,
} from '../../Redux/users-reducer'
import DataTable from '../Common/Table/Table'
import SearchBar from '../SearchBar/SearchBar'
import ChangeUserInfo from './ChangeUserInfo'
import './Villagers.scss'

// rows to show pagination
// let mockRows = [
// 	{ id: 1, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 2, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 3, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 4, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 5, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 6, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 7, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 8, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 9, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 10, role: '', email: '', second_name: '', first_name: '', patronymic: '', },
// 	{ id: 12, role: '', email: '', second_name: '', first_name: '', patronymic: '', }
// ]

const UsersData = (props) => {
	const currentVillage = props.currentVillage

	React.useEffect(() => {
		// request users
		if (currentVillage?.id) {
			if (props.showUsersData === 'villagers')
				props.getPendingVillagers(currentVillage.id, props.token)
			if (props.showUsersData === 'admins')
				props.getPendingAdmins(currentVillage.id, props.token)
		}
	}, [])

	const acceptUser = (id, accept) => {
		if (props.showUsersData === 'villagers')
			props.acceptPendingVillager(id, accept, props.token)
		if (props.showUsersData === 'admins')
			props.acceptPendingAdmin(id, accept, props.token)
	}

	const handleAcceptUser = (e, villagerId) => {
		e.preventDefault()
		e.stopPropagation()
		acceptUser(villagerId, true)
	}

	const handleDiscardUser = (e, villagerId) => {
		e.preventDefault()
		e.stopPropagation()
		acceptUser(villagerId, false)
	}

	const [tableData, setTableData] = React.useState(null)
	React.useEffect(() => {
		if (props.showUsersData === 'villagers') {
			setTableData(props.villagers)
		}
		if (props.showUsersData === 'admins') {
			setTableData(props.admins)
		}
	}, [props.showUsersData, props.villagers, props.admins])

	let columns = [
		{ field: 'id', headerName: 'ID' },
		{ field: 'villager', headerName: 'Роль' },
		{ field: 'email', headerName: 'Email' },
		{ field: 'second_name', headerName: 'Фамилия' },
		{ field: 'first_name', headerName: 'Имя' },
		{ field: 'patronymic', headerName: 'Отчество' },
		{ field: 'accept', headerName: '' },
		{ field: 'discard', headerName: '' },
	]

	const [userValue, setUserValue] = React.useState('')
	const handleUserValueChange = (e) => {
		setUserValue(e.target.value)
	}

	// convert data to Table view
	let rows = tableData?.filter(n =>
		`${n.second_name} ${n.first_name} ${n?.patronymic}`
			.toLowerCase()
			.includes(userValue.toLowerCase())
	).map((r) => {
		let role = props.showUsersData === 'villagers'
			? convertRole(Object.keys(r.villager)[0].toLowerCase())
			: convertRole('admin')

		return {
			id: r.id,
			role: role,
			email: r.email,
			second_name: r.second_name,
			first_name: r.first_name,
			patronymic: r.patronymic,
		}
	})

	const [changeUserInfoMode, setChangeUserInfoMode] = React.useState(false)
	const [currentUser, setCurrentUser] = React.useState(null)

	return (
		<div className='villagers-wrapper'>
			<div className='villagers'>
				<SearchBar
					value={userValue}
					handleChange={handleUserValueChange}
				/>
				{
					!!tableData && !!tableData?.length
						? <DataTable
							rows={rows}
							columns={columns}
							areaLabel='Заявки'
							changeVillagerInfo={props.changeVillagerInfo}
							handleAcceptUser={handleAcceptUser}
							handleDiscardUser={handleDiscardUser}
						/>
						: <h2 style={{ fontWeight: '400', marginLeft: '24px' }}>Все пользователи подтверждены</h2>
				}
				{
					changeUserInfoMode && <ChangeUserInfo
						changeUserInfoMode={changeUserInfoMode}
						setChangeUserInfoMode={setChangeUserInfoMode}
						user={currentUser}
						changeVillagerInfo={changeVillagerInfo}
					/>
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	email: state.auth.email,
	token: state.auth.token,
	villagers: state.users.villagers,
	admins: state.users.admins,
	currentVillage: state.profile.currentVillage,
	currentRole: state.users.currentRole,
	showUsersData: state.users.showUsersData,
})

export default connect(mapStateToProps, {
	signOut,
	deleteVillager,
	changeVillagerInfo,
	acceptPendingVillager,
	acceptPendingAdmin,
	getPendingVillagers,
	getPendingAdmins,
})(UsersData)
