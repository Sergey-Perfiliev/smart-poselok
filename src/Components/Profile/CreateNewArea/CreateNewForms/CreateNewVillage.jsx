import { useFormik } from 'formik'
import React from 'react'

const CreateNewVillage = ({ handleCreateVillage, setCreateVillageMode, token }) => {
	console.log(token)
	const formik = useFormik({
		initialValues: {
			village: '',
		},
		onSubmit: (values) => {
			//async call
			handleCreateVillage(values.village, token)
			console.log(values)
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
			<button type='submit' className='btn btn-profile btn-popup btn-popup--submit'>Создать</button>
		</form>
	)
}

export default CreateNewVillage