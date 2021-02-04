import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
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

	// Get single user
	getUser = async (username) => {
		this.setState({ loading: true });

		try {
			const res = await axios.get(
				`http://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
			);

			this.setState({ user: res.data });
		} catch (error) {
			console.error(error);
		} finally {
			this.setState({ loading: false });
		}
	};

	// Get user repos
	getUserRepos = async (username) => {
		this.setState({ loading: true });

		try {
			const res = await axios.get(
				`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
			);

			this.setState({ repos: res.data });
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
		const { loading, users, user, repos } = this.state;

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

										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>

							<Route exact path='/about' component={About} />

							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									></User>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
