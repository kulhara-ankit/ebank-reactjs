import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import LoginPage from './components/LoginPage'

import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/ebank/login" component={LoginPage} />
      <Route exact path="/" component={Home} />
      <NotFound />
    </Switch>
  </div>
)

export default App
