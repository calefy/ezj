/********************************
 * 课程
 *******************************/
import { reducerRequest } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

export function courses_free(state, action) {
    return reducerRequest('freecourses', state, action);
}
export function courses_hot(state, action) {
    return reducerRequest('hotcourses', state, action);
}
//export function latestCourses(state, action) {
//    return reducerRequest('latestCourses', state, action);
//}
export function course_categories(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_CATEGORIES, state, action);
}

export function course_category(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_CATEGORY, state, action);
}

export function category_courses(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_CATEGORY_COURSES, state, action);
}
export function courses_search(state, action) {
    return reducerRequest(CoursesAction.LOAD_SEARCH, state, action);
}
export function course(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_DETAIL, state, action);
}
export function course_private(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_PRIVATE, state, action);
}
export function chapters(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_CHAPTER, state, action);
}
export function ppts(state, action) {
    return reducerRequest(CoursesAction.LOAD_CHAPTER_PPTS, state, action);
}
export function lecturer(state, action) {
    return reducerRequest(CoursesAction.LOAD_LECTURER, state, action);
}
export function students(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_STUDENT, state, action);
}
export function examination(state, action) {
    return reducerRequest(CoursesAction.LOAD_COURSE_EXAM, state, action);
}

export function courses_mine(state, action) {
    return reducerRequest(CoursesAction.LOAD_MY_COURSES, state, action);
}
//export function courses_mine_learned(state, action) {
//    return reducerRequest(CoursesAction.LOAD_MY_COURSES_LEARNED, state, action);
//}
//export function courses_mine_buyed(state, action) {
//    return reducerRequest(CoursesAction.LOAD_MY_COURSES_BUYED, state, action);
//}
export function courses_mine_collected(state, action) {
    return reducerRequest(CoursesAction.LOAD_MY_COURSES_COLLECTED, state, action);
}
