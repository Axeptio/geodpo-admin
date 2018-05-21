import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Api from './Api/Api';

const api = new Api({ baseURL: process.env.REACT_APP_GEODPO_API_URL/*"http://localhost:3006/"*//*"https://api.geodpo.eu/"*/, token: process.env.REACT_APP_ADMIN_TOKEN });

const options = { api }

render(<App options={options} />, document.getElementById('root'));