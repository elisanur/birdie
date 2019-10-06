import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



if(process.env.NODE_ENV==='development')
  console.log('In development mode')

if(process.env.NODE_ENV==='test')
  console.log('In test mode')


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
