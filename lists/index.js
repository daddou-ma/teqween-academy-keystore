const AdminSchema = require('./Admin');
const TeacherSchema = require('./Teacher');
const StudentSchema = require('./Student');
const CourseSchema = require('./Course');
const LectureSchema = require('./Lecture');

module.exports = function createAllLists(keystone) {
    keystone.createList('Admin', AdminSchema);
    keystone.createList('Teacher', TeacherSchema);
    keystone.createList('Student', StudentSchema);
    keystone.createList('Course', CourseSchema);
    keystone.createList('Lecture', LectureSchema);
    keystone.createList('Order', require('./Order')(keystone));
}