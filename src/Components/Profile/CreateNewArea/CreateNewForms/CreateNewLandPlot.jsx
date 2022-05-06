import { useFormik } from 'formik'
import React from 'react'
import AsyncAutoComplete from '../../../Common/AsyncAutoComplete'
import CustomAsyncSelect from '../../../Common/CustomAsyncSelect'

const CreateNewLandPlot = ({ handleCreateLandPlot, villages, streets, setCreateLandPlotMode }) => {
	const formik = useFormik({
		initialValues: {
			village: '',
			street: '',
			land_plot: ''
		},
		onSubmit: (values, { CreateNewLandPlot, setSubmitting }) => {
			setSubmitting(true)
			//async call
			handleCreateLandPlot()
			console.log(values)
			setSubmitting(false)
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<h3 className='popup-content__container-title popup-content__create_area-title'>
				Создать новый участок
				<span onClick={() => setCreateLandPlotMode(false)} className='delete-cross delete-cross-title delete-cross-title__new-area'>×</span>
			</h3>
			<div className='select-wrapper'>
				<CustomAsyncSelect
					value={formik.values.village}
					onChange={value => formik.setFieldValue('village', value)}
					data={villages}
					placeholder={'Посёлок'}
				/>
				<CustomAsyncSelect
					value={formik.values.street}
					onChange={value => formik.setFieldValue('street', value)}
					data={streets}
					placeholder={'Улица'}
				/>
			</div>
			<div className='input-wrapper input-wrapper__create-area'>
				<input
					name='land_plot'
					type='text'
					placeholder='Участок'
					onChange={formik.handleChange}
					value={formik.values.land_plot}
					className='popup-input'
					autoFocus />
			</div>
			<button type='submit' className='btn btn-profile btn-popup btn-popup--submit'>Создать</button>
		</form>
	)
}

export default CreateNewLandPlot