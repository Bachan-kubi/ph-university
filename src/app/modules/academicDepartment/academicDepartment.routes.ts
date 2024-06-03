import { Router } from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";


const router = Router();


router.post('/create-academic-department', AcademicDepartmentController.createAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/:departmentId', AcademicDepartmentController.updateAcademicDepartment);


export const academicDepartmentRoutes = router;