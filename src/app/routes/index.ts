import { Router } from "express";
import { userRouters } from "../modules/user/user.router";
import { studentRouters } from "../modules/student/student.router";
import { academicRouter } from "../modules/academicSemister/academicSemister.routes";

const routers = Router();
// 01 moduler routes
const moduleRoutes = [
    {path: '/students', route: studentRouters},
    {path: '/users', route: userRouters},
    {path: '/academic-semister', route: academicRouter},
    {path: '/', route: academicRouter},
    {path: '/:semisterId', route: academicRouter},
    {path: '/update/:semisterId', route: academicRouter},
];
moduleRoutes.forEach(route=>routers.use(route.path, route.route));
//02 normal routes
// routers.use('/students', studentRouters);
// routers.use('/users', userRouters);


export default routers;