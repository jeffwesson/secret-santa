import React, { Component } from 'react';
import { hyphensToSpaces } from '../../lib/formatters';

class OptionInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	handleChange = e => {
		this.setState({value: e.target.value});
	};

	render() {
		const options = this.props.verbs.map(verb => (
			<option>{verb}</option>
		));
		return (
			<div className='OptionInput'>
				<label htmlFor={this.props.name}>
					{hyphensToSpaces(this.props.name)}
				</label>
				<select id={this.props.name} value={this.props.value} onChange={this.handleChange}>
					{options}
				</select>
			</div>
		);
	}
}

export default OptionInput;
