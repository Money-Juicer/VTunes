import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//내가 추가한것들
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';
import {Provider} from 'react-redux';

const store = configureStore({reducer : rootReducer});//redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(//내가 수정함
  <Provider store={store}>
    <App />
  </Provider>
);
