import React from 'react';
import Form from './components/Form';
import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<h1 className='App-title'>Secret Santa</h1>
			</header>
			<Form />
		</div>
	);
}

export default App;
