/**
 * Created by easterCat on 2018/1/16.
 */
import './index.html';
import "babel-polyfill";


import React from 'react';
import ReactDom from 'react-dom';
import Link from './components/Link';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={Link}/>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);