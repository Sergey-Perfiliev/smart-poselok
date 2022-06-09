import { useFormik } from 'formik'
import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const CreateNewVillage = ({ handleCreateVillage, setCreateVillageMode, token }) => {
	const [phoneValue, setPhoneValue] = React.useState('')

	const formik = useFormik({
		initialValues: {
			village: '',
		},
		onSubmit: (values) => {
			//async call
			handleCreateVillage(values.village, phoneValue, token)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<h3 className='popup-content__container-title popup-content__create_area-title'>
				Создать посёлок
				<span onClick={() => setCreateVillageMode(false)} className='delete-cross delete-cross-title delete-cross-title__new-area'>×</span>
			</h3>
			<div className='input-wrapper'>
				<input
					name='village'
					type="text"
					placeholder='Посёлок'
					onChange={formik.handleChange}
					value={formik.values.village}
					className='popup-input'
					autoFocus
					required
				/>
			</div>
			<div className='input-wrapper'>
				<PhoneInput
					style={{ border: 'none' }}
					className='popup-input'
					international
					countryCallingCodeEditable={false}
					defaultCountry="RU"
					onChange={setPhoneValue}
					value={phoneValue}
				/>
			</div>
			<button type='submit' className='btn btn-profile btn-popup btn-popup--submit'>Создать</button>
		</form>
	)
}

export default CreateNewVillage