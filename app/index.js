import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Welcome from './components/welcome/Welcome'
import Binder from './components/binder/Binder'

const Router = (props) => {
    return (
        <BrowserRouter basename="binder">
            <Switch>
                <Route exact path='/' component={Welcome} />
                <Route path='/:site' component={Binder} />
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<Router />, document.getElementById('app'))