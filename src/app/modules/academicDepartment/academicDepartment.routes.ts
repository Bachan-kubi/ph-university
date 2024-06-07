import { Router } from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { validationRequest } from "../../middleware/validationRequest";
import { academicDepartmentValidation } from "./academicDepartmentValidation";


const router = Router();


router.post('/create-academic-department',
validationRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), 
AcademicDepartmentController.createAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/:departmentId', validationRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentController.updateAcademicDepartment);


export const academicDepartmentRoutes = router;