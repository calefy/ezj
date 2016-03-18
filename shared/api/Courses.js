import Base from './Base';
import { paramify } from '../libs/utils';

class Courses extends Base {

    /**
     * 免费课程列表
     */
    courses(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`courses/free`);
    }

}

module.exports = Courses;


