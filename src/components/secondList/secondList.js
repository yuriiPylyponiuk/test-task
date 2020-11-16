import React from 'react';
import './secondListStyle.css';
import cx from 'classnames';
import multiply from '../../icons/multiply.svg';
import check from '../../icons/check.svg';
import { v4 as uuidv4 } from 'uuid';

class SecondList extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      list: [],
        value: '',
        value2: '',
    }

    this.secondValueChange = this.secondValueChange.bind(this);
    this.secondListChange = this.secondListChange.bind(this);
    this.countNumber = this.countNumber.bind(this);
    this.shawNewInput = this.shawNewInput.bind(this);
    this.newValue = this.newValue.bind(this);
  }

  secondValueChange(e) {
    this.setState({value: e.target.value})
  }

  secondListChange() {
    if( this.state.value != ''){
      this.setState( state => {
        let newObj = {
          id: uuidv4(),
          name: state.value,
          checked: false,
          input: false
        }

        const secondList = [...state.list, newObj];
  
        return{
          list: secondList,
          value: ''
        }
      })
    }
  }

  canselClickEvent = (i) => {
    this.setState(state => {
      const list = state.list.filter((item,j) => i !== j);
      
      return{
        list
      }
    })
  }
  confirmClickEvent = (i) => {
    this.setState(state => {
      const list = state.list.map((item,j) => {
        if ( j===i){
          for(let key in item){
            if(key=='checked'){
              let a = item[key]= true;

              let obj={
                id: item.id,
                name: item.name,
                checked: a,
                input: item.input
              }
              return obj;
            }
          }
          return item;
        }else{
          return item;
        }
      });
      return{
        list,
      }
    })
  }

  countNumber() {
    let num = 0;
    this.state.list.map( item => {
      if(item.checked === false){
        num++;
      }   
    })
    return num;
  }
  shawNewInput= (i)=>{
    let b ;
    this.setState(state => {
      const list = state.list.map((item,j) => {
        if ( j===i){
          for(let key in item){
            if(key=='input'){
              let a = item[key]= true;
              b = item.name;
              let obj={
                id: item.id,
                name: item.name,
                checked: item.checked,
                input: a,
              }
              return obj;
            }
          }
          return item;
        }else{
          return item;
        }
      });
      return{
        list,
        value2: b
      }
    })
  }
 
  newValue(e){
    this.setState({value2: e.target.value})
  }
  setNewValue=(i)=>{
    if( this.state.value2 != ''){
      this.setState(state => {
        const list = state.list.map((item,j) => {
          if ( j===i){
            for(let key in item){
              if(key=='name'){
  
                let obj={
                  id: item.id,
                  name: state.value2,
                  checked: item.checked,
                  input: false,
                }
                return obj;
              }
            }
            return item;
          }else{
            return item;
          }
        });
        return{
          list,
          value2: ''
        }
      })
    }
  }

  render(){
    return(
      <div className= 'toDoListSecond'>
        <h1 className='titleSecondToDo'>To do: {this.countNumber()}</h1>
        <ul className = 'secondBlockMain'>

        {this.state.list.map( (item,index) =>{
          return(
          <li key={item.name} className = {cx({
            secondListItems: true,
            doneStyle: item.checked,
            })}>
            {item.input
              ? <form><input className = 'inputNewTask'
                  onChange={this.newValue} 
                  value={this.state.value2} 
                  placeholder='What do you need to do?' 
                  type="text"/>
                  <button onClick = {()=>this.setNewValue(index)}>Change</button></form>
              : <span onClick={() => this.shawNewInput(index)} className='secondListText'> {item.name} </span>
            }  
            <div className="subTools">
              <button className='gbtn' onClick={()=> this.confirmClickEvent(index)}>
                <img src={check} className="App-check" alt="check" />  
              </button>  
              <button className='rbtn' onClick={()=> this.canselClickEvent(index)}>
                <img src={multiply} className="App-multiply" alt="multiply" />
              </button> 
            </div>
          </li>
          )
        })}
        </ul>
        <div className="secondNavTool">
          <h3>Task</h3>
          <input 
            className = 'inputNewTask'
            onChange={this.secondValueChange} 
            value={this.state.value} 
            placeholder='What do you need to do?' 
            type="text"
          />
          <button className='secondNavToolBtn' onClick = {this.secondListChange}>Save item</button>
        </div>
      </div>
    )
  }
};

export default SecondList;
