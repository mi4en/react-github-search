import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h2>
				<i className={icon}></i> {title}
			</h2>
			<ul>
				<li>
					<Link to='/'>Home</Link>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'Githuber',
	icon: 'fab fa-github',
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default Navbar;
