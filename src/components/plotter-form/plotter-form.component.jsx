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

				const { startYear, yearDifference } = this.state
				let endYear = Number(startYear) + 10 * Number(yearDifference)
				endYear =
					endYear === Number(startYear) ||
					endYear === Number(yearDifference) * 10
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
			animationSpeed,
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
						<label htmlFor='yearDifference'>
							Enter difference:
						</label>
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
				<p>Animation Speed:</p>
				<div className='row'>
					<div className='form-group col-2'>
						<label htmlFor='slow' className='mr-2'>
							Slow{' '}
						</label>
						<input
							id='slow'
							type='radio'
							name='animationSpeed'
							value='slow'
							onChange={this.onChange}
							required
						/>
					</div>
					<div className='form-group col-2'>
						<label htmlFor='medium' className='mr-2'>
							Medium{' '}
						</label>

						<input
							id='medium'
							type='radio'
							name='animationSpeed'
							onChange={this.onChange}
							value='medium'
							defaultChecked
							required
						/>
					</div>
					<div className='form-group col-2'>
						<label htmlFor='fast' className='mr-2'>
							Fast{' '}
						</label>
						<input
							id='fast'
							type='radio'
							name='animationSpeed'
							onChange={this.onChange}
							value='fast'
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
					value='Proceed to enter input values'
				/>
			</form>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	updateMany: formValues => dispatch(updateMany(formValues)),
})

export default connect(null, mapDispatchToProps)(withRouter(PlotterForm))
