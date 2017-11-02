import 'babel-polyfill'
import smoothscroll from 'smoothscroll-polyfill'
import React from 'react'
import ReactDOM                      from 'react-dom'
import { RoutingApp }                from './modules'
import { AppContainer }              from 'react-hot-loader'
import { VERSION } from './versionInfo'

smoothscroll.polyfill(); // enable smoothscroll in DOM

ReactDOM.render(
    (<AppContainer><RoutingApp/></AppContainer>),
    document.getElementById('app')
);