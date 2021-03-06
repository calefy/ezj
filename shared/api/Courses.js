import Base from './Base';
import ApiClient from './apiClient';
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

    search(params) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`els/search/courses${params}`);
    }

    // 课程详情
    courseDetail(courseId) {
        return this.apiClient.get('els/courses/' + courseId + '?expand=lecturers');
    }
    // 课程的私人信息
    coursePrivate(courseId) {
        return this.apiClient.get('analysis/courses/' + courseId);
    }

    // 章节
    courseChapters(courseId) {
        return this.apiClient.get(`els/courses/${courseId}/chapters?expand=video`);
    }
    courseStudents(courseId, params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`els/courses/${courseId}/students${params}`);
    }

    chapterPpts(chapterId) {
        return this.apiClient.get('els/ppts?chapter_id=' + chapterId);
    }

    examination(examId) {
        return this.apiClient.get(`els/examinations/${examId}`);
    }
    courseSheet(courseId) {
        return this.apiClient.get(`els/examination-sheets?course_id=${courseId}`);
    }
    sheets(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`els/examination-sheets${params}`);
    }
    sheet(sheetId) {
        return this.apiClient.get(`els/examination-sheets/${sheetId}`);
    }
    submitSheet(model = {}) {
        return this.apiClient.post('els/examination-sheets', model);
    }


    lecturer(lecturerId) {
        return this.apiClient.get('els/lecturers/' + lecturerId);
    }
    lecturerCourses(lecturerId) {
        return this.apiClient.get(`els/lecturers/${lecturerId}/courses`);
    }

    /**
     * 我的课程
     * 我学习的课程
     * 我购买的课程
     * 我收藏的课程
     */
    myCourses(params = {}) {
        let type = params.type ? '/' + params.type : '';
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get('analysis/my-courses' + type + params);
    }
    //myLearnedCourses(params = {}) {
    //    params = paramify(params);
    //    params = params ? '?' + params : '';
    //    return this.apiClient.get('analysis/my-courses/learning-list' + params);
    //}
    //myBuyedCourses(params = {}) {
    //    params = paramify(params);
    //    params = params ? '?' + params : '';
    //    return this.apiClient.get('analysis/my-courses/purchased-list' + params);
    //}
    myCollectedCourses(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get('analysis/my-courses/collection-list' + params);
    }

    collect(courseId) {
        return this.apiClient.post(`els/rel-courses-students/${courseId}/collection`);
    }
    cancelCollect(courseId) {
        return this.apiClient.delete(`els/rel-courses-students/${courseId}/collection`);
    }

    // 监听上传播放信息
    playerProgress(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`dc/upload/player${params}`);
    }
    // 标记课程完成
    playerOver(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`dc/upload/mark${params}`);
    }
    // 持续教育试题
    continueQuiz(orgId) {
        return this.apiClient.get('els/examinations/online-quiz?org_id=' + orgId);
    }

}

module.exports = Courses;


