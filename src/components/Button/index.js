import React from 'react';
import ButtonCss from './Button.css';

function Button(props) {
	return (
		<div id={props.id} className='Button'>
			<input type='button' value={props.value} onClick={props.handleClick} />
		</div>
	);
}

export default Button;
