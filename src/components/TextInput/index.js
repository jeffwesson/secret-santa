import React from 'react';
import { hyphensToSpaces } from '../../utils';

function TextInput(props) {
	const handleChange = e => {
		props.handleChange(e.target.value, props.index);
	};

	return (
		<div className='TextInput'>
			<label htmlFor={props.name}>
				{hyphensToSpaces(props.name)}
			</label>
			<input
				id={props.name}
				type='text'
				value={props.value}
				onChange={handleChange} />
		</div>
	);
}

export default TextInput;
