import React, { Component } from 'react'
import './header.styles.scss'

export default class Header extends Component {
	render() {
		return (
			<h4 className='mb-3 header'>
				<span className='large'>A</span>
				qua Graph <small style={{ fontSize: '18px' }}>by Baraja</small>
			</h4>
		)
	}
}
