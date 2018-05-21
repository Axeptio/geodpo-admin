import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import TablePage from './TablePage'
import ProfilePage from './ProfilePage'
import './App.css'

class App extends Component {

	render() {

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={({ match, history }) => (<TablePage history={history} api={this.props.options.api}/>)}/>
					<Route path="/:id/:state" component={({ match, history }) => (<ProfilePage history={history} id={match.params.id} state={match.params.state} api={this.props.options.api}/>)}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App