import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

export default function App() {
	return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
	);
}
