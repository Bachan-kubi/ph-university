import { Router } from "express";
import { userRouters } from "../modules/user/user.router";
import { studentRouters } from "../modules/student/student.router";
import { academicRouter } from "../modules/academicSemister/academicSemister.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { coursesRouter } from "../modules/Courses/courses.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";

const routers = Router();
// 01 moduler routes
const moduleRoutes = [
    {path: '/students', route: studentRouters},
    {path: '/users', route: userRouters},
    {path: '/academic-semister', route: academicRouter},
    {path: '/academic-faculty', route: academicFacultyRoutes},
    {path: '/academic-department', route: academicDepartmentRoutes},
    {path: '/courses', route: coursesRouter},
    {path: '/faculties', route: FacultyRoutes},
];
moduleRoutes.forEach(route=>routers.use(route.path, route.route));
//02 normal routes
// routers.use('/students', studentRouters);
// routers.use('/users', userRouters);


export default routers;