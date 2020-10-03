import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
	render() {
		return (
			<div className='mt-4'>
				<h4>Welcome to Aqua Graph.</h4>
				<p>Pick your choice</p>
				<div>
					<Link to='/plotter-form' className='btn btn-info mr-2'>
						Plotter Form
					</Link>
					<Link to='/labels-form' className='btn btn-info mr-2'>
						Labels Form
					</Link>
					<Link to='/values-form' className='btn btn-info mr-2'>
						Values Form
					</Link>
					<Link
						to='/graph-animation'
						className='btn btn-success mr-2'>
						Graph Animation
					</Link>
				</div>
			</div>
		)
	}
}
