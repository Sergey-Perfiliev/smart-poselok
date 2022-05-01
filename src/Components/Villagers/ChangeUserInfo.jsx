import { Field, Form, Formik } from 'formik'
import React from 'react'
import Popup from 'reactjs-popup'

const ChangeUserInfo = ({ changeUserInfoMode, setChangeUserInfoMode, user, changeVillagerInfo }) => {
	const { email, last_name, first_name, patronymic } = user

	return (
		<Popup open={changeUserInfoMode} closeOnDocumentClick onClose={() => setChangeUserInfoMode(false)} >
			<div className="popup-view">

				<div className="popup-header">
					<h2>Изменить данные пользователя</h2>
				</div>
				<Formik
					initialValues={{
						id: user.id,
						email: email,
						last_name: last_name,
						first_name: first_name,
						patronymic: patronymic || '',
						role: user.role
					}}
					onSubmit={async (values) => {
						changeVillagerInfo(values)
						setChangeUserInfoMode(false)
					}}
				>
					<Form>
						<div className="popup-content">
							<div className='popup-content__container'>
								<h3>Информация</h3>
								<div className='input-wrapper'>
									<Field name="email" placeholder="Email" type="email" className='popup-input' />
								</div>
								<div className='input-wrapper'>
									<Field name="last_name" placeholder="Фамилия" className='popup-input' />
								</div>
								<div className='input-wrapper'>
									<Field name="first_name" placeholder="Имя" className='popup-input' />
								</div>
								<div className='input-wrapper'>
									<Field name="patronymic" placeholder="Отчество" className='popup-input' />
								</div>
							</div>
						</div>

						<div className="popup-footer">
							<button className="btn btn-profile btn-popup btn-popup--submit">Изменить</button>
							<button type='submit' className="btn btn-profile btn-popup btn-popup--cancel">Отменить</button>
						</div>
					</Form>
				</Formik>
			</div>
		</Popup>
	)
}

export default ChangeUserInfo