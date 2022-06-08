import React, { useState } from 'react'
import { convertRole } from '../../Helpers/convertRole'
import ChangeUserInfo from './ChangeUserInfo'
import './Table.scss'

const Table = ({
	tableData,
	headingColumns,
	title,
	breakOn = 'medium',
	changeVillagerInfo,
	handleAcceptUser,
	handleDiscardUser
}) => {
	const [changeUserInfoMode, setChangeUserInfoMode] = useState(true)
	const [currentUser, setCurrentUser] = useState(null)
	const openChangeUserInfoModal = (user) => {
		setCurrentUser(user)
		setChangeUserInfoMode(true)
	}

	let tableClass = 'table-container__table'
	if (breakOn === 'small') tableClass += ' table-container__table--break-sm'
	if (breakOn === 'medium') tableClass += ' table-container__table--break-md'
	if (breakOn === 'large') tableClass += ' table-container__table--break-lg'

	const data = tableData.map((row, index) => {
		const rowData = []
		for (let key in row) {
			rowData.push({
				key,
				val: row[key]
			})
		}
		const rowTableData = rowData.map(rowEl => {
			return rowEl.key === 'villager'
				? rowEl.key = convertRole(Object.keys(rowEl.val)[0].toLowerCase())
				: rowEl.val
		})

		return <tr key={row.id} onClick={() => openChangeUserInfoModal(row)}>
			{rowTableData.map((data, i) => <td data-heading={headingColumns[i]}>{data}</td>)}
			<td><button className='btn' onClick={(e) => handleAcceptUser(e, row.id)}>Подтвердить</button></td>
			<td><button className='btn' onClick={(e) => handleDiscardUser(e, row.id)}>Отклонить</button></td>
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
							{headingColumns.map((col, index) => (
								<td key={index}>{col}</td>
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