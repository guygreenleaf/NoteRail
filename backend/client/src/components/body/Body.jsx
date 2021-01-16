import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from '../Landing'

function Body() {
    return (
        <div>
            <Switch>
                <Route path="/" component={Landing} exact />
            </Switch>
        </div>
    )
}

export default Body
