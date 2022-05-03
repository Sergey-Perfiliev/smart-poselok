import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import './PopUp.scss'

const CreateNewVote = ({ createNewVoteMode, setCreateNewVoteMode, addVote }) => {
	const [titleValue, setTitleValue] = useState('')
	const [inputList, setInputList] = useState([''])

	const handleInputAdd = () => {
		setInputList([...inputList, ''])
	}

	const handleInputRemove = (index) => {
		const list = [...inputList]
		list.splice(index, 1)
		setInputList(list)
	}

	const handleInputChange = (e, i) => {
		const { value } = e.target
		const list = [...inputList]
		list[i] = value
		setInputList(list)
	}

	const handleTitleValue = (e) => {
		setTitleValue(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setCreateNewVoteMode(false)
		const options = inputList.map(el => el = { id: Math.floor(Math.random() * 999), description: el  })
		addVote(titleValue, options)
		console.log(titleValue, inputList);
	}

	const closeModal = () => {
		setCreateNewVoteMode(false)
	}

	return (
		<Popup open={createNewVoteMode} closeOnDocumentClick onClose={() => setCreateNewVoteMode(false)} >
			<form className="popup-view">
				<div className="popup-header">
					<h2>Создать новое голосование</h2>
				</div>

				<div className="popup-content">
					<div className='popup-content__container'>
						<h3>Тема опроса<span onClick={closeModal} className='delete-cross delete-cross-title'>×</span></h3>
						<div className='input-wrapper'>
							<input type="text" className='popup-input' value={titleValue} onChange={e => handleTitleValue(e)} />
						</div>
					</div>
					<div className='popup-content__container'>
						<h3>Варианты ответа</h3>
						{
							inputList.map((input, i) => (
								<div className='input-container' key={i}>
									<div className='input-wrapper'>
										<input
											name='inputValue'
											type="text"
											className='popup-input'
											value={input}
											onChange={(e) => handleInputChange(e, i)}
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
				</div>

				<div className="popup-footer">
					<button className="btn btn-profile btn-popup btn-popup--submit" onClick={(e) => handleSubmit(e)}>Создать</button>
				</div>
			</form>
		</Popup>
	)
}

export default CreateNewVote