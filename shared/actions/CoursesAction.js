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

    // 加载所有分类
    static LOAD_COURSE_CATEGORIES = 'course_categories';
    loadCourseCategories() {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_CATEGORIES, this.api.courseCategories() );
    }

    // 加载某一条分类详情
    static LOAD_COURSE_CATEGORY = 'course_category';
    loadCourseCategory(categoryId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_CATEGORY, this.api.courseCategory(categoryId) );
    }

    // 加载某一条分类的课程列表
    static LOAD_COURSE_CATEGORY_COURSES = 'course_category_courses';
    loadCourseCategoryCourses(categoryId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_CATEGORY_COURSES, this.api.courseCategoryCourses(categoryId) );
    }

    // 搜索
    static LOAD_SEARCH = 'search';
    loadSearch(params) {
        if (!params.keyword) {
            params.keyword = params.q;
        }
        return BaseAction.dispatchRequest( CoursesAction.LOAD_SEARCH, this.api.search(params), params );
    }

}

