/********************************
 * 课程
 *******************************/
import { reducerRequest, getRequestTypes } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';
import CommerceAction from '../actions/CommerceAction';

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
    let collectType = getRequestTypes(CoursesAction.COLLECT_COURSE);
    let cancelType = getRequestTypes(CoursesAction.CANCEL_COLLECT_COURSE);
    let payType = getRequestTypes(CommerceAction.PAY);
    let data;
    switch(action.type) {
        case collectType.success:
            data = Object.assign({}, state.data);
            data.is_collected = true;
            return Object.assign({}, state, {data: data});
            break;
        case cancelType.success:
            data = Object.assign({}, state.data);
            data.is_collected = false;
            return Object.assign({}, state, {data: data});
            break;
        case payType.success:
            if (state.data) {
                data = Object.assign({}, state.data);
                data.is_purchased = true;
                data.is_expired = false;
                let d = new Date();
                d.setDate(d.getDate() + 90);
                let dy = d.getFullYear(), dm = d.getMonth() + 1, dd = d.getDate() + 1;
                data.expiring_date = dy + '-' + (dm < 10 ? '0' + dm : dm) + '-' + (dd < 10 ? '0' + dd : dd) + ' 00:00:00';
                return Object.assign({}, state, {data: data});
            }
        default:
            return reducerRequest(CoursesAction.LOAD_COURSE_PRIVATE, state, action);
    }
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
export function sheets(state, action) {
    return reducerRequest(CoursesAction.LOAD_SHEETS, state, action);
}
export function course_sheet(state, action) {
    let sheetType = getRequestTypes(CoursesAction.LOAD_SHEET);
    let submitType = getRequestTypes(CoursesAction.SUBMIT_SHEET);
    switch(action.type) {
        case sheetType.success:
        case submitType.success:
            return Object.assign({}, state, {data: action.response.data});
            break;
        default:
            return reducerRequest(CoursesAction.LOAD_COURSE_SHEET, state, action);
    }
}

export function courses_mine(state, action) {
    let type = getRequestTypes(CoursesAction.LOAD_MY_COURSES_MORE);
    switch (action.type) {
        case type.success:
            let data = {
                list: state.data.list.concat(action.response.data.list),
                total: action.response.data.total,
            };
            return Object.assign({}, state, { data: data });
            break;
        default:
            return reducerRequest(CoursesAction.LOAD_MY_COURSES, state, action);

    }
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
