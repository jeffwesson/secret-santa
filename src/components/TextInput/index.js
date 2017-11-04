import React, { Component } from 'react';
import { hyphensToSpaces } from '../../lib/formatters';
import TextInputCss from './TextInput.css';

class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name
			, value: ''
		};
	}

	handleChange = e => {
		this.setState({value: e.target.value});
	};

	render() {
		return (
			<div className='TextInput'>
				<label htmlFor={this.state.name}>
					{hyphensToSpaces(this.state.name)}
				</label>
				<input
					id={this.state.name}
					type='text'
					value={this.state.value}
					onChange={this.handleChange} />
			</div>
		);
	}
}

export default TextInput;
