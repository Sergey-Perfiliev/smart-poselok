import { useFormik } from 'formik'
import React from 'react'
import CustomAsyncSelect from '../../../Common/CustomAsyncSelect'



const CreateNewLandPlot = ({ getStreets, handleCreateLandPlot, currentVillage, streets, setCreateLandPlotMode, token }) => {
	const formik = useFormik({
		initialValues: {
			street: '',
			land_plot: ''
		},
		onSubmit: (values) => {
			//async call
			handleCreateLandPlot(values.street.id, values.land_plot, token)
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
					value={formik.values.street}
					onChange={value => formik.setFieldValue('street', value)}
					data={streets}
					query={() => getStreets(currentVillage.id)}
					placeholder={'Улица'}
					required
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
					autoFocus
					required
				/>
			</div>
			<button type='submit' className='btn btn-profile btn-popup btn-popup--submit'>Создать</button>
		</form>
	)
}

export default CreateNewLandPlot