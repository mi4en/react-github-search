import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
	static defaultProps = {
		title: 'Githuber',
		icon: 'fab fa-github',
	};

	static propTypes = {
		title: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
	};

	render() {
		return (
			<nav className='navbar bg-primary'>
				<h2>
					<i className={this.props.icon}></i> {this.props.title}
				</h2>
			</nav>
		);
	}
}

export default Navbar;
