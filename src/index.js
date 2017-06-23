import React from 'react';
import ReactDOM from 'react-dom';
import ChuckNorrisApp from './ChuckNorrisApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ChuckNorrisApp />, document.getElementById('root'));
registerServiceWorker();
