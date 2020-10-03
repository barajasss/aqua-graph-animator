import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateMany } from '../../redux/actions'

class PlotterForm extends Component {
	constructor() {
		super()
		this.state = {
			mainTitle: '',
			valueName: '',
			startYear: '',
			yearDifference: '',
			totalYears: 10,
			endYear: '',
			animationSpeed: 'medium',
			totalInputLabels: '',
			plotterFormFilled: false,
		}
	}
	onChange = e => {
		this.setState(
			{
				[e.target.name]: e.target.value,
			},
			() => {
				// update the endYear

				const { startYear, yearDifference, totalYears } = this.state
				let endYear =
					Number(startYear) + totalYears * Number(yearDifference)
				endYear =
					endYear === Number(startYear) ||
					endYear === Number(yearDifference) * totalYears
						? ''
						: endYear
				this.setState({
					endYear,
				})
			}
		)
	}
	onSubmit = async e => {
		e.preventDefault()
		const { updateMany, history } = this.props
		this.setState(
			{
				plotterFormFilled: true,
			},
			() => {
				const formValues = this.state
				updateMany(formValues)
				history.push('/labels-form')
			}
		)
	}
	render() {
		const {
			mainTitle,
			valueName,
			startYear,
			yearDifference,
			endYear,
			totalYears,
			totalInputLabels,
		} = this.state
		return (
			<form onSubmit={this.onSubmit}>
				<div className='form-group'>
					<label htmlFor='graph-title'>
						Main Title for the Graph Animation Show:
					</label>
					<input
						id='mainTitle'
						type='text'
						className='form-control'
						name='mainTitle'
						value={mainTitle}
						onChange={this.onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='valueName'>
						Name of the values to plot (eg. dollars, ranking, etc):
					</label>
					<input
						id='valueName'
						name='valueName'
						value={valueName}
						onChange={this.onChange}
						type='text'
						className='form-control'
						required
					/>
				</div>
				<div className='row'>
					<div className='form-group col'>
						<label htmlFor='startYear'>Enter start year:</label>
						<input
							id='startYear'
							name='startYear'
							value={startYear}
							type='number'
							className='form-control'
							onChange={this.onChange}
							required
						/>
					</div>
					<div className='form-group col'>
						<label htmlFor='yearDifference'>Year difference:</label>
						<input
							id='yearDifference'
							name='yearDifference'
							value={yearDifference}
							type='number'
							className='form-control'
							onChange={this.onChange}
							required
						/>
					</div>
					<div className='form-group col'>
						<label htmlFor='totalYears'>Total Years:</label>
						<input
							id='totalYears'
							name='totalYears'
							value={totalYears}
							type='number'
							className='form-control'
							onChange={this.onChange}
							required
						/>
					</div>
					<div className='form-group col'>
						<label htmlFor='endYear'>End year:</label>
						<input
							id='endYear'
							name='endYear'
							value={endYear}
							type='number'
							className='form-control'
							readOnly
							disabled
							onChange={this.onChange}
							required
						/>
					</div>
				</div>
				<div className='form-group'>
					<label htmlFor='totalInputLabels'>
						Total number of input labels:{' '}
					</label>
					<input
						type='number'
						name='totalInputLabels'
						id='totalInputLabels'
						value={totalInputLabels}
						className='form-control'
						onChange={this.onChange}
						min={1}
						max={10}
						required
					/>
				</div>
				<input
					className='btn btn-info'
					style={{ minWidth: '100px' }}
					type='submit'
					value='Proceed to enter label names'
				/>
			</form>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateMany: formValues => dispatch(updateMany(formValues)),
})

export default connect(null, mapDispatchToProps)(withRouter(PlotterForm))
