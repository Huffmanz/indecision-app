import React from 'react'
import ReactDOM from 'react-dom'

class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        
        this.state = {
            options: []
        }
    }

    componentDidMount(){
        try{
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>({options}))  
            }
        }
        catch(ex){

        }   
    }

    componentDidUpdate(prevProps, prevState){

        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
            console.log("component did update");
        }
    }

    componentWillUnmount(){

    }

    handleDeleteOptions(){
        this.setState(()=> ({options: []}));
    }

    handleDeleteOption(option){
        this.setState((prev)=>({options: prev.options.filter((a) => a!==option )}))
    }

    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[randomNum])
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > 0){
            return 'This option already exists'
        }
        this.setState((state)=>({options: state.options.concat([option])}))
    }

    render(){
        const title = 'Indecision';
        const subTitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subTitle={subTitle}/>
                <Action 
                    hasOptions={this.state.options.length>0} 
                    handlePick = {this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions} 
                    handleDeleteOption={this.handleDeleteOption}
                 />
                <AddOption 
                    handleAddOption={this.handleAddOption}    
                />
            </div>
        )
    }
}



const Header = (props) =>{
    return  (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h4>{props.subTitle}</h4>}
            
        </div>
    )
}

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {

    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
                >What should I do?</button>
        </div>
    )
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            <ol>
                {
                props.options.map((o)=>(
                    <Option key={o} 
                            optionText={o} 
                            handleDeleteOption={props.handleDeleteOption}/>
                ))
                }
            </ol>
        </div>
    )
}

const Option = (props) =>{
    return (
        <div>
            <li>{props.optionText}</li>
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }} >
            Remove</button>
        </div>
    )
}


class AddOption extends React.Component{    
    constructor(props){
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error: undefined
        }
    }

    onFormSubmit(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        if(error){
            this.setState(()=>({error}))
        }
        if(!error){
            e.target.elements.option.value = ""
        }
    }
    
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onFormSubmit}>
                    <input type='text' name='option'></input>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp options={['option 1', 'option 2']}/>, document.getElementById('app'));