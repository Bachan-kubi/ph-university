import { Router } from "express";
import { userRouters } from "../modules/user/user.router";
import { studentRouters } from "../modules/student/student.router";

const routers = Router();
// 01 moduler routes
const moduleRoutes = [
    {path: '/students', route: studentRouters},
    {path: '/users', route: userRouters},
];
moduleRoutes.forEach(route=>routers.use(route.path, route.route));
//02 normal routes
// routers.use('/students', studentRouters);
// routers.use('/users', userRouters);


export default routers; 