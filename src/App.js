import React from 'react'
import './App.css'

import Header from './components/header/header.component'
import Home from './components/home/home.component'

import PlotterForm from './components/plotter-form/plotter-form.component'
import LabelsForm from './components/labels-form/labels-form.component'
import ValuesForm from './components/values-form/values-form.component'
import GraphAnimation from './components/graph-animation/graph-animation.component'

import { Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className='container pt-3 pb-4'>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/plotter-form' component={PlotterForm} />
				<Route path='/labels-form' component={LabelsForm} />
				<Route path='/values-form' component={ValuesForm} />
				<Route path='/graph-animation' component={GraphAnimation} />
			</Switch>
		</div>
	)
}

export default App
