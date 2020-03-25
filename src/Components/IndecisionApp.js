import React from 'react'
import AddOption from './AddOption'
import Action from './Action'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(()=> ({options: []}));
    };

    handleDeleteOption= (option) => {
        this.setState((prev)=>({options: prev.options.filter((a) => a!==option )}))
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        this.setState((prev)=> ({selectedOption: this.state.options[randomNum]}))
    };

    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) > 0){
            return 'This option already exists'
        }
        this.setState((state)=>({options: state.options.concat([option])}))
    };
    handleCloseModal = () =>{
        this.setState((prev)=>({selectedOption: undefined}));
    }

    constructor(props){
        super(props);
        // no longer needed because of babel plugin transform-class-properties
        // this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        // this.handlePick = this.handlePick.bind(this);
        // this.handleAddOption = this.handleAddOption.bind(this);
        // this.handleDeleteOption = this.handleDeleteOption.bind(this);
        
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
        }
    }

    componentWillUnmount(){

    }

    render(){
        const title = 'Indecision';
        const subTitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subTitle={subTitle}/>
                    <div className = "container">
                    <Action 
                        hasOptions={this.state.options.length>0} 
                        handlePick = {this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions} 
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}    
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClose={this.handleCloseModal}
                />
            </div>
        )
    }
}