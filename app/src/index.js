import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import typography from './styles/typography';
import { Route, Switch } from 'react-router-dom';
import HowtoPage from './containers/HowtoPage';
import ReferencePage from './containers/ReferencePage';

ReactDOM.render(
  <ThemeProvider theme={typography}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/document" component={HowtoPage} />
        <Route exact path="/references" component={ReferencePage} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
