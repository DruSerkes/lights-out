import * as React from 'react';
import './Footer.css';

export const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="Footer">
			<a href="https://github.com/druserkes" className="Footer-Text" target="_blank" rel="noopener noreferrer">
				Serkules &copy; {year}
			</a>
		</footer>
	);
};