import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
	state = {
		users: [],
		loading: false,
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

	render() {
		const { loading, users } = this.state;

		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0 ? true : false}
					/>
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;
