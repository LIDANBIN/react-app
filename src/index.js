/**
 * Created by lidanbin on 2017/3/10.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import MediaQuery from 'react-responsive'

import './index.css'
import './mobile.css'
import App from './components/app'
import Container from './components/news_container'
import Detail from './components/news_detail'
import Center from './components/user_center'
import Mobile_App from './components/mobile_app'
import Mobile_Container from './components/mobile_news_container'
import Mobile_Detail from './components/mobile_news_detail'
import Mobile_Center from './components/mobile_user_center'


render((
    <div>
        <MediaQuery query='(min-device-width:1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Container}></IndexRoute>
                    <Route path='/news_detail/:newsId' component={Detail}></Route>
                    <Route path='/center' component={Center}></Route>
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-width:1224px)'>
            <Router history={hashHistory} >
                <Route path='/' component={Mobile_App}>
                    <IndexRoute component={Mobile_Container}></IndexRoute>
                    <Route path='/news_detail/:uniquekey' component={Mobile_Detail}></Route>
                    <Route path='/center' component={Mobile_Center}></Route>
                </Route>
            </Router>
        </MediaQuery>
    </div>
), document.getElementById('root'));