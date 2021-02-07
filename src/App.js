import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Get user repos
	const getUserRepos = async (username) => {
		setLoading(true);

		try {
			const res = await axios.get(
				`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
			);

			setRepos(res.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	// Alert State
	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search showAlert={showAlert} />

										<Users />
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
										getUserRepos={getUserRepos}
										repos={repos}
									></User>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
