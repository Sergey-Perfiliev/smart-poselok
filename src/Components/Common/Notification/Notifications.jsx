import React from 'react'
import ReactDOM from 'react-dom' 
import { connect } from 'react-redux'
import { addNotification, removeNotification } from '../../../Redux/notification-reducer'
import Notification from './Notification'

const NotificationProvider = (props) => {
	return ReactDOM.createPortal(
		<div className='notification-wrapper'>
			{props?.notifications?.map(note => {
				return <Notification
					removeNotification={props.removeNotification}
					key={note.id}
					{...note}
				/>
			})}
		</div>,
		document.getElementById('notification-root')
	)
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
	addNotification, removeNotification
})(NotificationProvider)