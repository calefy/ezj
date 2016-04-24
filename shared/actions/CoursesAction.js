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

    // 课程详情
    static LOAD_COURSE_DETAIL = 'course_detail';
    loadCourseDetail(courseId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_DETAIL, this.api.courseDetail(courseId), {courseId} );
    }
    // 课程私密信息
    static LOAD_COURSE_PRIVATE = 'course_private';
    loadCoursePrivate(courseId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_PRIVATE, this.api.coursePrivate(courseId), {courseId} );
    }

    // 课程章节
    static LOAD_COURSE_CHAPTER = 'course_chapters';
    loadCourseChapters(courseId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_CHAPTER, this.api.courseChapters(courseId), {courseId} );
    }

    static LOAD_CHAPTER_PPTS = 'chapter_ppts';
    loadChapterPpts(chapterId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_CHAPTER_PPTS, this.api.chapterPpts(chapterId), {chapterId} );
    }

    static LOAD_COURSE_STUDENT = 'course_students';
    loadCourseStudents(courseId, params) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_STUDENT, this.api.courseStudents(courseId, params), Object.assign({courseId}, params || {}) );
    }

    static LOAD_COURSE_EXAM = 'course_exam';
    loadExamination(examId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_EXAM, this.api.examination(examId), {examId} );
    }

    static LOAD_COURSE_SHEET = 'course_sheet';
    loadCourseSheet(courseId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_COURSE_SHEET, this.api.courseSheet(courseId), {courseId} );
    }
    static LOAD_SHEETS = 'course_sheets';
    loadSheets(params) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_SHEETS, this.api.sheets(params), params );
    }

    static SUBMIT_SHEET = 'submit_sheet';
    submitSheet(model) {
        return BaseAction.dispatchRequest( CoursesAction.SUBMIT_SHEET, this.api.submitSheet(model) );
    }

    static LOAD_LECTURER = 'lecturer';
    loadLecturer(lecturerId) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_LECTURER, this.api.lecturer(lecturerId) );
    }


    /**
     * 用一个方法表示我的课程全部、学习的、购买的
     */
    static LOAD_MY_COURSES = 'my_courses';
    loadMyCourses(params) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_MY_COURSES, this.api.myCourses(params), params );
    }
    //static LOAD_MY_COURSES_LEARNED = 'my_courses_learned';
    //static LOAD_MY_COURSES_BUYED = 'my_courses_buyed';
    //loadMyLearnedCourses(params) {
    //    return BaseAction.dispatchRequest( CoursesAction.LOAD_MY_COURSES_LEARNED, this.api.myLearnedCourses(params) );
    //}
    //loadMyBuyedCourses(params) {
    //    return BaseAction.dispatchRequest( CoursesAction.LOAD_MY_COURSES_BUYED, this.api.myBuyedCourses(params) );
    //}
    static LOAD_MY_COURSES_COLLECTED = 'my_courses_collected';
    loadMyCollectedCourses(params) {
        return BaseAction.dispatchRequest( CoursesAction.LOAD_MY_COURSES_COLLECTED, this.api.myCollectedCourses(params), params );
    }

    static COLLECT_COURSE = 'collect_course';
    collect(courseId) {
        return BaseAction.dispatchRequest( CoursesAction.COLLECT_COURSE, this.api.collect(courseId), {courseId} );
    }
    static CANCEL_COLLECT_COURSE = 'cancel_collect_course';
    cancelCollect(courseId) {
        return BaseAction.dispatchRequest( CoursesAction.CANCEL_COLLECT_COURSE, this.api.cancelCollect(courseId), {courseId} );
    }
}

