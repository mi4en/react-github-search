import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ icon, title }) => {
	return (
		<nav className='navbar bg-primary'>
			<h2>
				<i className={icon}></i> {title}
			</h2>
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
