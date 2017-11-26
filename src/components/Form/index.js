import React, { Component } from 'react';
import swal from 'sweetalert2';
import TextInput from '../TextInput';
import WishList from '../WishList';
import Button from '../Button';
import { capitalize } from '../../utils';
import FormCss from './Form.css';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
			, number: ''
			, list: [
				{ verb: 'need', item: '' }
				, { verb: 'want', item: '' }
				, { verb: 'love', item: '' }
			]
		};
	}

	handleNameChange = name => {
		name = name
			.split(' ')
			.map(n => capitalize(n))
			.join(' ')
		;
		this.setState({ name });
	};

	handleNumberChange = number => {
		number = number
			.replace(/^\+1/, '')
			.replace(/\D/g, '')
		;
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
		e.preventDefault();

		var self = this;

		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/v1/user', true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		xhr.onload = function() {
			if (xhr.status === 200) {
				self.setState({
					name: ''
					, number: ''
					, list: [
						{ verb: 'need', item: '' }
						, { verb: 'want', item: '' }
						, { verb: 'love', item: '' }
					]
				});
				swal({
					title: 'Your list has been sent'
					, type: 'success'
					, showConfirmButton: false
					, timer: 2000
				});
			}
		}

		xhr.onerror = function() {
			if (xhr.status === 500) {
				swal({
					title: 'Oops...'
					, text: 'Something went wrong!'
					, type: 'error'
				});
			}
		}
		xhr.send(JSON.stringify(this.state));
	};

	render() {
		const isValid = this.state.name.length && this.state.number.length === 10;

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
					<Button id='submit-list' value='Send List' handleClick={this.submitList} disabled={!isValid} />
				</div>
			</div>
		)
	}
}

export default Form;
