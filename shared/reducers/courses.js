/********************************
 * 课程
 *******************************/
import { reducerRequest } from '../libs/utils';

export function freecourses(state, action) {
    return reducerRequest('freecourses', state, action);
}
export function hotcourses(state, action) {
    return reducerRequest('hotcourses', state, action);
}
export function latestCourses(state, action) {
    return reducerRequest('latestCourses', state, action);
}
