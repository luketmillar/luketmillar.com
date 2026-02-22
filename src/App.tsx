import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProjectsRouter from './projects'
import AppShell from './layout/AppShell'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AppsPage from './pages/AppsPage'
import WorkPage from './pages/WorkPage'
import PlaygroundPage from './pages/PlaygroundPage'
import PlaceholderPage from './pages/PlaceholderPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/project/*" element={<ProjectsRouter />} />
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/watching" element={<PlaceholderPage title="Watching" />} />
          <Route path="/playing" element={<PlaceholderPage title="Playing" />} />
          <Route path="*" element={<div>Nothing here yet</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
