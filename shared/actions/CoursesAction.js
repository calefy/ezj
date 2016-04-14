import BaseAction from './BaseAction';
import CoursesApi from '../api/Courses';

module.exports = class CoursesAction extends BaseAction {

    constructor(config = {}) {
        super(config);

        this.api = this.getApi(CoursesApi);
    }

    loadFreeCourses(query = {}) {
        return BaseAction.dispatchRequest( 'freecourses', this.api.freecourses(query) );
    }


    loadHotCourses(query = {}) {
        return BaseAction.dispatchRequest( 'hotcourses', this.api.hotcourses(query) );
    }
    //loadLatestCourses(query = {}) {
    //    return BaseAction.dispatchRequest( 'latestCourses', this.api.latestCourses(query) );
    //}
    static LOAD_COURSE_CATEGORIES = 'course_categories';
    loadCourseCategories() {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_CATEGORIES, this.api.courseCategories() );
    }

}

