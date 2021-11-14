import HomePage from './pages/homepage/homepage.compoenent';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const HatPage = () => (
  <h1>HAT PAGE</h1>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />      
        <Route exact path='/hats' component={HatPage} />      
      </Switch>
    </div>
  );
}

export default App;
