import { connect } from 'react-redux'
import React from 'react'
import Popup from 'reactjs-popup'
import '../PopUp.scss'
import './CreateNewArea.scss'
import CreateNewLandPlot from './CreateNewForms/CreateNewLandPlot'
import CreateNewStreet from './CreateNewForms/CreateNewStreet'
import CreateNewVillage from './CreateNewForms/CreateNewVillage'
import {
	getStreets, getLandPlots, createVillage, createStreet, createLandPlot
} from '../../../Redux/village-reducer'

const CreateNewArea = ({
	streets, createNewAreaMode, setCreateNewAreaMode, currentVillage, getStreets,
	createVillage, createStreet, createLandPlot, token
}) => {
	const [createVillageMode, setCreateVillageMode] = React.useState(false)
	const [createStreetMode, setCreateStreetMode] = React.useState(false)
	const [createLandPlotMode, setCreateLandPlotMode] = React.useState(false)

	const handleCreateVillage = (villageName, token) => {
		createVillage(villageName, token)
		setCreateVillageMode(false)
	}

	const handleCreateStreet = (villageId, streetName, token) => {
		createStreet(villageId, streetName, token)
		setCreateStreetMode(false)
	}

	const handleCreateLandPlot = (streetId, landPlotName, token) => {
		createLandPlot(streetId, landPlotName, token)
		setCreateLandPlotMode(false)
	}

	const closeModal = () => setCreateNewAreaMode(false)
	console.log(currentVillage, streets, getStreets, token)

	return (
		<Popup open={createNewAreaMode} onClose={() => setCreateNewAreaMode(false)} >
			<div className="popup-view">
				<div className="popup-header">
					<h2>Создать новую землю</h2>
				</div>
				<div className="popup-content">
					<div className='popup-content__container'>
						{
							createVillageMode ?
								<CreateNewVillage
									handleCreateVillage={handleCreateVillage}
									setCreateVillageMode={setCreateVillageMode}
									token={token}
								/> :
								createStreetMode ?
									<CreateNewStreet
										handleCreateStreet={handleCreateStreet}
										currentVillage={currentVillage}
										setCreateStreetMode={setCreateStreetMode}
										token={token}
									/> :
									createLandPlotMode ?
										<CreateNewLandPlot
											getStreets={getStreets}
											handleCreateLandPlot={handleCreateLandPlot}
											currentVillage={currentVillage}
											streets={streets}
											setCreateLandPlotMode={setCreateLandPlotMode}
											token={token}
										/> :
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

const mapStateToProps = (state) => ({
	token: state.auth.token
})

export default connect(mapStateToProps, {
	getStreets, getLandPlots, createVillage, createStreet, createLandPlot
})(CreateNewArea)