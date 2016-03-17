import { combineReducers } from 'redux';
import assign from 'lodash/assign';

import * as other       from './other'
import * as courses        from './courses'
import * as user        from './user'


/**
 * 全局store对象说明：
 *     - entities  normalizr处理后的实体存储位置，其对象key见 shared/libs/schemas.js 定义
 *     - action    记录每次action对象，方便 componentWillReceiveProps 据此判断
 *
 *     ....其他业务数据对象
 */
module.exports = combineReducers(assign({},
    other,

    courses,
    user
));

