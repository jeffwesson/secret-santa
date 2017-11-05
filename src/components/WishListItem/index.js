import React from 'react';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import WishListItemCss from './WishListItem.css';

function WishListItem(props) {
	const handleRemoveClick = e => {
		props.removeWish(+e.target.getAttribute('index'));
	};
	const verbs = ['need', 'want', 'love', 'like', 'use'];
	return (
		<div className='WishListItem'>
			<div className='remove-wish' index={props.index} onClick={handleRemoveClick}>&times;</div>
			<span className='pronoun'>I</span>
			<SelectInput
				name='verb'
				value={props.verb}
				handleChange={props.handleVerbChange}
				verbs={verbs}
				index={props.index} />
			<TextInput
				name='item'
				value={props.item}
				handleChange={props.handleItemChange}
				index={props.index} />
		</div>
	);
}

export default WishListItem;
