import React from 'react'
import Marquee from './marquee'
import Minesweeper from './minesweeper'
import Golf from './golf'
import BouncingBalls from './bouncingBalls'
import FallingBalls from './fallingBalls'
import ColorPalette from './color-palette'
import Graffiti from './graffiti'
import { Route, Routes } from 'react-router-dom'

const ProjectsRouter = () => {
    return (
        <Routes>
            <Route path="split-flap/*" element={<Marquee />} />
            <Route path="minesweeper" element={<Minesweeper />} />
            <Route path="golf" element={<Golf />} />
            <Route path="bouncing-balls" element={<BouncingBalls />} />
            <Route path="falling-balls" element={<FallingBalls />} />
            <Route path="color-palette" element={<ColorPalette />} />
            <Route path="graffiti" element={<Graffiti />} />
            <Route path="*" element={<div>This project doesn't exist yet</div>} />
        </Routes>
    )
}

export default ProjectsRouter
