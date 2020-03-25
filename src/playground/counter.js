// const appRoot = document.getElementById('app');

// let count= 0;
// const changeCounter = (n) =>
// {
//     count+=n;
//     renderCounterApp();
// }
// const addOne = () => {
//     count++
//     renderCounterApp();
// };
// const minusOne = () =>{
//     count--
//     renderCounterApp();
// };
// const reset = () =>{
//     count=0
//     renderCounterApp();
// };

// const renderCounterApp = () =>{
//     const template2 = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );
//     ReactDOM.render(template2, appRoot)
// }
// renderCounterApp();
import React from 'react'
import ReactDOM from 'react-dom'

class CounterApp extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        };
    }

    componentDidMount(){
        try{
            const json = localStorage.getItem("count");
            const count = parseInt(JSON.parse(json), 10);
            if(!isNaN(count)){
                this.setState(()=>({count}))
            }
        }
        catch(ex){

        }   
    }

    componentDidUpdate(prevProps, prevState){

        if (prevState.count !== this.state.count){
            const json = JSON.stringify(this.state.count);
            localStorage.setItem('count',json);
            console.log("component did update");
        }
    }

    handleAddOne(){
        this.setState((state)=>{
            return {
                count: state.count+=1
            };
        });
    }

    handleMinusOne(){
       this.setState((state)=>{
           return { count: state.count-=1}
       })
    }

    handleReset(){
        this.setState(()=>{
            return {count: 0}
        })
    }
    
    render(){
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
}

ReactDOM.render(<CounterApp count={13} />, document.getElementById('app'))


