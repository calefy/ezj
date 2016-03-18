import Base from './Base';
import { paramify } from '../libs/utils';

class Courses extends Base {

    /**
     * 免费课程列表
     */
    freecourses(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`els/courses/free${params}`);
    }
    hotcourses(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`els/courses/hot${params}`);
    }

}

module.exports = Courses;


