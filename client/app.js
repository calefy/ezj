import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router } from 'react-router'
import { createHistory } from 'history'
import injectTapEventPlugin from 'react-tap-event-plugin';

// 补充IE下的函数不足
import assign from 'lodash/assign';
import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

if (!window.Promise) {
    require('es6-promise').polyfill();
}

if (!Object.assign) {
    Object.assign = assign;
    Object.keys = keys;
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(s) {
        return this.indexOf(s) === 0;
    };
    String.prototype.endsWith = function(s) {
        return this.indexOf(s) === this.length - s.length;
    };
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(f) {
        return forEach(this, f);
    };
    Array.prototype.map = function(f) {
        return map(this, f);
    };
}


const routes = require('../shared/routes');
const configStore = require('../shared/store');

// material-ui onTouchTap 事件支持，react 1.0 发布后方可删掉
injectTapEventPlugin();

let store = configStore(window.__INITIAL_STATE__ || {});

const { pathname, search, hash  } = window.location;
const location = `${pathname}${search}${hash}`;
match({ routes, location }, () => {
    render(
        <Provider store={store}>
            <Router history={createHistory()} routes={routes}></Router>
        </Provider>,
        document.getElementById('app')
    );
});
