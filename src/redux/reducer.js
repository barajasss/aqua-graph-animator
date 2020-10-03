import ActionTypes from './types'

const initialState = {
	mainTitle: '',
	valueName: '',
	startYear: 0,
	yearDifference: 0,
	endYear: 0,
	animationSpeed: 'medium',
	totalInputLabels: 0,
	plotterFormFilled: false,
	labelsFormFilled: false,
	valuesFormFilled: false,
	inputLabels: [],
	inputValues: [[], [], [], [], [], [], [], [], [], [], []],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_MANY:
			return {
				...state,
				...action.payload,
			}
		case ActionTypes.UPDATE:
			return {
				...state,
				[action.payload[0]]: action.payload[1],
			}
		case ActionTypes.RESET:
			return initialState
		default:
			return state
	}
}

export default reducer
