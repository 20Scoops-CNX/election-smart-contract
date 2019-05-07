import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminPage from './AdminPage';
import MainPage from './MainPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/admin" component={AdminPage} />
      </Switch>
    </div>
  );
}

export default Routes;
