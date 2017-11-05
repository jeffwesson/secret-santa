import React, { Component } from 'react';
import TextInput from '../TextInput';
import WishList from '../WishList';
import Button from '../Button';
import FormCss from './Form.css';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
			, number: ''
			, list: [
				{ verb: 'want', item: 'coffee' }
				, { verb: 'need', item: 'sleep' }
				, { verb: 'use', item: 'caffeine' }
			]
		};
	}

	handleNameChange = name => {
		this.setState({ name });
	};

	handleNumberChange = number => {
		this.setState({ number });
	};

	handleVerbChange = (verb, index) => {
		this.setState(state => ({
			list: state.list.map((wish, i) => {
				if (i === index) {
					return { verb, item: wish.item };
				}
				return wish;
			})
		}));
	};

	handleItemChange = (item, index) => {
		this.setState(state => ({
			list: state.list.map((wish, i) => {
				if (i === index) {
					return { verb: wish.verb, item };
				}
				return wish;
			})
		}));
	};

	removeWish = index => {
		this.setState(state => ({
			list: state.list.filter((w, i) => i.toString() !== index)
		}));
	};

	addNewWish = e => {
		this.setState((state, props) => ({
			list: state.list.concat({ verb: 'love', item: '' })
		}));
		e.preventDefault();
	};

	submitList = e => {
		console.log(this.state);
		e.preventDefault();
	};

	render() {
		return (
			<div className='Form'>
				<div className='TextWrapper'>
					<TextInput name='name' handleChange={this.handleNameChange} />
					<TextInput name='mobile-number' handleChange={this.handleNumberChange} />
				</div>
				<WishList
					list={this.state.list}
					handleItemChange={this.handleItemChange}
					handleVerbChange={this.handleVerbChange}
					removeWish={this.removeWish} />
				<div className='ButtonController'>
					<Button id='add-wish' value='Add Wish' handleClick={this.addNewWish}/>
					<Button id='submit-list' value='Send List' handleClick={this.submitList} />
				</div>
			</div>
		)
	}
}

export default Form;
