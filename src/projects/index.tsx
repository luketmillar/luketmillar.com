import React from 'react'
import Marquee from './marquee'
import Minesweeper from './minesweeper'
import Golf from './golf'
import BouncingBalls from './bouncingBalls'
import FallingBalls from './fallingBalls'
import ColorPalette from './color-palette'
import { Route, Switch } from 'react-router-dom'

const ProjectsRouter = () => {
    return (
        <Switch>
            <Route path="/project/split-flap">
                <Marquee />
            </Route>
            <Route path="/project/minesweeper">
                <Minesweeper />
            </Route>
            <Route path="/project/golf">
                <Golf />
            </Route>
            <Route path="/project/bouncing-balls">
                <BouncingBalls />
            </Route>
            <Route path="/project/falling-balls">
                <FallingBalls />
            </Route>
            <Route path="/project/color-palette">
                <ColorPalette />
            </Route>
            <Route>
                <div>This project doesn't exist yet</div>
            </Route>
        </Switch>
    )
}

export default ProjectsRouter
