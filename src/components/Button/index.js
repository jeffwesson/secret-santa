import React from 'react';

function Button(props) {
	if (props.disabled) {
		return (
			<div id={props.id} className='Button'>
				<input type='button' value={props.value} onClick={props.handleClick} disabled />
			</div>
		);
	}

	return (
		<div id={props.id} className='Button'>
			<input type='button' value={props.value} onClick={props.handleClick} />
		</div>
	);
}

export default Button;
