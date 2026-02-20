import React from 'react'
import Home from './home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProjectsRouter from './projects'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/project/*" element={<ProjectsRouter />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Nothing here yet</div>} />
      </Routes>
    </Router>
  )
}

export default App
