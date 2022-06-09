import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import '../PopUp.scss'

const CreateNewVote = ({ token, currentVillage, createNewVoteMode, setCreateNewVoteMode, createVote }) => {
	const [titleValue, setTitleValue] = useState('')
	const [inputList, setInputList] = useState([''])
	const [disabled, setDisabled] = useState(true)

	const handleInputAdd = () => {
		setInputList([...inputList, ''])
	}

	const handleInputRemove = (index) => {
		const list = [...inputList]
		list.splice(index, 1)
		setInputList(list)
	}

	const handleDisabledButton = (title, inputs) => {
		console.log(!!title, inputs.some(inputVal => !!inputVal))
		!!title && inputs.some(inputVal => !!inputVal)
			? setDisabled(false)
			: setDisabled(true)
	}

	const handleInputChange = (e, i) => {
		const { value } = e.target
		const list = [...inputList]
		list[i] = value
		setInputList(list)
		handleDisabledButton(titleValue, list)
	}

	const handleTitleValue = (e) => {
		const { value } = e.target
		setTitleValue(value)
		handleDisabledButton(value, inputList)
	}

	const handleSubmit = (e) => {
		const options = inputList.map(el => el = { description: el })
		createVote(currentVillage.id, { topic: titleValue, options }, token)
		setCreateNewVoteMode(false)
	}

	const closeModal = () => {
		setCreateNewVoteMode(false)
	}

	return (
		<Popup open={createNewVoteMode} closeOnDocumentClick onClose={() => setCreateNewVoteMode(false)} >
			<div className="popup-view">
				<div className="popup-header">
					<h2>Создать новое голосование</h2>
				</div>

				<form className="popup-content">
					<div className='popup-content__container'>
						<h3 className='popup-content__container-title'>Тема опроса<span onClick={closeModal} className='delete-cross delete-cross-title'>×</span></h3>
						<div className='input-wrapper'>
							<input name='createNewVoteTitle' type="text" className='popup-input' value={titleValue} onChange={e => handleTitleValue(e)} required />
						</div>
					</div>
					<div className='popup-content__container'>
						<h3 className='popup-content__container-title'>Варианты ответа</h3>
						{
							inputList.map((input, i) => (
								<div className='input-container' key={i}>
									<div className='input-wrapper'>
										<input
											name={`inputValue-${i}`}
											type="text"
											className='popup-input'
											value={input}
											onChange={(e) => handleInputChange(e, i)}
											autoFocus
											required
										/>
										{inputList.length > 1 && <span className='delete-cross delete-cross-input' onClick={() => handleInputRemove(i)}>×</span>}
									</div>
									{
										inputList.length - 1 === i && inputList.length < 5 && <div className="input-wrapper">
											<input
												type="text"
												className='popup-input popup-input__new'
												placeholder='Добавить вариант'
												onClick={handleInputAdd}
												readOnly
											/>
										</div>
									}
								</div>
							))
						}
					</div>
					<div className="popup-footer">
						<button
							type="submit"
							className={`btn btn-profile btn-popup btn-popup--submit ${disabled ? 'btn-profile--pending' : ''}`}
							onClick={handleSubmit}
						>Создать</button>
					</div>
				</form>
			</div >
		</Popup >
	)
}

export default CreateNewVote