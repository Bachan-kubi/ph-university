import express from 'express';
import { studentController } from './student.controller';


const router = express.Router();

// router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudents);
router.delete('/:studentId', studentController.deleteStudent);
router.patch('/:studentId', studentController.updateStudent);

export const studentRouters = router;
