import { useFormik } from 'formik';
import React from 'react'

const CreateNewStreet = ({ handleCreateStreet, currentVillage, setCreateStreetMode, token }) => {
	const formik = useFormik({
		initialValues: {
			street: '',
		},
		onSubmit: (values) => {
			//async call
			handleCreateStreet(currentVillage.id, values.street, token)
			console.log(values, currentVillage)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<h3 className='popup-content__container-title popup-content__create_area-title'>
				Создать новую улицу
				<span onClick={() => setCreateStreetMode(false)} className='delete-cross delete-cross-title delete-cross-title__new-area'>×</span>
			</h3>
			<div className='input-wrapper input-wrapper__create-area'>
				<input
					name='street'
					type='text'
					placeholder='Улица'
					onChange={formik.handleChange}
					value={formik.values.street}
					className='popup-input'
					autoFocus
					required
				/>
			</div>
			<button type='submit' className='btn btn-profile btn-popup btn-popup--submit'>Создать</button>
		</form>
	)
}

export default CreateNewStreet