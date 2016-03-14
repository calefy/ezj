import { Schema, arrayOf, valuesOf } from 'normalizr';

const user = new Schema('users');
const notice = new Schema('notices');
const message = new Schema('messages');

const semester = new Schema('semesters');
const course = new Schema('courses');
const chapter = new Schema('chapters');
const video = new Schema('videos');
const paper = new Schema('papers');
const exam = new Schema('exams');
const sheet = new Schema('sheets');

course.define({
    semester: semester,

    lecturers: arrayOf(user),
    teachers: arrayOf(user),
    assistants: arrayOf(user)
});


const qaQuestion = new Schema('qaQuestions');
const qaAnswer = new Schema('qaAnswers');
const comment = new Schema('comments');

qaQuestion.define({ creator: user });
qaAnswer.define({ creator: user, question: qaQuestion });
comment.define({ creator: user, toCommentUser: user });


module.exports = {
    USER: user,
    NOTICE: notice,
    MESSAGE: message,

    SEMESTER: semester,

    COURSE: course,

    CHAPTER: chapter,
    VIDEO: video,

    PAPER: paper,

    EXAM: exam,
    SHEET: sheet,

    QAQUESTION: qaQuestion,
    QAANSWER: qaAnswer,

    COMMENT: comment
};
