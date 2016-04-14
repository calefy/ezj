/********************************
 * 课程
 *******************************/
import { reducerRequest } from '../libs/utils';

export function courses_free(state, action) {
    return reducerRequest('freecourses', state, action);
}
export function courses_hot(state, action) {
    return reducerRequest('hotcourses', state, action);
}
//export function latestCourses(state, action) {
//    return reducerRequest('latestCourses', state, action);
//}
