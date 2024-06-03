import { Router } from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { validationRequest } from "../../middleware/validationRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";


const router = Router();

router.post('/create-academic-faculty', validationRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch('/:facultyId', validationRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty);

export const academicFacultyRoutes= router;