/********************************
 * 课程
 *******************************/
import { reducerRequest } from '../libs/utils';

export function courses(state, action) {
    return reducerRequest('courses', state, action);
}

