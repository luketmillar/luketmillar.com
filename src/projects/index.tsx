import React from 'react'
import Marquee from './marquee'
import { Route, Switch } from 'react-router-dom'

const ProjectsRouter = () => {
    return (
        <Switch>
            <Route path="/project/split-flap">
                <Marquee />
            </Route>
            <Route>
                <div>This project doesn't exist yet</div>
            </Route>
        </Switch>
    )
}

export default ProjectsRouter
