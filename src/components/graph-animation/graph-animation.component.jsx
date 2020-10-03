import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	getMinMaxMatrix,
	createPlotterValuesArray,
	createLabelPositions,
	createValToPxFunc,
	sortDesc,
} from '../../utils'

import './graph-animation.styles.scss'

let initialState = null

class GraphAnimation extends Component {
	constructor(props) {
		super(props)
		const { min, max } = getMinMaxMatrix(props.inputValues)
		const [
			updatedCurrentLabelValues,
			updatedPositionedInputLabels,
		] = sortDesc([...props.inputValues[0]], [...props.inputLabels])
		initialState = {
			labelRanks: {},
			labelPositions: createLabelPositions(
				30,
				10,
				50,
				props.inputValues[0]
			),
			animationRunning: false,
			popYearAnimation: false,
			showPlayBtn: true,
			currentYear: props.startYear,
			currentIndex: 0,
			positionedInputLabels: updatedPositionedInputLabels,
			currentLabelValues: updatedCurrentLabelValues,
			valToPx: createValToPxFunc(70, 770, min, max),
		}
		this.state = initialState
	}
	componentDidMount() {
		const {
			plotterFormFilled,
			labelsFormFilled,
			valuesFormFilled,
			history,
		} = this.props

		if (!plotterFormFilled || !labelsFormFilled || !valuesFormFilled) {
			history.push('/plotter-form')
		}
	}

	startAnimation = () => {
		this.setState({
			...initialState,
			showPlayBtn: false,
		})
		setTimeout(() => {
			this.setState({
				animationRunning: true,
			})
		}, 100)
		const {
			inputValues,
			yearDifference,
			startYear,
			totalYears,
		} = this.props
		const animationInterval = setInterval(() => {
			const { currentIndex } = this.state
			if (currentIndex < totalYears) {
				const { positionedInputLabels } = this.state

				const updatedCurrentIndex = currentIndex + 1
				const updatedCurrentLabelValues =
					inputValues[updatedCurrentIndex]
				const updatedPositionedInputLabels = positionedInputLabels

				this.setState({
					currentIndex: updatedCurrentIndex,
					currentYear:
						Number(startYear) +
						updatedCurrentIndex * yearDifference,
					currentLabelValues: updatedCurrentLabelValues,
					positionedInputLabels: updatedPositionedInputLabels,
					popYearAnimation: true,
				})
				setTimeout(() => {
					this.setState({
						popYearAnimation: false,
					})
				}, 1000)
			} else {
				setTimeout(() => {
					this.setState({
						showPlayBtn: true,
						animationRunning: false,
					})
				}, 300)
				clearInterval(animationInterval)
			}
		}, 2000)
	}
	render() {
		const { inputValues, valueName, mainTitle } = this.props
		const {
			labelPositions,
			positionedInputLabels,
			currentYear,
			currentLabelValues,
			popYearAnimation,
			showPlayBtn,
			animationRunning,
			valToPx,
		} = this.state

		const { min, max } = getMinMaxMatrix(inputValues)
		const plotterValuesArray = createPlotterValuesArray(min, max)

		return (
			<div>
				<h5 className='mb-3'>{mainTitle}</h5>
				<div className='main-plotter'>
					<div className='left-graph'>
						{showPlayBtn && (
							<button
								className='play-btn btn btn-info'
								onClick={this.startAnimation}>
								Play
							</button>
						)}
						<div className='labels'>
							{positionedInputLabels.map((label, index) => (
								<div
									key={index}
									className='label'
									style={{ top: labelPositions[index] }}>
									{label}
								</div>
							))}
						</div>
					</div>
					<div className='right-graph'>
						<div className='measures'>
							{plotterValuesArray.map((val, index) => (
								<div className='measure-point' key={index}>
									{val}
								</div>
							))}
						</div>
						<div className='graph'>
							<h6 className='value-name'>{valueName}</h6>
							<h5 className='year'>
								<span
									className={`${
										popYearAnimation ? 'pop' : ''
									} `}>
									{currentYear}
								</span>
							</h5>
							{currentLabelValues.map((val, index) => (
								<div
									key={index}
									className='graph-item'
									style={{
										top: labelPositions[index],
										width: valToPx(val),
										transition: animationRunning
											? '2s linear'
											: '0s',
									}}>
									{val}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	mainTitle: state.mainTitle,
	valueName: state.valueName,
	startYear: state.startYear,
	yearDifference: state.yearDifference,
	endYear: state.endYear,
	animationSpeed: state.animationSpeed,
	totalInputLabels: state.totalInputLabels,
	plotterFormFilled: state.plotterFormFilled,
	labelsFormFilled: state.labelsFormFilled,
	valuesFormFilled: state.valuesFormFilled,
	inputLabels: state.inputLabels,
	inputValues: state.inputValues,
	totalYears: state.totalYears,
})

export default connect(mapStateToProps)(withRouter(GraphAnimation))
