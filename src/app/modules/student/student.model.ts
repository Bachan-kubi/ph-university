import { Schema, model} from 'mongoose';
import {
  StudentMethod,
  StudentModel,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
// import config from '../../config';
import { date, func } from 'joi';
import config from '../../config';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { User } from '../user/user.model';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is must need!'],
    trim: true,
    maxlength: 20,
    minlength: 3,
  },
  middleName: {
    type: String,
    required: [true, 'Middle name is must need!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is must need!'],
    trim: true,
  },
});
const guardianSchema = {
  fathersName: { type: String, required: true },
  fathersOccupation: { type: String, required: true },
  fathersContactNo: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersContactNo: { type: String, required: true },
};
const localGuardianSchema = {
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
};

const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User Id required"],
    unique: true,
    ref: User
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: '{VALUE} is not supported!',
    },
    required: true,
  },
  DOB: { type: String },
  isMarried: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: { type: String, required: true },
  emegencyContactNo: { type: String },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  admissionSemister:{type: Schema.Types.ObjectId, ref: 'AcademicSemister'},
  academicDepartment: {type: Schema.Types.ObjectId, ref: AcademicDepartment}
}, {
  toJSON: {virtuals: true}
});

// middleware
// query middlewaare
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({$match: {isDeleted:{$ne: true}}});
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// middleware

// mongoose virtual
studentSchema.virtual("fullName").get(function(){
  return(
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
});
// mongoose virtual


// custom instance creation
studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};
// customs instances

// create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
