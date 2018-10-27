import React from 'react';
import WishListItem from '../WishListItem';

function WishList(props) {
	const list = props.list.map((wish, i) => (
		<WishListItem
			key={i}
			index={i}
			verb={wish.verb}
			item={wish.item}
			handleItemChange={props.handleItemChange}
			handleVerbChange={props.handleVerbChange}
			removeWish={props.removeWish} />
	));
	return (
		<div className='WishList'>
			{list}
		</div>
	);
}

export default WishList;
