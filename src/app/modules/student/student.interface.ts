import { Schema, model, connect, Model, Types, Date } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TGuardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContactNo: string;
};
export type TlocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Other';
  DOB?: string;
  isMarried: true | false;
  email: string;
  contactNo: string;
  emegencyContactNo?: string;
  permanentAddress: string;
  presentAddress: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TGuardian;
  localGuardian: TlocalGuardian;
  profileImg: string;
  admissionSemister: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

// custom instances

export type StudentMethod = {
  isUserExist(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethod
>;
