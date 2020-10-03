function createArray(num) {
	const array = []
	let i = 1
	while (num--) {
		array.push(i++)
	}
	return array
}

function sortDesc(valuesArray, labelsArray) {
	// selection sort descending
	for (let i = 0; i < valuesArray.length - 1; i++) {
		for (let j = i + 1; j < valuesArray.length; j++) {
			if (Number(valuesArray[i]) < Number(valuesArray[j])) {
				let temp = valuesArray[i]
				valuesArray[i] = valuesArray[j]
				valuesArray[j] = temp
				// also swap the labels array
				temp = labelsArray[i]
				labelsArray[i] = labelsArray[j]
				labelsArray[j] = temp
			}
		}
	}
	return [valuesArray, labelsArray]
}

function createValToPxFunc(minPx, maxPx, minPt, maxPt) {
	const unit = (maxPx - minPx) / (maxPt - minPt)
	return function valToPx(value) {
		return minPx + (value - minPt) * unit
	}
}

function createLabelPositions(normal, skip, start, inputValues) {
	const limit = 10
	const array = []
	let currentVal = start
	for (let i = 0; i < limit; i++) {
		array.push(currentVal)
		currentVal += skip + normal
	}
	return array.map(val => val + 'px')
}

function createPlotterValuesArray(min, max) {
	const array = []
	const diff = Number((max - min) / 10)
	let currentVal = Number(min)
	for (let i = 1; i <= 11; i++) {
		array.push(Math.round(currentVal))
		currentVal += diff
	}
	return array
}

function countMatrixElements(matrix, outerLength, innerLength) {
	// counts total elements in the matrix which is not undefined
	let totalElements = 0
	for (let i = 0; i < outerLength; i++) {
		for (let j = 0; j < innerLength; j++) {
			if (matrix[i] && matrix[i][j]) {
				totalElements++
			}
		}
	}
	return totalElements
}

function getMinMaxMatrix(matrix) {
	// counts total elements in the matrix which is not undefined
	let min = matrix[0][0]
	let max = matrix[0][0]
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (Number(matrix[i][j]) > Number(max)) {
				max = matrix[i][j]
			}
			if (Number(matrix[i][j]) < Number(min)) {
				min = matrix[i][j]
			}
		}
	}
	return { min, max }
}

export {
	createArray,
	countMatrixElements,
	getMinMaxMatrix,
	createPlotterValuesArray,
	createLabelPositions,
	createValToPxFunc,
	sortDesc,
}
