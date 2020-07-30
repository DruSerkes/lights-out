import React from 'react';
import './Footer.css';

const Footer = ({ year, copy = false }) => {
	return (
		<footer className="Footer">
			<a href="https://github.com/druserkes" className="Footer-Text">
				Serkules &copy; {year}
			</a>
		</footer>
	);
};

export default Footer;
