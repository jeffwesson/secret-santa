import React, { Component } from 'react';
import TextInput from './components/TextInput';
import SelectInput from './components/SelectInput';
import logo from './logo.svg';
import './App.css';

function App () {
	const verbs = ['need', 'want', 'love', 'like', 'use'];
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<h1 className='App-title'>Secret Santa</h1>
			</header>
			<TextInput name='participant-name' />
			<SelectInput name='options' verbs={verbs} />
		</div>
	);
}

export default App;
