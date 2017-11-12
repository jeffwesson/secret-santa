import React from 'react';
import { hyphensToSpaces } from '../../utils';
import SelectInputCss from './SelectInput.css'

function OptionInput(props) {
	const handleChange = e => {
		props.handleChange(e.target.value, props.index);
	};

	const options = props.verbs.map((verb, i) => (
		<option key={i}>{verb}</option>
	));

	return (
		<div className='SelectInput'>
			<label htmlFor={props.name}>
				{hyphensToSpaces(props.name)}
			</label>
			<select id={props.name} value={props.value} onChange={handleChange}>
				{options}
			</select>
		</div>
	);
}

export default OptionInput;
