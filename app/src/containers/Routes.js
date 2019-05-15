import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default Routes;
