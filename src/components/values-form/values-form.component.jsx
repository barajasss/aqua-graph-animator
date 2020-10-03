import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateOne } from '../../redux/actions'
import { countMatrixElements } from '../../utils'

class ValuesForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			year: Number(props.startYear),
			currentYearIndex: 0,
			inputValues: [],
		}
	}
	componentDidMount() {
		const { plotterFormFilled, labelsFormFilled, history } = this.props
		if (!plotterFormFilled || !labelsFormFilled) {
			history.push('/plotter-form')
		}
	}
	handleChange = e => {
		const { currentYearIndex } = this.state
		const dataIndex = e.target.getAttribute('data-index')
		const inputValuesUpdated = [...this.state.inputValues]
		if (!inputValuesUpdated[currentYearIndex]) {
			inputValuesUpdated[currentYearIndex] = []
		}
		inputValuesUpdated[currentYearIndex][dataIndex] = e.target.value
		this.setState({
			inputValues: inputValuesUpdated,
		})
	}
	handleSubmit = e => {
		e.preventDefault()
		const { updateOne, history, inputLabels } = this.props
		const { inputValues } = this.state
		if (
			countMatrixElements(inputValues, 11, inputLabels.length) ===
			inputLabels.length * 11
		) {
			updateOne('inputValues', inputValues)
			updateOne('valuesFormFilled', true)
			history.push('/graph-animation')
		}
	}
	increment = () => {
		let { yearDifference } = this.props
		const { currentYearIndex } = this.state
		if (currentYearIndex < 10) {
			this.setState(state => ({
				year: Number(state.year) + Number(yearDifference),
				currentYearIndex: state.currentYearIndex + 1,
			}))
		}
	}
	decrement = () => {
		let { yearDifference } = this.props
		const { currentYearIndex } = this.state
		if (currentYearIndex > 0) {
			this.setState(state => ({
				year: Number(state.year) - Number(yearDifference),
				currentYearIndex: state.currentYearIndex - 1,
			}))
		}
	}
	render() {
		const { year } = this.state
		let { inputLabels } = this.props
		const { inputValues, currentYearIndex } = this.state
		return (
			<div>
				<h4>Values Form</h4>
				<p>Year: {year}</p>
				<p>Form number: {currentYearIndex + 1} / 11</p>
				<p>
					Total filled:{' '}
					{countMatrixElements(inputValues, 11, inputLabels.length)} /
					{inputLabels.length * 11}
				</p>
				<form onSubmit={this.handleSubmit}>
					{inputLabels.map((label, index) => {
						let defaultValue = ''
						let inputValueArray = inputValues[currentYearIndex]
						if (inputValueArray) {
							if (inputValueArray[index]) {
								defaultValue = inputValueArray[index]
							}
						}
						return (
							<div className='form-group' key={index}>
								<label htmlFor={`${label}-${year}`}>
									{label}
								</label>
								<input
									className='form-control'
									id={`${label}-${year}`}
									name={`${label}-${year}`}
									data-index={index}
									type='number'
									value={defaultValue}
									onChange={this.handleChange}
								/>
							</div>
						)
					})}
					{countMatrixElements(
						inputValues,
						11,
						inputLabels.length
					) ===
						inputLabels.length * 11 && (
						<div className='form-group'>
							<input
								type='submit'
								className='btn btn-info form-control'
								value='Submit the values'
							/>
							<br />
						</div>
					)}
				</form>
				<button className='btn btn-info mr-2' onClick={this.decrement}>
					Previous
				</button>
				<button className='btn btn-info' onClick={this.increment}>
					Next
				</button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	plotterFormFilled: state.plotterFormFilled,
	labelsFormFilled: state.labelsFormFilled,
	startYear: state.startYear,
	yearDifference: state.yearDifference,
	inputLabels: state.inputLabels,
})

const mapDispatchToProps = dispatch => ({
	updateOne: (name, value) => dispatch(updateOne(name, value)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ValuesForm))
