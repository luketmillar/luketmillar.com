import React from 'react'
import Home from './home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProjectsRouter from './projects'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/project/*">
          <ProjectsRouter />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <div>Nothing here yet</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
