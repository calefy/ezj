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
    //latestCourses(params = {}) {
    //    params = paramify(params);
    //    params = params ? '?' + params : '';
    //    return this.apiClient.get(`els/courses/latest${params}`);
    //}

    // 所有课程分类
    courseCategories() {
        return this.apiClient.get('els/course-categories');
    }
    // 某个课程分类详情
    courseCategory(categoryId) {
        return this.apiClient.get('els/course-categories/' + categoryId);
    }
    // 某个课程分类下的课程
    courseCategoryCourses(categoryId) {
        return this.apiClient.get('els/course-categories/' + categoryId + '/courses?per-page=100');
    }

}

module.exports = Courses;


