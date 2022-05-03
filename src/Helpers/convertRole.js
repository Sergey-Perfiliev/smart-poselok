export function convertRole(role) {
	switch (role) {
		case 'resident':
			return 'Житель'

		case 'representative':
			return 'Представитель'

		case 'admin':
			return 'Администратор'

		case 'owner':
			return 'Владелец'

		case 'Житель':
			return 'resident'

		case 'Представитель':
			return 'representative'

		case 'Администратор':
			return 'admin'

		case 'Владелец':
			return 'owner'

		default:
			return null
	}
}

// resident, representative, admin, owner