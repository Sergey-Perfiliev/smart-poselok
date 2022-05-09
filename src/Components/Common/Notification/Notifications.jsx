import React from 'react'
import { connect } from 'react-redux'
import { addNotification, removeNotification } from '../../../Redux/notification-reducer'
import Notification from './Notification'

const NotificationProvider = (props) => {
	return (
		<div className='notification-wrapper'>
			{props?.notifications?.map(note => {
				return <Notification
					removeNotification={props.removeNotification}
					key={note.id}
					{...note}
				/>
			})}
		</div>
	)
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
	addNotification, removeNotification
})(NotificationProvider)