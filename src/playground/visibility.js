// let visibility = false;

// const toggle = () => {
//     visibility = !visibility;
//     render();
// };

// const render = () =>
// {

//     const template=(
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggle}>{visibility ? "Hide": "Show"}</button>
//             {
//                 visibility&&(
//                     <p>You can see this</p>
//                 )
//             }
//         </div>
//     )
//     const appRoot = document.getElementById('app');   
//     ReactDOM.render(template, appRoot)
// }
// render()

class VisibilityToggle extends React.Component{

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            visibility: false
        };
    }

    toggle(){
        this.setState((prevState)=>{
            return { visibility: !prevState.visibility }
        })
    }


    render(){
        return (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.toggle}>{this.state.visibility ? "Hide": "Show"}</button>
            {
                this.state.visibility&&(
                    <p>You can see this</p>
                )
            }
        </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));