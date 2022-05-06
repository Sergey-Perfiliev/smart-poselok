import React from 'react'
import Popup from 'reactjs-popup'
import '../PopUp.scss'
import './CreateNewArea.scss'
import CreateNewLandPlot from './CreateNewForms/CreateNewLandPlot'
import CreateNewStreet from './CreateNewForms/CreateNewStreet'
import CreateNewVillage from './CreateNewForms/CreateNewVillage'

const CreateNewArea = ({ villages, streets, createNewAreaMode, setCreateNewAreaMode }) => {
	const [createVillageMode, setCreateVillageMode] = React.useState(false)
	const [createStreetMode, setCreateStreetMode] = React.useState(false)
	const [createLandPlotMode, setCreateLandPlotMode] = React.useState(false)

	const handleCreateVillage = () => {
		setCreateVillageMode(false)
	}
	const handleCreateStreet = () => {
		setCreateStreetMode(false)
	}
	const handleCreateLandPlot = () => {
		setCreateLandPlotMode(false)
	}

	const closeModal = () => { setCreateNewAreaMode(false) }

	return (
		<Popup open={createNewAreaMode} onClose={() => setCreateNewAreaMode(false)} >
			<div className="popup-view">
				<div className="popup-header">
					<h2>Создать новую землю</h2>
				</div>
				<div className="popup-content">
					<div className='popup-content__container'>
						{
							createVillageMode ? <CreateNewVillage handleCreateVillage={handleCreateVillage} setCreateVillageMode={setCreateVillageMode} /> :
								createStreetMode ? <CreateNewStreet handleCreateStreet={handleCreateStreet} villages={villages} setCreateStreetMode={setCreateStreetMode} /> :
									createLandPlotMode ? <CreateNewLandPlot handleCreateLandPlot={handleCreateLandPlot} villages={villages} streets={streets} setCreateLandPlotMode={setCreateLandPlotMode} /> :
										<>
											<h3 className='popup-content__container-title popup-content__create_area-title'>Добавить<span onClick={closeModal} className='delete-cross delete-cross-title delete-cross-title__new-area'>×</span></h3>
											<div>
												<button className="btn btn-profile btn-popup btn-popup--submit" onClick={() => setCreateVillageMode(true)}>Посёлок</button>
												<button className="btn btn-profile btn-popup btn-popup--submit" onClick={() => setCreateStreetMode(true)}>Улица</button>
												<button className="btn btn-profile btn-popup btn-popup--submit" onClick={() => setCreateLandPlotMode(true)}>Участок</button>
											</div>
										</>
						}
					</div>
				</div>
			</div>
		</Popup>
	)
}

export default CreateNewArea