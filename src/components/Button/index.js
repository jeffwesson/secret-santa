import React from 'react';

function Button(props) {
	const { value, handleClick, disabled } = props;
	return (
		<div className='Button'>
			<button type='button' value={value} onClick={handleClick} disabled={disabled} />
		</div>
	);
}

export default Button;
