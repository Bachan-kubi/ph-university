import { Router } from "express";
import { validationRequest } from "../../middleware/validationRequest";
import { SemesterRegistrationControllers } from "./semisterRegistration.controller";
import { semesterRegiValidation } from "./semisterRegistration.validation";


const router = Router();

router.post("/register-semester", validationRequest(semesterRegiValidation.updateSemesterRegistrationValidationSchema), SemesterRegistrationControllers.createSemesterRegistration);
router.get("/", SemesterRegistrationControllers.getAllSemiRegisterData);
router.get("/:id", SemesterRegistrationControllers.getSingleSemiRegisterData);
router.patch("/:id", validationRequest(semesterRegiValidation.updateSemesterRegistrationValidationSchema), SemesterRegistrationControllers.updateSemiRegisterData);


export const SemesterRegistrationRouter = router;
