import React, { useState } from 'react'
import { convertRole } from '../../Helpers/convertRole'
import ChangeUserInfo from './ChangeUserInfo'
import './Table.scss'

const Table = ({ tableData, headingColumns, title, breakOn = 'medium', deleteVillager, changeVillagerInfo }) => {
	const [changeUserInfoMode, setChangeUserInfoMode] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)
	const openChangeUserInfoModal = (user) => {
		setCurrentUser(user)
		setChangeUserInfoMode(true)
	}

	const handleDeleteUser = (e, villagerId) => {
		e.preventDefault()
		e.stopPropagation()
		deleteVillager(villagerId)
	}

	let tableClass = 'table-container__table'
	if (breakOn === 'small') tableClass += ' table-container__table--break-sm'
	if (breakOn === 'medium') tableClass += ' table-container__table--break-md'
	if (breakOn === 'large') tableClass += ' table-container__table--break-lg'

	const data = tableData.map((row, index) => {
		let rowData = []
		let i = 0
		for (const key in row) {
			rowData.push({
				key: headingColumns[i],
				val: row[key]
			})
			i++
		}

		return <tr key={index} onClick={() => openChangeUserInfoModal(row)}>
			{rowData.map((data, i) => <td key={i} data-heading={data.key}>{data.key === 'Роль' ? convertRole(data.val) : data.val}</td>)}
			<td><button className='btn' onClick={(e) => handleDeleteUser(e, rowData[0].val)}>Удалить</button></td>
		</tr>
	})

	return (
		<>
			<div className='table-container'>
				<div className="table-container__title">
					<h2>{title}</h2>
				</div>
				<table className={tableClass}>
					<thead>
						<tr>
							{headingColumns.map((col, i) => (
								<td key={i}>{col}</td>
							))}
						</tr>
					</thead>
					<tbody>
						{data}
					</tbody>
				</table>
			</div>

			{
				changeUserInfoMode && <ChangeUserInfo
					changeUserInfoMode={changeUserInfoMode}
					setChangeUserInfoMode={setChangeUserInfoMode}
					user={currentUser}
					changeVillagerInfo={changeVillagerInfo}
				/>
			}
		</>
	)
}

export default Table