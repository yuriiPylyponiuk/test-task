import React from 'react';
import SecondList from './secondList/secondList';
import './firstListStyle.css';
import { v4 as uuidv4 } from 'uuid';

class CreateFirstList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 1,
			list: [{data:1}]
		}
		this.makelist= this.makelist.bind(this)
		this.incrementFunc= this.incrementFunc.bind(this)
	}

	makelist(){
		this.setState( state => {
			let newObj ={
				data: state.value
			};

			const secondList = [...state.list, newObj];

			return{
				list: secondList
			}
		})
	}
	incrementFunc(){
		let a = this.state.value+1;
		this.setState({value: a})
		this.makelist()
	}

	render(){
		return(
			<div className = 'myProject'>
				<div className="subBlock">
					{this.state.list.map(()=><SecondList key= {uuidv4()}/>)}

				<button onClick={this.incrementFunc} className='addMainBtn secondNavToolBtn'>Add New To Do</button>
				</div>
			</div>
		)
		
	}
}

export default CreateFirstList;