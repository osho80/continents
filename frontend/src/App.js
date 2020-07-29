import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './styles/global.scss';
import './App.css';

import { Home } from './pages/Home.jsx'
import { CountriesList } from './pages/CountriesList.jsx'


function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/countries/:id" component={CountriesList} exact />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
