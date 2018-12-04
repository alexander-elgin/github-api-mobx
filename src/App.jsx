import React from 'react';
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';

import HelloWorld from './components/hello-world';

const App = () => <HelloWorld title="Hello from React webpack" />;

export default hot(module)(App);
