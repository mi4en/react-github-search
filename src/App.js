import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

class App extends Component {
	state = {
		users: [],
		loading: false,
	};

	async componentDidMount() {
		this.setState({ loading: true });

		try {
			const res = await axios.get('https://api.github.com/users');
			this.setState({ users: res.data });

			console.log('users: ', res.data);
		} catch (error) {
			console.error(error);
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Users loading={this.state.loading} users={this.state.users} />
				</div>
			</div>
		);
	}
}

export default App;
