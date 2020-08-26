import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss'
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.unregister();