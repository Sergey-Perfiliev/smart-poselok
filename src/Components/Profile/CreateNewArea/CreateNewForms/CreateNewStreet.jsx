import { useFormik } from 'formik';
import React from 'react'
import CustomAsyncSelect from '../../../Common/CustomAsyncSelect';

const CreateNewStreet = ({ handleCreateStreet, villages, setCreateStreetMode }) => {
	const formik = useFormik({
		initialValues: {
			village: '',
			street: '',
		},
		onSubmit: (values, { createStreet, setSubmitting }) => {
			setSubmitting(true)
			//async call
			handleCreateStreet()
			console.log(values)
			setSubmitting(false)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<h3 className='popup-content__container-title popup-content__create_area-title'>
				Создать новую улицу
				<span onClick={() => setCreateStreetMode(false)} className='delete-cross delete-cross-title delete-cross-title__new-area'>×</span>
			</h3>
			<CustomAsyncSelect
				value={formik.values.village}
				onChange={value=> formik.setFieldValue('village', value)}
				data={villages}
				placeholder={'Посёлок'}
			/>
			<div className='input-wrapper input-wrapper__create-area'>
				<input
					name='street'
					type='text'
					placeholder='Улица'
					onChange={formik.handleChange}
					value={formik.values.street}
					className='popup-input'
					autoFocus
				/>
			</div>
			<button type='submit' className='btn btn-profile btn-popup btn-popup--submit'>Создать</button>
		</form>
	)
}

export default CreateNewStreet