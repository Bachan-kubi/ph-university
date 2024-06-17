import { Router } from "express";
import { courseController } from "./courses.controller";
import { validationRequest } from "../../middleware/validationRequest";
import { coursesValidation } from "./courses.validation";

const router = Router();

router.post("/create-courses", validationRequest(coursesValidation.createCoursesValidatonSchema), courseController.createCourses);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getSingleCourses);
router.delete("/:id", courseController.deleteCourses);
router.patch("/:id", validationRequest(coursesValidation.updateCourseValidationSchema), courseController.updateCourses);
router.put("/:courseId/assign-faculties", validationRequest(coursesValidation.facultiesWithCourseValidationSchema), courseController.assignFaculties);
router.delete("/:courseId/remove-faculties", validationRequest(coursesValidation.facultiesWithCourseValidationSchema), courseController.removeFaculties);

export const coursesRouter = router;