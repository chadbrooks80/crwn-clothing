import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.compoenent';
import ShopPage from './pages/shop/shop.component';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />      
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
