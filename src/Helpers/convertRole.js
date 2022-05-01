export function convertRole(role) {
	switch (role) {
		case 'resident':
			return 'Жилец'

		case 'representative':
			return 'Представитель'

		case 'admin':
			return 'Администратор'

		case 'owner':
			return 'Владелец'

		default:
			return 'Обрабатывается'
	}
}

// resident, representative, admin, owner