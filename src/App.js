import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null,
	};

	// Search Github Users
	searchUsers = async (text) => {
		this.setState({ loading: true });

		try {
			const res = await axios.get(
				`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
			);
			this.setState({ users: res.data.items });
		} catch (error) {
			console.error(error);
		} finally {
			this.setState({ loading: false });
		}
	};

	// Clear Users from State
	clearUsers = () => this.setState({ users: [], loading: false });

	// Alert State
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	};

	render() {
		const { loading, users } = this.state;

		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
									</Fragment>
								)}
							></Route>
						</Switch>

						<Users loading={loading} users={users} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
