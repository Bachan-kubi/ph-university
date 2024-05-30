import { z } from "zod";

// Define the UserName schema
const UserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).trim(),
  middleName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
});

// Define the guardian schema
const GuardianValidationSchema = z.object({
  fathersName: z.string(),
  fathersOccupation: z.string(),
  fathersContactNo: z.string(),
  mothersName: z.string(),
  mothersOccupation: z.string(),
  mothersContactNo: z.string(),
});

// Define the local guardian schema
const LocalGuardianValidatonSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define the student schema
export const StudentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: UserNameValidationSchema ,
  gender: z.enum(["Male", "Female", "Other"]),
  DOB: z.string(),
  isMarried: z.boolean(),
  email: z.string().email(),
  contactNo: z.string(),
  emegencyContactNo: z.string().optional(),
  permanentAddress: z.string(),
  presentAddress: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidatonSchema,
  profileImg: z.string(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false),
});