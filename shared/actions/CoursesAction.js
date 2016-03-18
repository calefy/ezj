import BaseAction from './BaseAction';
import CoursesApi from '../api/Courses';

module.exports = class CoursesAction extends BaseAction {

    constructor(config = {}) {
        super(config);

        this.api = this.getApi(CoursesApi);
    }

    loadfreeCourses(query = {}) {
        return BaseAction.dispatchRequest( 'freecourses', this.api.freecourses(query) );
    }


    loadhotCourses(query = {}) {
        return BaseAction.dispatchRequest( 'hotcourses', this.api.hotcourses(query) );
    }

}

