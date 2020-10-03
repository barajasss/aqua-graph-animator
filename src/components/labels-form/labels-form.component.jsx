import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateOne } from '../../redux/actions'
import { createArray } from '../../utils'

function arrayToObj(array) {
	const obj = {}
	for (let i = 0; i < array.length; i++) {
		obj[`label-${i + 1}`] = array[i]
	}
	console.log(array)
	return obj
}

class LabelsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			labelsFormFilled: false,
			inputLabels: arrayToObj(props.inputLabels),
		}
	}
	handleSubmit = e => {
		e.preventDefault()
		const { history, updateOne } = this.props
		const { inputLabels } = this.state

		updateOne('labelsFormFilled', true)
		updateOne('inputLabels', [...Object.values(inputLabels)])
		history.push('/values-form')
	}
	handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		this.setState(state => ({
			inputLabels: {
				...state.inputLabels,
				[name]: value,
			},
		}))
	}
	componentDidMount() {
		const { plotterFormFilled, history } = this.props
		if (!plotterFormFilled) {
			history.push('/plotter-form')
		}
	}
	clear = () => {
		const { inputLabels } = this.state
		const updatedInputLabels = { ...inputLabels }
		for (let prop in updatedInputLabels) {
			updatedInputLabels[prop] = ''
		}
		this.setState({ inputLabels: updatedInputLabels })
	}
	render() {
		const { totalInputLabels } = this.props
		const { inputLabels } = this.state
		return (
			<div>
				<h4>
					Label or product are the individual items that you will be
					comparing. Enter all the{' '}
					{totalInputLabels >= 1 ? totalInputLabels : ''} label names
					below.
				</h4>
				<form onSubmit={this.handleSubmit}>
					{[...createArray(totalInputLabels)].map(val => (
						<div className='form-group' key={val}>
							<label htmlFor={`label-${val}`}>Label {val}</label>
							<input
								className='form-control'
								id={`label-${val}`}
								name={`label-${val}`}
								type='text'
								value={inputLabels[`label-${val}`]}
								required
								onChange={this.handleChange}
							/>
						</div>
					))}
					<button
						type='button'
						className='btn btn-danger mr-2'
						onClick={this.clear}>
						Clear{' '}
					</button>
					<input
						className='btn btn-info'
						type='submit'
						value='Continue to enter input values'
					/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	totalInputLabels: state.totalInputLabels,
	plotterFormFilled: state.plotterFormFilled,
	inputLabels: state.inputLabels,
})

const mapDispatchToProps = dispatch => ({
	updateOne: (name, value) => dispatch(updateOne(name, value)),
})

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LabelsForm)
)
