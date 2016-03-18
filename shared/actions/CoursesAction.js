import BaseAction from './BaseAction';
import CoursesApi from '../api/Courses';

module.exports = class CoursesAction extends BaseAction {

    constructor(config = {}) {
        super(config);

        this.api = this.getApi(CoursesApi);
    }

    loadCourses(query = {}) {
        return BaseAction.dispatchRequest( 'courses', this.api.courses(query) );
    }

}

