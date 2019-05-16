import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import HowtoPage from './HowtoPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/doc" component={HowtoPage} />
      </Switch>
    </div>
  );
}

export default Routes;
