import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import App from './components/App';

render((
  <div id="main">
    <Router>
      <App book={window.__PRELOADED_STATE__} />
    </Router>
  </div>),
    document.getElementById('root')
);
