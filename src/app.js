import React from 'react'
import ReactDOM from 'react-dom'
import IndecisionApp from './Components/IndecisionApp'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const layout = () => {
    return (
        <div>
            <p>Header</p>
            <p>Footer</p>
        </div>
        )
}

const template = (
    <div>
        <h1>Page Title</h1>
        <p>This is my page</p>
    </div>
)


ReactDOM.render(<IndecisionApp options={['option 1', 'option 2']}/>, document.getElementById('app'));