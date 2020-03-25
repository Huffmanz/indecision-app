//JSX (JavaScript XML)
const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
}

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option){
        app.options.push(option);
        e.target.elements.option.value = ''
    }
    render();
};

const removeAll = () =>{
    app.options = [];
    render();
};

const onMakeDecision = () =>{
    const randomNum = Math.floor(Math.random() * app.options.length)
    console.log(app.options[randomNum])
};

const render = () => {
    const appRoot = document.getElementById('app');
    const template = (
        <div>
            <h1>{app.title}</h1>
            <p>{app.subtitle && app.subtitle}</p>
            <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={removeAll}>Remove All</button>
            <form onSubmit={onFormSubmit}>
                <input type='text' name='option' />
                <button>Add</button>
            </form>  
            <ol>
                {
                    app.options.map((o) => <p key={o}>{o}</p>)
                }
            </ol>
        </div>
        );

    ReactDOM.render(template, appRoot)
}

render();
