import ActionTypes from './types.js'

const updateMany = formValues => ({
	type: ActionTypes.UPDATE_MANY,
	payload: formValues,
})

const updateOne = (name, value) => ({
	type: ActionTypes.UPDATE,
	payload: [name, value],
})

const reset = () => ({
	type: ActionTypes.RESET,
})

export { updateMany, updateOne, reset }
