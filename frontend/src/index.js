import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';
import './bootstrap.min.css';
import './index.css';
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_PRODUCTION;
ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
